import httpx
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

async def send_booking_confirmation(phone: str, name: str, dates: str, booking_ref: str, amount: int):
    url = f"https://graph.facebook.com/v18.0/{settings.WHATSAPP_PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {settings.WHATSAPP_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": phone,
        "type": "template",
        "template": {
            "name": "booking_confirmation",
            "language": {"code": "en"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": name},
                        {"type": "text", "text": dates},
                        {"type": "text", "text": booking_ref},
                        {"type": "text", "text": str(amount // 100)}
                    ]
                }
            ]
        }
    }
    logger.info(f"Logging WhatsApp payload (Template pending approval): {payload}")
    
    # We log it and optionally send it.
    async with httpx.AsyncClient() as client:
        try:
            res = await client.post(url, headers=headers, json=payload)
            res.raise_for_status()
            logger.info(f"WhatsApp sent successfully: {res.text}")
        except Exception as e:
            logger.error(f"WhatsApp failed: {e}")
