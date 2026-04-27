# 🍽️ Restaurant Management System

A full-stack web application for managing restaurant operations, built with a modern and scalable tech stack.

---

## 🚀 Tech Stack

### Frontend
- React 19 (Vite)
- Tailwind CSS v4, Lucide React
- Redux Toolkit, Redux Persist
- TanStack React Query v5, Axios
- React Hook Form, Zod
- React Router DOM v7

### Backend
- Node.js, Express.js
- PostgreSQL with Prisma ORM
- Clean Architecture + Dependency Injection (tsyringe)
- JWT Authentication, bcrypt
- Redis (ioredis)
- TypeScript

---

## 📁 Project Structure

### Backend (`/backend/src`)
- controllers/
- services/
- repositories/
- routes/
- middleware/
- DI/
- cache/
- config/
- utils/

### Frontend (`/frontend/src`)
- pages/
- components/
- layouts/
- store/
- services/
- routes/
- hooks/
- utils/
- axios/

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Redis

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/restaurant_db"
JWT_ACCESS_SECRET="your_secure_access_secret"
JWT_REFRESH_SECRET="your_secure_refresh_secret"
REDIS_URL="redis://localhost:6379"
PORT=5000
```

Run migrations:

```bash
npm run db:migrate
```

Start server:

```bash
npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_API_URL="http://localhost:5000"
```

Run frontend:

```bash
npm run dev
```

---

## 📜 Features

- Secure JWT Authentication
- Restaurant CRUD Operations
- Role-Based Access Control
- Clean Architecture (Scalable Structure)
- Redux + React Query State Management
- Modern UI with Tailwind CSS
- Redis Caching for Performance

---

## 📝 Scripts

### Backend
- npm run dev
- npm run build
- npm run start
- npm run db:migrate
- npm run db:studio

### Frontend
- npm run dev
- npm run build
- npm run lint

---

## 👨‍💻 Author

Haran
