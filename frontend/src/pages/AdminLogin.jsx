import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {/* Close Button */}
        <button style={styles.closeBtn} onClick={() => navigate("/")}>
          ✕
        </button>

        {/* Icon/Logo */}
        <div style={styles.iconContainer}>
          <div style={styles.adminIcon}>👑</div>
        </div>

        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.subtitle}>Welcome back admin</p>

        {/* Email Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
          </div>
        </div>

        {/* Password Input */}
        <div style={styles.inputGroup}>
          <div style={styles.inputWrapper}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Forgot Password & Login Row */}
        <div style={styles.actionRow}>
          <p
            style={styles.forgotLink}
            onClick={() => navigate("/forgot")}
          >
            Forgot password?
          </p>
          
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...styles.loginBtn,
              ...(loading && styles.loginBtnDisabled)
            }}
          >
            {loading ? (
              <span style={styles.loader}></span>
            ) : (
              "Login"
            )}
          </button>
        </div>

        {/* Register Link */}
        <div style={styles.registerContainer}>
          <p style={styles.registerText}>
            New here?{" "}
            <span
              style={styles.registerLink}
              onClick={() => navigate("/register")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)",
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    padding: "20px",
  },

  box: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "28px 24px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "340px",
    background: "#ffffff",
    boxShadow: "0 20px 35px -8px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.02)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "#f3f4f6",
    color: "#6b7280",
    border: "none",
    fontSize: "16px",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    fontWeight: "bold",
  },

  iconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "4px",
  },

  adminIcon: {
    fontSize: "44px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },

  title: {
    textAlign: "center",
    color: "#111827",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0",
    letterSpacing: "-0.3px",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "12px",
    margin: "-6px 0 0 0",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  inputIcon: {
    position: "absolute",
    left: "12px",
    fontSize: "16px",
    zIndex: 1,
    opacity: 0.6,
  },

  input: {
    width: "100%",
    padding: "10px 36px 10px 36px",
    fontSize: "14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.2s ease",
    backgroundColor: "#f9fafb",
    color: "#111827",
    fontFamily: "inherit",
  },

  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0",
    opacity: 0.5,
    transition: "opacity 0.2s ease",
  },

  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "4px",
  },

  forgotLink: {
    cursor: "pointer",
    color: "#667eea",
    fontSize: "12px",
    fontWeight: "500",
    margin: 0,
    transition: "color 0.2s ease",
    whiteSpace: "nowrap",
  },

  loginBtn: {
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    flex: 1,
    letterSpacing: "0.3px",
  },

  loginBtnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },

  loader: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    borderTopColor: "#fff",
    animation: "spin 0.6s linear infinite",
  },

  registerContainer: {
    textAlign: "center",
    marginTop: "4px",
    paddingTop: "12px",
    borderTop: "1px solid #f0f0f0",
  },

  registerText: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0,
  },

  registerLink: {
    cursor: "pointer",
    color: "#667eea",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },
};

// Add keyframe animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  input:hover {
    border-color: #d1d5db;
    background-color: #ffffff;
  }
  
  input:focus {
    border-color: #667eea;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .closeBtn:hover {
    background: #e5e7eb;
    transform: rotate(90deg);
  }
  
  .forgotLink:hover, .registerLink:hover {
    color: #5b21b6;
    text-decoration: underline;
  }
  
  .adminIcon {
    transition: transform 0.3s ease;
  }
  
  .adminIcon:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);

export default AdminLogin;