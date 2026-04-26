import axios from "axios";

// Base URL (backend)
const API = axios.create({
  baseURL: "http://localhost:5000"
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.authorization = token; // ✅ matches your backend
  }

  return req;
});

// 🔥 IMPORTANT (fix your error)
export default API;

// ---------- TODOS ----------

// GET all tasks
export const getTodos = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

// CREATE task
export const createTodo = async (data) => {
  const res = await API.post("/tasks", data);
  return res.data;
};

// UPDATE task
export const updateTodo = async (id, data) => {
  const res = await API.put(`/tasks/${id}`, data);
  return res.data;
};

// DELETE task
export const deleteTodo = async (id) => {
  await API.delete(`/tasks/${id}`);
};

// TOGGLE done
export const toggleTodoDone = async (id) => {
  const res = await API.put(`/tasks/${id}/toggle`);
  return res.data;
};


