from fastapi import FastAPI
from app.database import engine, Base
from app.routers import auth, tasks
from fastapi.middleware.cors import CORSMiddleware

# create DB tables (simple approach; use migrations for prod)
Base.metadata.create_all(bind=engine)


app = FastAPI(title="FastAPI + Postgres Starter")


app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])


@app.get("/")
def root():
    return {"status": "ok"}