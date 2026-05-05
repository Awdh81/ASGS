import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/forgot-password",
        { email }
      );

      alert(res.data.message);
      navigate("/reset"); // next page
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Send Token
        </button>

        <p style={styles.link} onClick={() => navigate("/")}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#0f172a"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "25px",
    borderRadius: "12px",
    width: "320px",
    background: "#111",
    color: "#fff"
  },
  link: {
    cursor: "pointer",
    color: "skyblue",
    textAlign: "center"
  }
};