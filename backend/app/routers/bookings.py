from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, func, text
from datetime import datetime, timezone, timedelta, date
import uuid
from typing import List, Dict, Any

from app.database import get_session
from app.models import Reservation
from app.schemas import HoldRequest, BookCashRequest, ReservationStatusResponse
from app.core.config import settings

router = APIRouter()

def get_overlap_condition(check_in: date, check_out: date):
    return and_(
        Reservation.check_in < check_out,
        Reservation.check_out > check_in,
        or_(
            Reservation.status == "confirmed",
            Reservation.status == "confirmed_cash",
            and_(
                Reservation.status == "pending",
                Reservation.hold_expires_at > datetime.now(timezone.utc)
            )
        )
    )

def format_inr(paise: int) -> str:
    rupees = paise // 100
    return f"Rs. {rupees:,}"

async def generate_booking_ref(session: AsyncSession) -> str:
    year = datetime.now().year
    stmt = select(func.count()).where(Reservation.booking_ref.like(f"RST-{year}-%"))
    result = await session.execute(stmt)
    count = result.scalar() or 0
    return f"RST-{year}-{(count + 1):04d}"

@router.get("/availability")
async def get_availability(month: str, session: AsyncSession = Depends(get_session)):
    try:
        year_str, month_str = month.split("-")
        target_year = int(year_str)
        target_month = int(month_str)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid month format, expected YYYY-MM")

    start_date = date(target_year, target_month, 1)
    if target_month == 12:
        end_date = date(target_year + 1, 1, 1)
    else:
        end_date = date(target_year, target_month + 1, 1)

    stmt = select(Reservation).where(
        and_(
            or_(
                Reservation.check_in < end_date,
                Reservation.check_out > start_date
            ),
            or_(
                Reservation.status == "confirmed",
                Reservation.status == "confirmed_cash",
                and_(
                    Reservation.status == "pending",
                    Reservation.hold_expires_at > datetime.now(timezone.utc)
                )
            )
        )
    )
    result = await session.execute(stmt)
    reservations = result.scalars().all()

    unavailable_ranges = []
    for r in reservations:
        unavailable_ranges.append({
            "check_in": r.check_in.isoformat(),
            "check_out": r.check_out.isoformat()
        })

    return {"unavailable_ranges": unavailable_ranges}

@router.post("/hold")
async def create_hold(request: HoldRequest, session: AsyncSession = Depends(get_session)):
    nights = (request.check_out - request.check_in).days
    if nights <= 0:
        raise HTTPException(status_code=400, detail="Check-out must be after check-in")
    amount_paise = nights * settings.RESORT_PRICE_PER_NIGHT_PAISE

    try:
        await session.execute(text("SELECT pg_advisory_xact_lock(1001)"))
        stmt = select(Reservation).where(get_overlap_condition(request.check_in, request.check_out)).with_for_update()
        result = await session.execute(stmt)
        overlapping = result.scalars().first()

        if overlapping:
            raise HTTPException(status_code=409, detail="Dates are not available")

        booking_ref = await generate_booking_ref(session)
        hold_expires_at = datetime.now(timezone.utc) + timedelta(minutes=10)

        new_res = Reservation(
            booking_ref=booking_ref,
            status="pending",
            check_in=request.check_in,
            check_out=request.check_out,
            guest_name=request.guest_name,
            guest_email=request.guest_email,
            guest_phone=request.guest_phone,
            num_guests=request.num_guests,
            amount_paise=amount_paise,
            hold_expires_at=hold_expires_at
        )
        session.add(new_res)
        await session.commit()
        
        return {
            "reservation_id": str(new_res.id),
            "hold_expires_at": new_res.hold_expires_at.isoformat(),
            "amount_paise": amount_paise,
            "amount_display": format_inr(amount_paise)
        }
    except HTTPException:
        await session.rollback()
        raise
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/reservation/{reservation_id}/status", response_model=ReservationStatusResponse)
async def get_status(reservation_id: uuid.UUID, session: AsyncSession = Depends(get_session)):
    stmt = select(Reservation).where(Reservation.id == reservation_id)
    result = await session.execute(stmt)
    res = result.scalars().first()
    if not res:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return {"status": res.status}

@router.post("/book-cash")
async def book_cash(request: BookCashRequest, background_tasks: BackgroundTasks, session: AsyncSession = Depends(get_session)):
    nights = (request.check_out - request.check_in).days
    if nights <= 0:
        raise HTTPException(status_code=400, detail="Check-out must be after check-in")
    amount_paise = nights * settings.RESORT_PRICE_PER_NIGHT_PAISE

    try:
        await session.execute(text("SELECT pg_advisory_xact_lock(1001)"))
        stmt = select(Reservation).where(get_overlap_condition(request.check_in, request.check_out)).with_for_update()
        result = await session.execute(stmt)
        overlapping = result.scalars().first()

        if overlapping:
            raise HTTPException(status_code=409, detail="Dates are not available")

        booking_ref = await generate_booking_ref(session)

        new_res = Reservation(
            booking_ref=booking_ref,
            status="confirmed_cash",
            payment_method="cash",
            check_in=request.check_in,
            check_out=request.check_out,
            guest_name=request.guest_name,
            guest_email=request.guest_email,
            guest_phone=request.guest_phone,
            num_guests=request.num_guests,
            amount_paise=amount_paise,
            confirmed_at=datetime.now(timezone.utc)
        )
        session.add(new_res)
        await session.commit()
        
        try:
            from app.services.whatsapp_service import send_booking_confirmation
            from app.services.email_service import send_invoice_email
            
            background_tasks.add_task(
                send_booking_confirmation,
                phone=request.guest_phone,
                name=request.guest_name,
                dates=f"{request.check_in} to {request.check_out}",
                booking_ref=booking_ref,
                amount=amount_paise
            )
            
            background_tasks.add_task(
                send_invoice_email,
                to=request.guest_email,
                name=request.guest_name,
                booking_details={
                    "ref": booking_ref,
                    "dates": f"{request.check_in} to {request.check_out}",
                    "amount": amount_paise
                },
                success=True
            )
        except Exception as e:
            pass
            
        return {
            "reservation_id": str(new_res.id),
            "booking_ref": booking_ref,
            "message": "Cash booking confirmed"
        }
    except HTTPException:
        await session.rollback()
        raise
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
