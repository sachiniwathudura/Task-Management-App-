# 📌 Task Management System

A full-stack Task Management Application that allows users to register, log in, and manage their daily tasks efficiently.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes (only logged-in users can access dashboard)

---

### 📋 Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed / Incomplete

---

### 🎨 User Interface

* Clean and responsive design
* Centered dashboard layout
* Loading and error handling

---

## 🧱 Tech Stack

### 🔹 Frontend

* React
* Redux Toolkit
* React Router
* Axios

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt

---

## 📁 Project Structure

```
task-manager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── App.jsx
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone https://github.com/sachiniwathudura/-Task-Management-System.git
cd task-manager
```

---

### 🔹 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent with API requests
5. Protected routes validate token

---

## 📌 API Endpoints

### 🔹 Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### 🔹 Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`
* PUT `/api/tasks/:id/toggle`

---

## 🚀 Future Improvements

* Task filtering (completed / pending)
* Due dates & reminders
* User profile management
* Deployment (Vercel / Render)

---

## 👩‍💻 Author

Sachini Wathudura
