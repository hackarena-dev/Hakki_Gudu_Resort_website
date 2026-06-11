from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from datetime import date
from typing import List, Optional

from app.database import get_session
from app.models import Reservation
from app.schemas import AdminLoginRequest, AdminLoginResponse, BookingOut, MetricsOut
from app.core.security import verify_password, create_access_token, get_current_admin, hash_password
from app.core.config import settings
from app.routers.bookings import format_inr

router = APIRouter(prefix="/admin")

@router.post("/login", response_model=AdminLoginResponse)
async def login(request: AdminLoginRequest):
    hashed_admin_pass = hash_password(settings.ADMIN_PASSWORD)
    
    if request.username != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not verify_password(request.password, hashed_admin_pass):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    access_token = create_access_token(data={"sub": request.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/bookings", response_model=List[BookingOut])
async def get_bookings(status: Optional[str] = None, current_admin: dict = Depends(get_current_admin), session: AsyncSession = Depends(get_session)):
    stmt = select(Reservation).order_by(Reservation.created_at.desc())
    if status:
        stmt = stmt.where(Reservation.status == status)
        
    result = await session.execute(stmt)
    reservations = result.scalars().all()
    return reservations

@router.get("/metrics", response_model=MetricsOut)
async def get_metrics(current_admin: dict = Depends(get_current_admin), session: AsyncSession = Depends(get_session)):
    rev_stmt = select(func.sum(Reservation.amount_paise)).where(Reservation.status.in_(["confirmed", "confirmed_cash"]))
    rev_res = await session.execute(rev_stmt)
    total_revenue_paise = rev_res.scalar() or 0
    
    count_stmt = select(func.count()).where(Reservation.status.in_(["confirmed", "confirmed_cash"]))
    count_res = await session.execute(count_stmt)
    total_bookings = count_res.scalar() or 0
    
    today = date.today()
    upcoming_stmt = select(func.count()).where(
        and_(
            Reservation.status.in_(["confirmed", "confirmed_cash"]),
            Reservation.check_in >= today
        )
    )
    up_res = await session.execute(upcoming_stmt)
    upcoming_bookings = up_res.scalar() or 0
    
    cash_stmt = select(func.count()).where(Reservation.status == "confirmed_cash")
    cash_res = await session.execute(cash_stmt)
    cash_pending_collection = cash_res.scalar() or 0
    
    return {
        "total_revenue_paise": total_revenue_paise,
        "total_revenue_display": format_inr(total_revenue_paise),
        "total_bookings": total_bookings,
        "upcoming_bookings": upcoming_bookings,
        "cash_pending_collection": cash_pending_collection
    }
