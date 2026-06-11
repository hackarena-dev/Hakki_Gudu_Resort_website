from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy import update
from datetime import datetime, timezone
from app.database import AsyncSessionLocal
from app.models import Reservation
import logging

logger = logging.getLogger(__name__)
scheduler = AsyncIOScheduler()

async def expire_pending_holds():
    try:
        async with AsyncSessionLocal() as session:
            async with session.begin():
                now = datetime.now(timezone.utc)
                stmt = update(Reservation).where(
                    Reservation.status == "pending",
                    Reservation.hold_expires_at <= now
                ).values(status="expired")
                result = await session.execute(stmt)
                if result.rowcount > 0:
                    logger.info(f"Expired {result.rowcount} pending holds.")
    except Exception as e:
        logger.error(f"Error expiring holds: {e}")

def start_scheduler():
    scheduler.add_job(expire_pending_holds, "interval", minutes=2)
    scheduler.start()
