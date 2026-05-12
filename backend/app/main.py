import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

# 1. Load the .env file at the very top
load_dotenv()

# Absolute imports
from app.database import engine, Base
from app import routes, models 

# 2. Create database tables if they don't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 3. Session state management (ONLY ONCE)
# Fetches from .env, using a fallback only for development
session_secret = os.getenv("SESSION_SECRET", "a_very_secret_fallback_string")

app.add_middleware(
    SessionMiddleware, 
    secret_key=session_secret
)

# 4. CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Your Vite frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5. Include your router
app.include_router(routes.router)

@app.get("/")
def root():
    return {"message": "FastAPI Google Auth Backend"}