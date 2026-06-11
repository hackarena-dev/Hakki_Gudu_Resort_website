import razorpay
from app.core.config import settings

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

def create_order(amount_paise: int, receipt: str):
    data = {
        "amount": amount_paise,
        "currency": "INR",
        "receipt": receipt
    }
    return client.order.create(data=data)
