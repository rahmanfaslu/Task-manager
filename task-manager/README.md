# Task Management Web Application (MERN Stack)

A simple, clean, and beginner-friendly full-stack Task Management application built using MongoDB, Express, React, and Node.js with Tailwind CSS for styling.

---

## 📁 Project Structure

```text
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js          - User Schema (name, email, password)
│   │   └── Task.js          - Task Schema (title, description, status, userId)
│   ├── routes/
│   │   ├── authRoutes.js    - Register & Login endpoints
│   │   └── taskRoutes.js    - Task CRUD endpoints
│   ├── middleware/
│   │   └── authMiddleware.js- Authenticates requests with JWT
│   ├── .env                 - Environment variables configuration
│   ├── server.js            - Main entry point for backend
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx     - Login page
    │   │   ├── Register.jsx  - Register page
    │   │   └── Dashboard.jsx - Task dashboard page
    │   ├── components/
    │   │   ├── TaskCard.jsx  - Renders task item (with status toggle, inline edit, delete)
    │   │   ├── TaskForm.jsx  - Add task form
    │   │   └── Navbar.jsx    - Navigation bar with logout
    │   ├── utils/
    │   │   └── auth.js       - Helpers for managing auth tokens (Cookies) & user sessions (Session Storage)
    │   ├── App.jsx           - Routes setup (React Router v6)
    │   ├── main.jsx          - React entry point
    │   └── index.css         - Tailwind CSS directives and custom font styles
    └── package.json
```

---

## 🚀 Setup Instructions

Follow these steps to get the application running locally:

### Prerequisites
- Make sure you have **Node.js** installed on your system.
- You will need a **MongoDB** connection string (local instance or MongoDB Atlas).

---

### 1. Backend Setup

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd task-manager/backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (if one doesn't exist already) in the `backend` directory and add your configuration details:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server (uses `nodemon` for auto-reloading):
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1. Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd task-manager/frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   The frontend application will be hosted on `http://localhost:5173`.

---

## 🔒 Authentication & Storage Design

To demonstrate modern, secure auth management, this application avoids saving sensitive data directly in local storage:
- **Authentication Token (JWT)**: Saved and retrieved via **browser cookies** (`document.cookie`) with an expiration period of 7 days.
- **User Session Details (username)**: Stored in **session storage** (`sessionStorage`) which is automatically cleared when the user closes their browser tab.
