from pydantic_settings import BaseSettings, SettingsConfigDict

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

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
