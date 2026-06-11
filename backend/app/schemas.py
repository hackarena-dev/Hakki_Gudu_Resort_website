from pydantic import BaseModel, EmailStr
from datetime import date, datetime
from typing import Optional, List
from uuid import UUID

class HoldRequest(BaseModel):
    check_in: date
    check_out: date
    guest_name: str
    guest_email: EmailStr
    guest_phone: str
    num_guests: int

class BookCashRequest(HoldRequest):
    pass

class CreateOrderRequest(BaseModel):
    reservation_id: UUID

class ReservationStatusResponse(BaseModel):
    status: str

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str

class BookingOut(BaseModel):
    id: UUID
    booking_ref: str
    status: str
    check_in: date
    check_out: date
    guest_name: str
    guest_email: str
    guest_phone: str
    num_guests: int
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    payment_method: Optional[str] = None
    amount_paise: Optional[int] = None
    hold_expires_at: Optional[datetime] = None
    created_at: datetime
    confirmed_at: Optional[datetime] = None

class MetricsOut(BaseModel):
    total_revenue_paise: int
    total_revenue_display: str
    total_bookings: int
    upcoming_bookings: int
    cash_pending_collection: int
