import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(form); // 🔍 debug

      await axios.post(
        "http://localhost:8000/api/doctor/register",
        form
      );

      alert("OTP sent 📩");
      navigate("/doctor-verify");

    } catch (err) {
      alert(err.response?.data?.msg || "Error ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Close Button */}
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

        <h2 style={styles.heading}>Doctor Registration</h2>
        <p style={styles.tagline}>Join our medical community</p>

        {/* Name Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>👨‍⚕️</span>
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
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

        {/* Specialization Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🎓</span>
            <input
              name="specialization"
              type="text"
              placeholder="Specialization (e.g., Cardiologist)"
              value={form.specialization}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>

        {/* Register Button */}
        <button type="submit" style={styles.btn} disabled={isLoading}>
          {isLoading ? <span style={styles.spinner}></span> : "Register →"}
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>already have an account?</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Login Link */}
        <p style={styles.text}>
          Already registered?{" "}
          <Link to="/doctor-login" style={styles.link}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default DoctorRegister;

/* 🔥 CASUAL & STYLISH STYLES */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0.95))",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  form: {
    position: "relative",
    padding: "28px 24px 24px 24px",
    borderRadius: "24px",
    background: "linear-gradient(145deg, #0f172a, #0a0f1c)",
    width: "320px",
    maxWidth: "90%",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 25px 40px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
    animation: "slideUp 0.3s ease-out"
  },

  iconBox: {
    marginBottom: "12px",
    display: "flex",
    justifyContent: "center"
  },

  icon: {
    fontSize: "45px",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    padding: "12px",
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(16,185,129,0.3)"
  },

  heading: {
    marginBottom: "4px",
    fontSize: "20px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
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

  btn: {
    width: "100%",
    padding: "11px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "8px",
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
  if (typeof document !== "undefined" && !document.getElementById("doctor-register-styles")) {
    const style = document.createElement("style");
    style.id = "doctor-register-styles";
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
        border-color: #10b981 !important;
        box-shadow: 0 0 0 2px rgba(16,185,129,0.15) !important;
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