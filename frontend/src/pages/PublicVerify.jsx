import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PublicVerify() {
  const [form, setForm] = useState({
    email: "",
    otp: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

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
    if (!form.email || !form.otp) {
      alert("Please fill all fields ❌");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/public/verify", form);
      localStorage.setItem("token", res.data.token);
      alert("Verified ✅");
      navigate("/public-dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Verification Failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || !form.email) return;
    try {
      await axios.post("http://localhost:8000/api/public/resend-otp", { email: form.email });
      alert("OTP resent! 📩");
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      alert("Failed to resend OTP ❌");
    }
  };

  return (
    <div style={styles.overlay} onClick={() => navigate("/")}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={() => navigate("/")}>✕</button>

        <div style={styles.iconBox}>✅</div>

        <h2 style={styles.heading}>Verify OTP</h2>
        <p style={styles.subtext}>Enter 6-digit code</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>📧</span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔐</span>
            <input
              name="otp"
              type="text"
              placeholder="OTP"
              value={form.otp}
              onChange={handleChange}
              style={styles.input}
              maxLength={6}
              required
            />
          </div>

          <button type="submit" style={styles.btn} disabled={isLoading}>
            {isLoading ? <span style={styles.spinner}></span> : "Verify →"}
          </button>

          <div style={styles.resendBox}>
            {canResend ? (
              <button onClick={handleResendOTP} style={styles.resendBtn}>Resend OTP</button>
            ) : (
              <p style={styles.timer}>Resend in {timer}s</p>
            )}
          </div>

          <p style={styles.loginText}>
            <span onClick={() => navigate("/public-login")} style={styles.loginLink}>← Back to Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PublicVerify;

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },

  card: {
    position: "relative",
    width: "300px",
    background: "linear-gradient(145deg, #0f172a, #0a0f1c)",
    borderRadius: "20px",
    padding: "24px 20px 20px",
    boxShadow: "0 20px 35px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
    textAlign: "center"
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(255,255,255,0.08)",
    border: "none",
    width: "24px",
    height: "24px",
    borderRadius: "12px",
    color: "rgba(255,255,255,0.5)",
    fontSize: "12px",
    cursor: "pointer"
  },

  iconBox: {
    fontSize: "40px",
    marginBottom: "12px"
  },

  heading: {
    fontSize: "20px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #10b981, #34d399)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "4px"
  },

  subtext: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "20px"
  },

  inputWrapper: {
    position: "relative",
    marginBottom: "10px"
  },

  inputIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "14px",
    opacity: 0.6
  },

  input: {
    width: "100%",
    padding: "10px 12px 10px 36px",
    fontSize: "13px",
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    color: "#fff",
    outline: "none"
  },

  btn: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "8px"
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

  resendBox: {
    marginTop: "12px",
    textAlign: "center"
  },

  resendBtn: {
    background: "transparent",
    border: "none",
    color: "#f59e0b",
    fontSize: "11px",
    cursor: "pointer"
  },

  timer: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.4)",
    margin: 0
  },

  loginText: {
    marginTop: "16px",
    paddingTop: "12px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    fontSize: "11px"
  },

  loginLink: {
    color: "#38bdf8",
    cursor: "pointer"
  }
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  input:focus {
    border-color: #10b981 !important;
  }
  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`;
document.head.appendChild(styleSheet);