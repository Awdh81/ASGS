import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Successful 🚪");
    navigate("/admin-login");
  };

  return (
    <div style={styles.container}>
      
      <h1 style={styles.heading}>
        Welcome to Admin Dashboard 🎉
      </h1>

      {/* Cards */}
      <div style={styles.cardsWrapper}>
        
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p style={styles.number}>10</p>
        </div>

        <div style={styles.card}>
          <h3>Total Animals</h3>
          <p style={styles.number}>25</p>
        </div>

      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>

    </div>
  );
}

export default Dashboard;

/* 🔥 ALL STYLES INCLUDED */
const styles = {
  container: {
    textAlign: "center",
    color: "#fff",
    background: "linear-gradient(to right, #020617, #0f172a)",
    minHeight: "100vh",   // ✅ no gap fix
    padding: "40px 20px"
  },

  heading: {
    fontSize: "36px",
    marginBottom: "40px",
    fontWeight: "600"
  },

  cardsWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    padding: "25px",
    width: "220px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    transition: "0.3s"
  },

  number: {
    fontSize: "28px",
    marginTop: "10px",
    color: "#38bdf8"
  },

  logout: {
    marginTop: "40px",
    padding: "12px 25px",
    background: "linear-gradient(45deg, red, orange)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px"
  }
};