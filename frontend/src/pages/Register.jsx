import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin"
  });

  const [loading, setLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);  // ✅ start loading

      await register(form);

      setLoading(false); // ✅ stop loading

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
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Sending OTP..." : "Register"}
        </button>

        {/* ✅ Popup / Message */}
        {loading && <p style={{ color: "yellow" }}>Sending OTP... ⏳</p>}
      </div>
    </div>
  );
}

// 🎨 styling
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    width: "300px",
    background: "#111",
    color: "#fff"
  }
};

export default Register;