import smtplib
from email.message import EmailMessage
import logging
from app.core.config import settings
import os

logger = logging.getLogger(__name__)

def send_invoice_email(to: str, name: str, booking_details: dict, success: bool):
    try:
        msg = EmailMessage()
        status = "Confirmed" if success else "Failed"
        msg['Subject'] = f"Hakki Gudu Resort - Booking {status}"
        
        email_user = os.environ.get("EMAIL_USER", "")
        email_password = os.environ.get("EMAIL_PASSWORD", "")
        msg['From'] = email_user
        msg['To'] = to
        
        ref = booking_details.get("ref", "Unknown")
        dates = booking_details.get("dates", "Unknown")
        amount = booking_details.get("amount", 0) // 100
        
        content = f"Hello {name},\n\nYour booking ({ref}) for dates {dates} has been {status.lower()}.\nAmount: Rs. {amount}\n\nThank you for choosing Hakki Gudu Resort!"
        msg.set_content(content)
        
        if not email_user or not email_password:
            logger.info(f"Email mock mode. Would send: {content}")
            return
            
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(email_user, email_password)
            smtp.send_message(msg)
            logger.info(f"Email sent successfully to {to}")
    except Exception as e:
        logger.error(f"Email failed: {e}")
