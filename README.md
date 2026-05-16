<div align="center">
  <h1>🍽️ Restaurant Management System</h1>
  <p>A modern, full-stack solution for managing restaurant operations, built with scalable architecture.</p>
  
  <h3>🌐 Live Demo: <a href="https://dine-map.vercel.app/" target="_blank">https://dine-map.vercel.app/</a></h3>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>
</div>

---

## 📖 Overview

This **Restaurant Management System** is a robust, end-to-end application designed to streamline restaurant operations. It features a scalable backend built on **Node.js, Express, and Clean Architecture principles**, heavily utilizing Dependency Injection. The frontend is a modern **React 19** application, focused on high performance and a rich user experience, styled with **Tailwind CSS v4**.

Data is securely managed using **PostgreSQL** via **Prisma ORM**, with **Redis** implemented for high-performance caching. The entire stack is fully typed with **TypeScript**, ensuring maximum reliability and developer productivity.

---

## ✨ Key Features

- **🔐 Secure Authentication:** Robust JWT-based authentication with Access and Refresh tokens.
- **🛡️ Role-Based Access Control (RBAC):** Granular permissions for different user roles (Admin, Manager, Staff).
- **🏢 Restaurant CRUD:** Complete lifecycle management for restaurant entities.
- **📦 Clean Architecture:** Separation of concerns using Controllers, Services, and Repositories (with `tsyringe` for DI).
- **⚡ High Performance:** Integrated **Redis caching** for lightning-fast data retrieval.
- **🖼️ Image Uploads:** Seamless media handling using **Cloudinary**.
- **🎨 Modern UI/UX:** Built with React 19, Redux Toolkit, React Query, and responsive Tailwind styling.
- **✅ Type Safety:** End-to-end TypeScript implementation.

---

## 🛠️ Technology Stack

### Backend (`/backend`)
* **Core:** Node.js, Express.js, TypeScript
* **Database & ORM:** PostgreSQL, Prisma ORM
* **Caching:** Redis (`ioredis`)
* **Architecture:** Clean Architecture, Dependency Injection (`tsyringe`)
* **Security:** JWT, bcryptjs, Zod (validation)
* **Storage:** Cloudinary

### Frontend (`/frontend`)
* **Core:** React 19 (Vite), TypeScript
* **State Management:** Redux Toolkit, Redux Persist
* **Data Fetching:** TanStack React Query v5, Axios
* **Styling & UI:** Tailwind CSS v4, Lucide React, shadcn/ui
* **Forms & Validation:** React Hook Form, Zod
* **Routing:** React Router DOM v7

---

## 📂 Project Structure

```text
📦 restaurant-management
├── 📂 backend/               # Node.js API server
│   ├── 📂 src/
│   │   ├── 📂 controllers/   # Request handlers
│   │   ├── 📂 services/      # Business logic
│   │   ├── 📂 repositories/  # Database access layer
│   │   ├── 📂 routes/        # API route definitions
│   │   ├── 📂 DI/            # Dependency injection setup
│   │   ├── 📂 cache/         # Redis caching logic
│   │   └── 📂 config/        # Environment and app config
│   └── 📜 prisma/schema      # Database schema
└── 📂 frontend/              # React client application
    ├── 📂 src/
    │   ├── 📂 components/    # Reusable UI components
    │   ├── 📂 pages/         # Application views
    │   ├── 📂 store/         # Redux configuration
    │   ├── 📂 services/      # API communication layer
    │   └── 📂 hooks/         # Custom React hooks
```

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **PostgreSQL**
- **Redis** server running locally or remotely

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory based on the required variables:

```env
# Server
PORT=5000

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/restaurant_db?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT Secrets
JWT_ACCESS_SECRET="your_super_secret_access_key_here"
JWT_REFRESH_SECRET="your_super_secret_refresh_key_here"

# Cloudinary (If applicable)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Run database migrations and start the server:

```bash
# Generate Prisma Client & Run Migrations
npm run db:migrate

# Start the development server
npm run dev
```

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` directory:

```env
VITE_API_URL="http://localhost:5000/api/v1"
```

Start the Vite development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

---

## 📜 Available Scripts

### Backend
| Command | Description |
|---|---|
| `npm run dev` | Starts the server in development mode using nodemon. |
| `npm run build` | Compiles TypeScript and generates Prisma client. |
| `npm run start` | Runs the compiled application. |
| `npm run db:migrate`| Applies pending Prisma migrations to the database. |

### Frontend
| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the application for production. |
| `npm run lint` | Runs ESLint to check for code quality. |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide React](https://lucide.dev/)

---

## 👤 Author

**Haran**
- GitHub: [@haranck](https://github.com/haranck)

---

<div align="center">
  <p>Made with ❤️ using TypeScript and React</p>
</div>
