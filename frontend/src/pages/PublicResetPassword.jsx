import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PublicResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/public/reset-password",
        {
          token,
          newPassword
        }
      );

      alert(res.data.msg);
      navigate("/public-login");

    } catch (err) {
      alert(err.response?.data?.msg || "Invalid token ❌");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Reset Password</h2>

        <input
          type="text"
          placeholder="Enter Token"
          onChange={(e) => setToken(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleReset}>
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default PublicResetPassword;

/* 🎨 STYLE */
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
  }
};