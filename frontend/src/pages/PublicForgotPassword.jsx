import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PublicForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") navigate("/");
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/public/forgot-password",
        { email }
      );

      alert(res.data.msg);
      navigate("/public-reset");

    } catch (err) {
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  return (
    <div style={styles.overlay} onClick={() => navigate("/")}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>

        {/* ❌ Close */}
        <button style={styles.closeBtn} onClick={() => navigate("/")}>
          ✖
        </button>

        <h2 style={styles.heading}>🔐 Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button style={styles.btn} onClick={handleSubmit}>
          Send Token
        </button>

        <p style={styles.link} onClick={() => navigate("/public-login")}>
          Back to Login
        </p>

      </div>
    </div>
  );
}

export default PublicForgotPassword;

/* 🔥 PREMIUM STYLES */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  box: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "30px",
    borderRadius: "18px",
    width: "320px",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "#fff",
    boxShadow: "0 0 40px rgba(0,0,0,0.7)",
    textAlign: "center"
  },

  heading: {
    fontSize: "22px",
    marginBottom: "10px"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#111",
    color: "#fff"
  },

  btn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #f59e0b, #ef4444)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.3s"
  },

  link: {
    cursor: "pointer",
    color: "#38bdf8",
    marginTop: "5px"
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer"
  }
};