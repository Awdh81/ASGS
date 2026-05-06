import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function DoctorVerify() {
  const [form, setForm] = useState({
    email: "",
    otp: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  // Resend OTP timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

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
      const res = await axios.post(
        "http://localhost:8000/api/doctor/verify",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Verified ✅");
      navigate("/doctor-dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Verification Failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      await axios.post("http://localhost:8000/api/doctor/resend-otp", {
        email: form.email
      });
      alert("OTP resent successfully! 📩");
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to resend OTP ❌");
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

        {/* Verify Icon */}
        <div style={styles.iconBox}>
          <span style={styles.icon}>✅</span>
        </div>

        <h2 style={styles.heading}>Verify OTP</h2>
        <p style={styles.tagline}>Enter the code sent to your email</p>

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

        {/* OTP Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔐</span>
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              style={styles.input}
              maxLength="6"
              required
            />
          </div>
        </div>

        {/* Verify Button */}
        <button type="submit" style={styles.btn} disabled={isLoading}>
          {isLoading ? <span style={styles.spinner}></span> : "Verify →"}
        </button>

        {/* Resend OTP Section */}
        <div style={styles.resendSection}>
          <p style={styles.resendText}>
            {canResend ? (
              <span onClick={handleResendOTP} style={styles.resendLink}>
                Resend OTP 📩
              </span>
            ) : (
              <span style={styles.timerText}>
                Resend OTP in {timer} seconds
              </span>
            )}
          </p>
        </div>

        {/* Divider */}
        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>need help?</span>
          <span style={styles.dividerLine}></span>
        </div>

        {/* Back to Login */}
        <p style={styles.text}>
          Wrong email?{" "}
          <Link to="/doctor-login" style={styles.link}>
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default DoctorVerify;

/* 🔥 CASUAL & STYLISH STYLES */
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(0,0,0,0.92), rgba(0,0,0,0.96))",
    backdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },

  form: {
    position: "relative",
    padding: "32px 26px 28px 26px",
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
    marginBottom: "16px",
    display: "flex",
    justifyContent: "center"
  },

  icon: {
    fontSize: "48px",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    padding: "12px",
    borderRadius: "50%",
    display: "inline-block",
    boxShadow: "0 8px 20px rgba(16,185,129,0.3)"
  },

  heading: {
    marginBottom: "6px",
    fontSize: "22px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.3px"
  },

  tagline: {
    marginBottom: "24px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    fontWeight: "400"
  },

  inputGroup: {
    marginBottom: "14px"
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
    padding: "11px 12px 11px 35px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    background: "rgba(0,0,0,0.4)",
    color: "#fff",
    fontSize: "13px",
    transition: "all 0.2s ease",
    fontFamily: "inherit"
  },

  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #10b981, #06b6d4)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginTop: "6px",
    marginBottom: "16px"
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

  resendSection: {
    marginBottom: "20px"
  },

  resendText: {
    fontSize: "12px",
    margin: "8px 0"
  },

  resendLink: {
    color: "#f59e0b",
    cursor: "pointer",
    fontWeight: "500",
    transition: "opacity 0.2s",
    display: "inline-block"
  },

  timerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "11px"
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
  if (typeof document !== "undefined" && !document.getElementById("doctor-verify-styles")) {
    const style = document.createElement("style");
    style.id = "doctor-verify-styles";
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
      
      .resend-link:hover {
        opacity: 0.8;
        text-decoration: underline;
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