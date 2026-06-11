import uuid
from sqlalchemy import Column, String, Integer, Date, DateTime, text, Index
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()"))
    booking_ref = Column(String, unique=True, nullable=False)
    status = Column(String, nullable=False)
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)
    guest_name = Column(String(100), nullable=False)
    guest_email = Column(String(100), nullable=False)
    guest_phone = Column(String(15), nullable=False)
    num_guests = Column(Integer, nullable=False)
    razorpay_order_id = Column(String(100), nullable=True)
    razorpay_payment_id = Column(String(100), nullable=True)
    payment_method = Column(String(20), default="razorpay")
    amount_paise = Column(Integer, nullable=True)
    hold_expires_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))
    confirmed_at = Column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        Index("ix_reservations_check_in_check_out_status", "check_in", "check_out", "status"),
    )
