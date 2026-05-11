from fastapi import FastAPI
from .database import engine, Base
from .import routes, models #import models

# Base.metadata.create_all(bind = engine) #create tables automatically #removed because alembic handle migration now

app = FastAPI()

app.include_router(routes.router)

@app.get("/")
def root():
    return {"message": "Fast APi Basic Auth"}