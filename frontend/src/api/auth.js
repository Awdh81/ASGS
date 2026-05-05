import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// ================= AUTH =================

// REGISTER
export const register = (data) => API.post("/register", data);

// VERIFY OTP
export const verifyOTP = (data) => API.post("/verify", data);

// LOGIN (single route)
export const login = (data) => API.post("/login", data);

// LOGOUT
export const logout = () => API.post("/logout");

// FORGOT PASSWORD
export const forgotPassword = (data) =>
  API.post("/forgot-password", data);

// RESET PASSWORD
export const resetPassword = (data) =>
  API.post("/reset-password", data);

// ================= TOKEN =================

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});