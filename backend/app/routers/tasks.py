from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app import crud
from app.database import get_db
from app.routers.auth import get_current_user
from app.schemas import TaskBase, TaskCreate, TaskRead, TaskUpdate

router = APIRouter()


@router.post("/", response_model=TaskRead)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud.create_task(db, owner_id=current_user.id, task=task_in)


@router.get("/", response_model=List[TaskRead])
def list_tasks(skip: int = 0, limit: int = 20, search: str | None = Query(None), db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    tasks = crud.get_tasks(db, skip=skip, limit=limit, search=search)
    # filter by ownership on the app side (or add owner filter in the CRUD)
    return [t for t in tasks if t.owner_id == current_user.id]


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    t = crud.get_task(db, task_id)
    if not t or t.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    return t


@router.put("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    t = crud.get_task(db, task_id)
    if not t or t.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    return crud.update_task(db, task_id, task_in)


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    t = crud.get_task(db, task_id)
    if not t or t.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    success = crud.delete_task(db, task_id)
    return {"deleted": success}