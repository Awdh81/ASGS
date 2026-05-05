import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  // ESC se close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // redirect + close
  const handleRedirect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button style={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        <h2 style={styles.heading}>✨ Login As</h2>

        {/* Admin */}
        <button
          style={{ ...styles.btn, ...styles.admin }}
          onClick={() => handleRedirect("/admin-login")}
        >
          👨‍💼 Admin
        </button>

        {/* Doctor */}
        <button
          style={{ ...styles.btn, ...styles.doctor }}
          onClick={() => handleRedirect("/doctor-login")}
        >
          🩺 Doctor
        </button>

        {/* User */}
        <button
          style={{ ...styles.btn, ...styles.user }}
          onClick={() => handleRedirect("/public-login")}
        >
          👤 User
        </button>

      </div>
    </div>
  );
}

export default LoginModal;

/* 🔥 ALL STYLES INCLUDED */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  modal: {
    position: "relative",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    width: "320px",
    color: "#fff",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    boxShadow: "0 0 30px rgba(0,0,0,0.6)"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600"
  },

  btn: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "12px",
    border: "none",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "500"
  },

  admin: {
    background: "linear-gradient(45deg, #3b82f6, #6366f1)"
  },

  doctor: {
    background: "linear-gradient(45deg, #10b981, #06b6d4)"
  },

  user: {
    background: "linear-gradient(45deg, #f59e0b, #ef4444)"
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