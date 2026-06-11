from fastapi import APIRouter, Depends, HTTPException, Request, Response, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
import hmac
import hashlib
import json

from app.database import get_session
from app.models import Reservation
from app.schemas import CreateOrderRequest
from app.services import razorpay_service
from app.core.config import settings

router = APIRouter()

@router.post("/create-order")
async def create_order(request: CreateOrderRequest, session: AsyncSession = Depends(get_session)):
    stmt = select(Reservation).where(Reservation.id == request.reservation_id)
    result = await session.execute(stmt)
    res = result.scalars().first()

    if not res or res.status != "pending":
        raise HTTPException(status_code=400, detail="Reservation not found or not pending")

    try:
        # Call Razorpay
        order = razorpay_service.create_order(
            amount_paise=res.amount_paise,
            receipt=str(res.id)
        )
        
        # Store razorpay_order_id
        res.razorpay_order_id = order.get("id")
        await session.commit()

        return {
            "razorpay_order_id": order.get("id"),
            "amount_paise": res.amount_paise,
            "currency": "INR",
            "key_id": settings.RAZORPAY_KEY_ID
        }
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/verify-payment")
async def verify_payment(request: Request, background_tasks: BackgroundTasks, session: AsyncSession = Depends(get_session)):
    body = await request.body()
    try:
        data = json.loads(body)
    except Exception:
        data = {}

    # Read from body as instructed
    razorpay_payment_id = data.get("razorpay_payment_id")
    razorpay_order_id = data.get("razorpay_order_id")
    razorpay_signature = data.get("razorpay_signature")
    event = data.get("event")

    # If it's an actual Razorpay webhook, it has a different structure:
    # event is in data["event"]
    # order_id is in data["payload"]["payment"]["entity"]["order_id"]
    # payment_id is in data["payload"]["payment"]["entity"]["id"]
    # signature is in headers["x-razorpay-signature"]
    is_true_webhook = "x-razorpay-signature" in request.headers
    
    if is_true_webhook:
        razorpay_signature = request.headers.get("x-razorpay-signature")
        try:
            payment_entity = data.get("payload", {}).get("payment", {}).get("entity", {})
            razorpay_order_id = payment_entity.get("order_id")
            razorpay_payment_id = payment_entity.get("id")
            
            # Compute webhook signature
            expected_signature = hmac.new(
                bytes(settings.RAZORPAY_KEY_SECRET, 'utf-8'),
                body,
                hashlib.sha256
            ).hexdigest()
        except Exception:
            return Response(status_code=400, content="Invalid webhook payload")
    else:
        # Compute frontend callback signature
        if not razorpay_order_id or not razorpay_payment_id or not razorpay_signature:
            return Response(status_code=400, content="Missing signature params")
        
        msg = f"{razorpay_order_id}|{razorpay_payment_id}"
        expected_signature = hmac.new(
            bytes(settings.RAZORPAY_KEY_SECRET, 'utf-8'),
            bytes(msg, 'utf-8'),
            hashlib.sha256
        ).hexdigest()

    if not hmac.compare_digest(expected_signature, razorpay_signature):
        return Response(status_code=400, content="Signature mismatch")

    # If frontend callback, we assume it's captured
    if not event and not is_true_webhook:
        event = "payment.captured"

    if event == "payment.captured":
        stmt = select(Reservation).where(Reservation.razorpay_order_id == razorpay_order_id)
        result = await session.execute(stmt)
        res = result.scalars().first()
        
        if res and res.status != "confirmed":
            res.status = "confirmed"
            res.confirmed_at = datetime.now(timezone.utc)
            res.razorpay_payment_id = razorpay_payment_id
            await session.commit()
            
            # Send notifications
            from app.services.whatsapp_service import send_booking_confirmation
            from app.services.email_service import send_invoice_email
            try:
                background_tasks.add_task(
                    send_booking_confirmation,
                    phone=res.guest_phone,
                    name=res.guest_name,
                    dates=f"{res.check_in} to {res.check_out}",
                    booking_ref=res.booking_ref,
                    amount=res.amount_paise
                )
            except Exception:
                pass
                
            try:
                background_tasks.add_task(
                    send_invoice_email,
                    to=res.guest_email,
                    name=res.guest_name,
                    booking_details={
                        "ref": res.booking_ref,
                        "dates": f"{res.check_in} to {res.check_out}",
                        "amount": res.amount_paise
                    },
                    success=True
                )
            except Exception:
                pass

    elif event == "payment.failed":
        stmt = select(Reservation).where(Reservation.razorpay_order_id == razorpay_order_id)
        result = await session.execute(stmt)
        res = result.scalars().first()
        
        if res and res.status != "confirmed":
            res.status = "failed"
            await session.commit()

    return Response(status_code=200, content="OK")
