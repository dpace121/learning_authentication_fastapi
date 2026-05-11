from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

# Changed from relative (dots) to absolute (app.module)
from app.database import engine, Base
from app import routes, models 

app = FastAPI()

# 1. Defining the origins that are allowed to make requests
origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

# 2. Add the CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Add Session Middleware
app.add_middleware(
    SessionMiddleware,
    secret_key="secretkey"
)

app.include_router(routes.router)

@app.get("/")
def root():
    return {"message": "Fast APi Basic Auth"}