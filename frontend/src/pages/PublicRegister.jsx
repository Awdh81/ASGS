import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function PublicRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
    else if (form.password.length < 6) newErrors.password = "Min 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      await axios.post("http://localhost:8000/api/public/register", form);
      alert("OTP sent 📩");
      navigate("/public-verify");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button style={styles.closeBtn} onClick={() => navigate("/")}>
          ✕
        </button>

        {/* Icon */}
        <div style={styles.iconWrap}>
          <span style={styles.icon}>🐾</span>
        </div>

        <h2 style={styles.heading}>Join Us</h2>
        <p style={styles.subtext}>Create your public account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Username */}
          <div style={styles.field}>
            <div style={styles.inputWrap}>
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
            {errors.username && <span style={styles.errorMsg}>{errors.username}</span>}
          </div>

          {/* Email */}
          <div style={styles.field}>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>📧</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                style={{ ...styles.input, ...(errors.email && styles.inputError) }}
              />
            </div>
            {errors.email && <span style={styles.errorMsg}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={styles.field}>
            <div style={styles.inputWrap}>
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
            {errors.password && <span style={styles.errorMsg}>{errors.password}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.submitBtn} disabled={isLoading}>
            {isLoading ? <span style={styles.spinner}></span> : "Register →"}
          </button>
        </form>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Login Link */}
        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/public-login" style={styles.loginLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PublicRegister;

/* 🔥 STYLISH & COMPACT STYLES */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(145deg, rgba(0,0,0,0.85), rgba(0,0,0,0.92))",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  card: {
    position: "relative",
    width: "300px",
    maxWidth: "90%",
    background: "linear-gradient(145deg, #0f172a, #0a0f1c)",
    borderRadius: "28px",
    padding: "28px 22px 24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
    textAlign: "center"
  },

  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(255,255,255,0.08)",
    border: "none",
    width: "28px",
    height: "28px",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  iconWrap: {
    marginBottom: "12px"
  },

  icon: {
    fontSize: "42px",
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    padding: "10px",
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 6px 16px rgba(245,158,11,0.3)"
  },

  heading: {
    fontSize: "20px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "4px"
  },

  subtext: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "22px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  field: {
    textAlign: "left"
  },

  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center"
  },

  inputIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "13px",
    opacity: 0.6
  },

  input: {
    width: "100%",
    padding: "10px 35px 10px 35px",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "13px",
    outline: "none",
    transition: "all 0.2s"
  },

  inputError: {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 2px rgba(239,68,68,0.1)"
  },

  errorMsg: {
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
    padding: 0
  },

  submitBtn: {
    width: "100%",
    padding: "11px",
    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "6px",
    transition: "all 0.2s"
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
    margin: "20px 0 14px"
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255,255,255,0.06)"
  },

  dividerText: {
    fontSize: "9px",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase"
  },

  loginText: {
    margin: 0,
    fontSize: "11px",
    color: "rgba(255,255,255,0.5)"
  },

  loginLink: {
    color: "#f59e0b",
    textDecoration: "none",
    fontWeight: "500"
  }
};

// Add animation
const injectStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("public-register-styles")) {
    const style = document.createElement("style");
    style.id = "public-register-styles";
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      input:focus {
        border-color: #f59e0b !important;
        box-shadow: 0 0 0 2px rgba(245,158,11,0.15) !important;
      }
      
      button:hover:not(:disabled) {
        transform: translateY(-2px);
        filter: brightness(1.05);
      }
      
      .close-btn:hover {
        background: rgba(255,255,255,0.15) !important;
      }
    `;
    document.head.appendChild(style);
  }
};

injectStyles();