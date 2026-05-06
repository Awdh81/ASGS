import React, { useState, useEffect } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin"
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username required";
    if (!form.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password required";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);

      await register(form);

      setLoading(false);

      alert("OTP sent to email 📩");

      localStorage.setItem("email", form.email);

      navigate("/verify");

    } catch (err) {
      setLoading(false);

      console.log(err.response?.data);

      const message = err.response?.data?.message;

      if (message === "User already exists") {
        alert("User already exists ❌");
        navigate("/admin-login");
      } else {
        alert(message || "Register Failed ❌");
      }
    }
  };

  return (
    <div style={styles.overlay} onClick={() => navigate("/")}>
      <div style={styles.form} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          style={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        {/* Register Icon */}
        <div style={styles.iconBox}>
          <span style={styles.icon}>📝</span>
        </div>

        <h2 style={styles.heading}>Create Account</h2>
        <p style={styles.tagline}>Join as Admin</p>

        {/* Username Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>👤</span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              style={{ ...styles.input, ...(errors.username && styles.inputError) }}
            />
          </div>
          {errors.username && <span style={styles.errorText}>{errors.username}</span>}
        </div>

        {/* Email Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>📧</span>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              style={{ ...styles.input, ...(errors.email && styles.inputError) }}
            />
          </div>
          {errors.email && <span style={styles.errorText}>{errors.email}</span>}
        </div>

        {/* Password Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={{ ...styles.input, ...(errors.password && styles.inputError) }}
            />
            <button
              type="button"
              style={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <span style={styles.errorText}>{errors.password}</span>}
        </div>

        {/* Hidden role field (kept for API) */}
        <input type="hidden" name="role" value={form.role} />

        {/* Register Button */}
        <button 
          onClick={handleRegister} 
          style={styles.btn}
          disabled={loading}
        >
          {loading ? <span style={styles.spinner}></span> : "Register →"}
        </button>

        {/* Loading Message */}
        {loading && (
          <div style={styles.loadingMsg}>
            <span>Sending OTP... ⏳</span>
          </div>
        )}

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>already a member?</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Login Link */}
        <p style={styles.text}>
          Have an account?{" "}
          <Link to="/admin-login" style={styles.link}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

/* 🔥 CASUAL & STYLISH STYLES */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.95))",
    backdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  form: {
    position: "relative",
    padding: "30px 26px 28px 26px",
    borderRadius: "24px",
    background: "linear-gradient(145deg, #0f172a, #0a0f1c)",
    width: "320px",
    maxWidth: "90%",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 25px 45px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
    animation: "slideUp 0.3s ease-out"
  },

  iconBox: {
    marginBottom: "14px",
    display: "flex",
    justifyContent: "center"
  },

  icon: {
    fontSize: "46px",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    padding: "12px",
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(139,92,246,0.3)"
  },

  heading: {
    marginBottom: "5px",
    fontSize: "22px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.3px"
  },

  tagline: {
    marginBottom: "22px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    fontWeight: "400"
  },

  inputGroup: {
    marginBottom: "12px",
    textAlign: "left"
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  inputIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "14px",
    opacity: 0.6,
    zIndex: 1
  },

  input: {
    width: "100%",
    padding: "11px 35px 11px 35px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    background: "rgba(0,0,0,0.4)",
    color: "#fff",
    fontSize: "13px",
    transition: "all 0.2s ease",
    fontFamily: "inherit"
  },

  inputError: {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 2px rgba(239,68,68,0.1)"
  },

  errorText: {
    display: "block",
    marginTop: "5px",
    fontSize: "10px",
    color: "#ef4444"
  },

  eyeBtn: {
    position: "absolute",
    right: "10px",
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0",
    display: "flex",
    alignItems: "center"
  },

  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "8px",
    marginBottom: "12px"
  },

  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite"
  },

  loadingMsg: {
    marginTop: "8px",
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "10px",
    background: "rgba(139,92,246,0.15)",
    fontSize: "11px",
    color: "#a78bfa"
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "16px",
    marginBottom: "14px"
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.06)"
  },

  dividerText: {
    fontSize: "9px",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  text: {
    margin: 0,
    fontSize: "11px",
    color: "rgba(255,255,255,0.5)"
  },

  link: {
    color: "#a78bfa",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s"
  },

  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(255,255,255,0.05)",
    border: "none",
    borderRadius: "50%",
    width: "26px",
    height: "26px",
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  }
};

// Add animations
const injectStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("admin-register-styles")) {
    const style = document.createElement("style");
    style.id = "admin-register-styles";
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      input:focus {
        border-color: #8b5cf6 !important;
        box-shadow: 0 0 0 2px rgba(139,92,246,0.15) !important;
      }
      
      button:hover:not(:disabled) {
        transform: translateY(-2px);
        filter: brightness(1.05);
      }
      
      .link:hover {
        opacity: 0.8;
      }
      
      .close-btn:hover {
        background: rgba(255,255,255,0.1) !important;
      }
    `;
    document.head.appendChild(style);
  }
};

injectStyles();