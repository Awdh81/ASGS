import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function DoctorLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ESC se close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") navigate("/");
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/doctor/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/doctor-dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={() => navigate("/")}>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close Button */}
        <button
          type="button"
          style={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        {/* Doctor Icon */}
        <div style={styles.iconBox}>
          <span style={styles.icon}>🩺</span>
        </div>

        <h2 style={styles.heading}>Doctor Login</h2>
        <p style={styles.tagline}>Welcome back, doctor!</p>

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
              style={styles.input}
              required
            />
          </div>
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
              style={styles.input}
              required
            />
            <button
              type="button"
              style={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div style={styles.forgotWrapper}>
          <p style={styles.forgot} onClick={() => navigate("/doctor-forgot")}>
            Forgot password?
          </p>
        </div>

        {/* Login Button */}
        <button type="submit" style={styles.btn} disabled={isLoading}>
          {isLoading ? <span style={styles.spinner}></span> : "Login →"}
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>new here?</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Register Link */}
        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/doctor-register" style={styles.link}>
            Register now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default DoctorLogin;

/* 🔥 COMPACT & CASUAL STYLES */
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
    alignItems: "center",
    zIndex: 1000
  },

  form: {
    position: "relative",
    padding: "28px 24px 24px 24px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, #0f172a, #0a0f1c)",
    width: "300px",
    maxWidth: "90%",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 20px 35px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
    transition: "all 0.2s ease"
  },

  iconBox: {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "center"
  },

  icon: {
    fontSize: "42px",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    padding: "12px",
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 5px 15px rgba(16,185,129,0.3)"
  },

  heading: {
    marginBottom: "4px",
    fontSize: "20px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  tagline: {
    marginBottom: "20px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    fontWeight: "400"
  },

  inputGroup: {
    marginBottom: "10px"
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
    padding: "10px 35px 10px 35px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    background: "rgba(0,0,0,0.4)",
    color: "#fff",
    fontSize: "13px",
    transition: "all 0.2s ease",
    fontFamily: "inherit"
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

  forgotWrapper: {
    textAlign: "right",
    marginBottom: "16px",
    marginTop: "2px"
  },

  forgot: {
    color: "#10b981",
    cursor: "pointer",
    fontSize: "11px",
    display: "inline-block",
    margin: 0,
    fontWeight: "500"
  },

  btn: {
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginBottom: "18px"
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

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
    color: "#38bdf8",
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
    width: "24px",
    height: "24px",
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
  if (typeof document !== "undefined" && !document.getElementById("doctor-login-styles")) {
    const style = document.createElement("style");
    style.id = "doctor-login-styles";
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      input:focus {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 2px rgba(16,185,129,0.15) !important;
      }
      
      button:hover:not(:disabled) {
        transform: translateY(-1px);
        filter: brightness(1.05);
      }
      
      .forgot:hover, .link:hover {
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