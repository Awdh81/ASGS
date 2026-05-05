import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function PublicLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

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

    try {
      const res = await axios.post(
        "http://localhost:8000/api/public/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/public-dashboard");

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

        <h2 style={styles.heading}>👤 Public Login</h2>

        <input
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button style={styles.btn}>
          Login
        </button>

        {/* Forgot */}
        <p
          style={styles.forgot}
          onClick={() => navigate("/public-forgot")}
        >
          Forgot Password?
        </p>

        {/* Register */}
        <p style={styles.text}>
          Don’t have account?{" "}
          <Link to="/public-register" style={styles.link}>
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default PublicLogin;

/* 🔥 PREMIUM STYLES */
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
    alignItems: "center"
  },

  form: {
    position: "relative",
    padding: "30px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    width: "320px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 0 40px rgba(0,0,0,0.7)"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#111",
    color: "#fff"
  },

  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #f59e0b, #ef4444)",
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