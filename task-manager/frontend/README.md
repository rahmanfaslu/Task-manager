# Task Manager — React Frontend

This is the frontend client for the Task Management application, built with **React**, **Vite**, **React Router v6**, and **Tailwind CSS v3**.

---

## 🚀 Getting Started

Follow these steps to run the frontend server locally:

### 1. Install Dependencies
Make sure you are in the `frontend` directory, then run:
```bash
npm install
```

### 2. Run the Development Server
To launch the Vite development server, run:
```bash
npm run dev
```
The application will be hosted locally at **`http://localhost:5173`**.

### 3. Build for Production
To build the application assets for deployment:
```bash
npm run build
```
The production-ready assets will be generated in the `dist/` directory.

---

## 🎨 Technology Stack & Design

- **Vite + React**: Fast HMR dev server and client application.
- **Tailwind CSS**: Clean, responsive, and modern card-based styling system.
- **Axios**: Used to make asynchronous HTTP requests to the backend API (`http://localhost:5000`).
- **React Router v6**: Manages public client routing (`/login`, `/register`) and protected dashboard routing (`/dashboard`).

---

## 🔐 Authentication & Session Handling

Instead of standard local storage for everything, this app uses a mixed secure storage approach:
1. **JWT Token**: Stored securely in a browser cookie via `document.cookie` (persists for 7 days).
2. **User Name**: Stored in `sessionStorage` (cleared automatically when the user closes their browser tab).
