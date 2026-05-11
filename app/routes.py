from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import models, schemas
from .auth import hash_password, verify_password, create_access_token  # changed
from .oauth import oauth
import os
 
router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Register
@router.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(user.password)  #changed
    print("user name ::: ", user.name)
    new_user = models.User(
        name = user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created success"}

# Login
@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email given"
        )

    if not verify_password(user.password, db_user.password):  # changed
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    access_token = create_access_token(  # 👈 changed
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/auth/google/login")
async def google_login(request: Request):
    # Use the variable from your .env here
    redirect_uri = os.getenv('GOOGLE_REDIRECT_URI')

    return await oauth.google.authorize_redirect(
        request,
        redirect_uri
    )

@router.get("/auth/google/callback")
async def google_callback(request:Request):
    token = await oauth.google.authorize_access_token(request)

    user = token.get("userinfo")

    email = user["email"]

    #creating own JWT token
    access_token = create_access_token(
        data={
            "sub":email
        }
    )

    return {
        "email": email,
        "access_token": access_token
    }
    
@router.get("/auth/google/callback-api")
def google_callback(request:Request):
    print (request)