import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function PublicLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/public/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/public-dashboard");

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
        {/* Close Button */}
        <button
          type="button"
          style={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        {/* Premium Icon */}
        <div style={styles.iconWrapper}>
          <div style={styles.iconCircle}>
            <span style={styles.icon}>👤</span>
          </div>
        </div>

        <h2 style={styles.heading}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {/* Email Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>📧</span>
            <input
              name="email"
              type="email"
              placeholder="Email address"
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
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button
              type="button"
              style={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div style={styles.forgotWrapper}>
          <p
            style={styles.forgot}
            onClick={() => navigate("/public-forgot")}
          >
            Forgot password?
          </p>
        </div>

        {/* Login Button */}
        <button 
          type="submit" 
          style={styles.btn}
          disabled={isLoading}
        >
          {isLoading ? (
            <span style={styles.spinner}></span>
          ) : (
            "Login →"
          )}
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Register Link */}
        <p style={styles.text}>
          Don't have an account?{" "}
          <Link to="/public-register" style={styles.link}>
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default PublicLogin;

/* 🔥 PREMIUM COMPACT STYLES */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle at center, rgba(0,0,0,0.95), rgba(0,0,0,0.98))",
    backdropFilter: "blur(20px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  form: {
    position: "relative",
    padding: "30px 28px 28px 28px",
    borderRadius: "28px",
    background: "linear-gradient(145deg, #0a0f1e, #030617)",
    width: "320px",
    maxWidth: "90%",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
    transition: "transform 0.2s ease"
  },

  iconWrapper: {
    marginBottom: "16px",
    display: "flex",
    justifyContent: "center"
  },

  iconCircle: {
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(245,158,11,0.3)"
  },

  icon: {
    fontSize: "28px"
  },

  heading: {
    marginBottom: "4px",
    fontSize: "22px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.3px"
  },

  subtitle: {
    marginBottom: "24px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },

  inputGroup: {
    marginBottom: "12px"
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  inputIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "14px",
    opacity: 0.6,
    zIndex: 1
  },

  input: {
    width: "100%",
    padding: "10px 40px 10px 38px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontSize: "13px",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    backdropFilter: "blur(4px)"
  },

  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s"
  },

  forgotWrapper: {
    textAlign: "right",
    marginBottom: "18px",
    marginTop: "4px"
  },

  forgot: {
    color: "#f59e0b",
    cursor: "pointer",
    fontSize: "11px",
    display: "inline-block",
    transition: "opacity 0.2s",
    margin: 0,
    fontWeight: "500",
    letterSpacing: "0.3px"
  },

  btn: {
    width: "100%",
    padding: "11px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "20px"
  },

  spinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite"
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px"
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.06)"
  },

  dividerText: {
    fontSize: "10px",
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
    fontWeight: "600",
    transition: "color 0.2s"
  },

  closeBtn: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "rgba(255,255,255,0.05)",
    border: "none",
    borderRadius: "50%",
    width: "26px",
    height: "26px",
    color: "rgba(255,255,255,0.6)",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

// Add animation keyframes (add this to your global CSS)
const injectStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("login-styles")) {
    const style = document.createElement("style");
    style.id = "login-styles";
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      input:focus {
        border-color: #f59e0b !important;
        box-shadow: 0 0 0 2px rgba(245,158,11,0.15) !important;
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
    document.head.appendChild(style)
  }
};

injectStyles();