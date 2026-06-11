from pydantic import BaseModel, EmailStr, Field, model_validator
from datetime import date, datetime
from typing import Optional, List
from uuid import UUID

class HoldRequest(BaseModel):
    check_in: date
    check_out: date
    guest_name: str = Field(..., min_length=2, max_length=100)
    guest_email: EmailStr
    guest_phone: str = Field(..., min_length=10, max_length=15)
    num_guests: int = Field(..., gt=0, le=20)

    @model_validator(mode='after')
    def validate_dates(self):
        if self.check_in < date.today():
            raise ValueError("check_in cannot be in the past")
        nights = (self.check_out - self.check_in).days
        if nights <= 0:
            raise ValueError("check_out must be after check_in")
        if nights > 60:
            raise ValueError("maximum stay is 60 nights")
        return self

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
