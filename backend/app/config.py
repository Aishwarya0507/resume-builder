from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "ResumeAI"
    secret_key: str = "replace-with-a-long-random-secret"
    database_url: str = "sqlite:///./resumeai.db"
    access_token_expire_minutes: int = 1440
    frontend_origin: str = "http://localhost:5173"

    azure_ai_endpoint: str = ""
    azure_ai_api_key: str = ""
    azure_ai_deployment: str = ""
    azure_ai_api_version: str = "2024-10-21"

    azure_storage_connection_string: str = ""
    azure_storage_container: str = "resumes"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
