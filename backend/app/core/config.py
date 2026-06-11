from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator

class Settings(BaseSettings):
    DATABASE_URL: str
    RAZORPAY_KEY_ID: str
    RAZORPAY_KEY_SECRET: str
    WHATSAPP_TOKEN: str
    WHATSAPP_PHONE_NUMBER_ID: str
    JWT_SECRET: str
    ADMIN_USERNAME: str
    ADMIN_PASSWORD: str
    RESORT_PRICE_PER_NIGHT_PAISE: int
    FRONTEND_URL: str

    @field_validator("DATABASE_URL")
    @classmethod
    def assemble_db_connection(cls, v: str) -> str:
        if v and v.startswith("postgresql://"):
            return v.replace("postgresql://", "postgresql+asyncpg://", 1)
        return v

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
