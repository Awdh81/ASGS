import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function DoctorLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // ESC se close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") navigate("/");
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/doctor/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/doctor-dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Login Failed ❌");
    }
  };

  return (
    <div style={styles.overlay} onClick={() => navigate("/")}>
      <form
        onSubmit={handleSubmit}
        style={styles.form}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ❌ Close */}
        <button
          type="button"
          style={styles.closeBtn}
          onClick={() => navigate("/")}
        >
          ✖
        </button>

        <h2 style={styles.heading}>🩺 Doctor Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={styles.input}
        />

        <button type="submit" style={styles.btn}>
          Login
        </button>

        {/* Forgot */}
        <p
          style={styles.forgot}
          onClick={() => navigate("/doctor-forgot")}
        >
          Forgot Password?
        </p>

        {/* Register */}
        <p style={styles.text}>
          Don't have account?{" "}
          <Link to="/doctor-register" style={styles.link}>
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default DoctorLogin;

/* 🔥 PREMIUM STYLES */
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
    alignItems: "center"
  },

  form: {
    position: "relative",
    padding: "30px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    width: "320px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 0 30px rgba(0,0,0,0.6)"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "22px"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none"
  },

  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #10b981, #06b6d4)",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer"
  },

  forgot: {
    marginTop: "10px",
    color: "orange",
    cursor: "pointer",
    fontSize: "14px"
  },

  text: {
    marginTop: "10px"
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none"
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