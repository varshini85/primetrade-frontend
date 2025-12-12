
A full-stack scalable authentication-based dashboard application built using **Next.js (Frontend)** and **FastAPI + PostgreSQL (Backend)**.

---

# Features Implemented

# Frontend (Next.js + React + TailwindCSS)
- Login & Register forms with validation  
- JWT authentication with auto-redirect  
- Protected dashboard route  
- CRUD operations for tasks  
- Search & Filter  
- Edit task page  
- Global state using React Context  
- Axios interceptor for token injection  
- Responsive UI (mobile / desktop)

---

### Backend (FastAPI + PostgreSQL)
- User signup/login  
- Secure password hashing using bcrypt  
- JWT authentication middleware  
- CRUD operations for tasks  
- Ownership validation & authorization  
- Pydantic models + schema validation  
- CORS enabled for frontend

---

## Project Structure

backend/
│
├── alembic/
├── app/
│ ├── core/
│ ├── routers/
│ ├── crud.py
│ ├── database.py
│ ├── main.py
│ ├── models.py
│ ├── schemas.py
│ ├── utils.py
│ └── pycache/
│
├── .env
├── alembic.ini
└── requirements.txt

frontend/
│
├── components/
│ └── layout.js
│
├── context/
│ └── AuthContext.js
│
├── lib/
│ ├── api.js
│ └── validators.js
│
├── pages/
│ ├── _app.js
│ ├── index.js
│ ├── login.js
│ ├── register.js
│ └── dashboard/
│ ├── index.js
│ └── task/
│ ├── [id].js
│ └── index.js
│
├── styles/
│ └── globals.css
│
├── next.config.js
├── tailwind.config.js
└── package.json

# Authentication Workflow

- User logs in → backend returns JWT.
- Token stored in `localStorage`.
- Axios interceptor automatically attaches `Authorization: Bearer <token>`.
- Protected pages redirect unauthenticated users.
- Logout clears token + global state.

---

# Features Implemented

### Frontend
- Fully responsive UI with TailwindCSS
- Login & Registration forms
- JWT authentication & auto redirect
- Global AuthContext for managing session
- Dashboard with:
  - List Tasks
  - Search Tasks
  - Create, Update, Delete Tasks
  - Edit task with `completed` toggle
- Loader states, error toasts, backend validation handling

### Backend
- JWT-based login & signup
- Secure password hashing
- CRUD APIs:
  - GET /tasks
  - GET /tasks/{id}
  - POST /tasks
  - PUT /tasks/{id}
  - DELETE /tasks/{id}
- Ownership-based access
- Pydantic validation with helpful errors
- CORS enabled for frontend

---

# How to Run the Project

## Backend Setup

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

## Frontend Setup

cd frontend
npm install
npm run dev

Frontend: http://localhost:3000
Backend API: http://localhost:8000