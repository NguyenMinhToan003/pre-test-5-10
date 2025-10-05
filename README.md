# Interview-5-10 Backend

## Overview
This is the backend service for the Interview-110 project, built with Node.js, Express, and MongoDB. It provides RESTful APIs for user authentication, revenue management, and user management, with JWT-based authentication and role-based access control.

## Features
- User registration and login (JWT authentication)
- Revenue data management (CRUD)
- User management (admin features)
- Input validation
- Password hashing (bcrypt)
- Role-based access control
- API documentation with Swagger
- Environment variable support via `.env`

## Project Structure
```
backend/
  .env                # Environment variables
  package.json        # Project dependencies and scripts
  src/
    server.js         # Entry point
    seed.js           # Seed data script
    config/           # Configuration files (db, swagger)
    controllers/      # Route controllers
    middleware/       # Auth and other middleware
    models/           # Mongoose models
    routes/           # Express route definitions
    utils/            # Utility functions (JWT, password, messages)
    validations/      # Joi validation schemas
```

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd interview-110/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `backend/` directory. Example:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/interview-110
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
BCRYPT_ROUNDS=12
```

### 4. Run the server
```bash
npm run dev
```
The server will start on the port specified in `.env` (default: 5000).

### 5. API Documentation
Swagger UI is available at `/api-docs` when the server is running.

## Scripts
- `npm run dev` — Start server with nodemon
- `npm start` — Start server
- `node src/seed.js` — Seed initial data

## Main Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/revenue` — Get revenue data (auth required)
- `POST /api/revenue` — Create revenue data (auth required)
- `GET /api/user` — Get user list (admin only)

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- Joi (validation)
- Swagger (OpenAPI docs)
- dotenv

# Interview-4-10 Frontend

## Overview
A modern, responsive web application built with Next.js 15, TypeScript, and Tailwind CSS. This frontend provides a complete user interface for authentication, user management, revenue tracking, and administration features with a sleek, professional design.

## 🚀 Features

### Core Features
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Authentication System**: Complete login flow with JWT tokens
- **Dashboard**: Interactive revenue charts and analytics
- **Admin Panel**: User management and system administration
- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark/Light Theme**: Theme switching with `next-themes`
- **Form Validation**: Robust validation with Zod and React Hook Form
- **Animations**: Smooth animations with Framer Motion
- **Toast Notifications**: User feedback with Sonner

### Technical Features
- **Next.js 15**: Latest version with App Router and Turbopack
- **TypeScript**: Full type safety throughout the application
- **Server-Side Rendering (SSR)**: Optimized performance and SEO
- **API Routes**: Built-in API handling
- **Middleware**: Route protection and request handling
- **Component Library**: Reusable UI components with shadcn/ui

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15.5.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **State Management**: React hooks + Context API
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Fetch API with custom utilities
- **Charts**: Recharts for data visualization

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Build Tool**: Turbopack (Next.js 15)
- **Type Checking**: TypeScript compiler

## 📁 Project Structure

```
frontend/
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── components.json        # shadcn/ui configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── public/                # Static assets
└── src/
    ├── config.ts          # Environment configuration
    ├── middleware.ts      # Next.js middleware
    ├── app/               # App Router pages
    ├── components/        # Reusable components
    │   ├── ui/            # UI primitives (buttons, inputs, etc.)
    │   └── element/       # Custom components
    ├── lib/               # Utility libraries
    │   ├── http.ts        # HTTP client utilities
    │   └── utils.ts       # General utilities
    ├── response/          # API response type definitions
    ├── schemaValidation/  # Zod validation schemas
    └── types/             # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
```env
NEXT_PUBLIC_API_ENDPOINT=http://localhost:8123/api
```

### 4. Start the development server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`
```

## 📋 Available Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build production application with Turbopack
- `npm start` — Start production server
- `npm run lint` — Run ESLint for code quality

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_ENDPOINT`: Backend API base URL

### Key Configuration Files
- `next.config.ts`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS customization
- `components.json`: shadcn/ui component configuration
- `tsconfig.json`: TypeScript compiler options

## 🎨 UI Components

The project uses a combination of:
- **Radix UI**: Accessible, unstyled components
- **shadcn/ui**: Pre-built component library
- **Custom Components**: Project-specific UI elements
- **Lucide React**: Beautiful icons
- **Tailwind CSS**: Utility-first styling

## 📱 Pages & Features

### Authentication (`/auth`)
- Login page with form validation
- Registration page
- Password reset functionality
- JWT token management

### Dashboard (`/home`)
- Revenue analytics and charts
- Quick stats and KPIs
- Recent activity feed
- User profile management

### Admin Panel (`/admin`)
- **Revenue Charts**: Visual analytics with Recharts integration

### Revenue Management (`/admin/revenue`)
- **Revenue Dashboard**: Overview of total revenue, trends, and analytics
- **Add Revenue**: Create new revenue entries with validation
- **Edit Revenue**: Update existing revenue records
- **Delete Revenue**: Remove revenue entries (admin only)

