import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({
        email,
        password,
        role: "admin",
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Success ✅");
      navigate("/dashboard");

    } catch (err) {
      alert("Invalid Email or Password ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        {/* Close */}
        <button style={styles.closeBtn} onClick={() => navigate("/")}>
          ✖
        </button>

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {/* ✅ Forgot Password (FIXED) */}
        <p
          style={{ cursor: "pointer", color: "orange", textAlign: "right" }}
          onClick={() => navigate("/forgot")}
        >
          Forgot Password?
        </p>

        {/* Register */}
        <p
          style={{ cursor: "pointer", color: "skyblue" }}
          onClick={() => navigate("/register")}
        >
          Don't have account? Register
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#0f172a"
  },

  box: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    width: "320px",
    background: "#111",
    color: "#fff"
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    color: "#fff",
    border: "none",
    fontSize: "18px",
    cursor: "pointer"
  }
};

export default AdminLogin;