import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function PublicDashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const token = localStorage.getItem("token");

  // 🔒 Check Login
  useEffect(() => {
    if (!token) {
      window.location.href = "/public-login";
    }
    
    // Get user email from localStorage if stored during login
    const email = localStorage.getItem("userEmail") || "Public User";
    setUserEmail(email);
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/public-login");
  };

  return (
    <div style={styles.container}>
      {/* Background Decoration */}
      <div style={styles.bgDecoration}></div>
      
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🐾</span>
          <span style={styles.logoText}>AnimalCare</span>
        </div>
        <div style={styles.userInfo}>
          <span style={styles.userIcon}>👤</span>
          <span style={styles.userName}>{userEmail}</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Welcome Card */}
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeIcon}>🎉</div>
          <h1 style={styles.welcomeTitle}>
            Welcome back, <span style={styles.userHighlight}>{userEmail}</span>
          </h1>
          <p style={styles.welcomeSubtitle}>
            Manage your animals, book doctors, and track your livestock
          </p>
          <div style={styles.timeBadge}>
            <span>🕐</span>
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>🐮</span>
            <span style={styles.statValue}>12</span>
            <span style={styles.statLabel}>Total Animals</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>👨‍⚕️</span>
            <span style={styles.statValue}>3</span>
            <span style={styles.statLabel}>Active Bookings</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>💰</span>
            <span style={styles.statValue}>₹45K</span>
            <span style={styles.statLabel}>Total Earnings</span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div style={styles.buttonsGrid}>
          {/* Buy Button */}
          <button
            style={{ ...styles.actionBtn, ...styles.buyBtn }}
            onClick={() => navigate("/buy")}
          >
            <span style={styles.btnIcon}>🛒</span>
            <span style={styles.btnText}>Buy Animals</span>
            <span style={styles.btnDesc}>Purchase new livestock</span>
          </button>

          {/* Sell Button */}
          <button
            style={{ ...styles.actionBtn, ...styles.sellBtn }}
            onClick={() => navigate("/sell")}
          >
            <span style={styles.btnIcon}>💰</span>
            <span style={styles.btnText}>Sell Animals</span>
            <span style={styles.btnDesc}>List your animals for sale</span>
          </button>

          {/* Doctor Booking Button */}
          <button
            style={{ ...styles.actionBtn, ...styles.doctorBtn }}
            onClick={() => navigate("/animal-doctor-booking")}
          >
            <span style={styles.btnIcon}>👨‍⚕️</span>
            <span style={styles.btnText}>Doctor Booking</span>
            <span style={styles.btnDesc}>Consult with veterinarians</span>
          </button>

          {/* Tracking Button */}
          <button
            style={{ ...styles.actionBtn, ...styles.trackingBtn }}
            onClick={() => navigate("/tracking")}
          >
            <span style={styles.btnIcon}>📍</span>
            <span style={styles.btnText}>Animal Tracking</span>
            <span style={styles.btnDesc}>Track your animals in real-time</span>
          </button>
        </div>

        {/* Recent Activity */}
        <div style={styles.activityCard}>
          <h3 style={styles.activityTitle}>Recent Activity</h3>
          <div style={styles.activityList}>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>✅</span>
              <span>You logged in successfully</span>
              <span style={styles.activityTime}>Just now</span>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>🩺</span>
              <span>Health checkup reminder</span>
              <span style={styles.activityTime}>2 hours ago</span>
            </div>
            <div style={styles.activityItem}>
              <span style={styles.activityIcon}>💰</span>
              <span>New sell request pending</span>
              <span style={styles.activityTime}>Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicDashboard;

/* 🔥 PREMIUM & CASUAL STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    position: "relative",
    overflowX: "hidden"
  },

  bgDecoration: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "radial-gradient(circle at 20% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)",
    pointerEvents: "none"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(15,23,42,0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "20px",
    fontWeight: "600"
  },

  logoIcon: {
    fontSize: "28px"
  },

  logoText: {
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  userIcon: {
    fontSize: "20px"
  },

  userName: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500"
  },

  logoutBtn: {
    padding: "8px 18px",
    background: "rgba(239,68,68,0.2)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s ease"
  },

  content: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },

  welcomeCard: {
    background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
    borderRadius: "24px",
    padding: "30px",
    marginBottom: "30px",
    border: "1px solid rgba(139,92,246,0.2)",
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  },

  welcomeIcon: {
    fontSize: "48px",
    marginBottom: "15px"
  },

  welcomeTitle: {
    color: "#fff",
    fontSize: "28px",
    marginBottom: "10px",
    fontWeight: "600"
  },

  userHighlight: {
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },

  welcomeSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "14px",
    marginBottom: "15px"
  },

  timeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px 12px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#fff"
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },

  statCard: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "transform 0.2s ease"
  },

  statIcon: {
    fontSize: "32px",
    display: "block",
    marginBottom: "10px"
  },

  statValue: {
    display: "block",
    fontSize: "24px",
    fontWeight: "700",
    color: "#8b5cf6",
    marginBottom: "5px"
  },

  statLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "12px"
  },

  buttonsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px"
  },

  actionBtn: {
    padding: "25px 20px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    overflow: "hidden"
  },

  buyBtn: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    boxShadow: "0 10px 25px -5px rgba(16,185,129,0.3)"
  },

  sellBtn: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    boxShadow: "0 10px 25px -5px rgba(245,158,11,0.3)"
  },

  doctorBtn: {
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    boxShadow: "0 10px 25px -5px rgba(59,130,246,0.3)"
  },

  trackingBtn: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    boxShadow: "0 10px 25px -5px rgba(239,68,68,0.3)"
  },

  btnIcon: {
    fontSize: "36px"
  },

  btnText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff"
  },

  btnDesc: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.8)"
  },

  activityCard: {
    background: "rgba(255,255,255,0.03)",
    borderRadius: "20px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,0.05)"
  },

  activityTitle: {
    color: "#fff",
    fontSize: "18px",
    marginBottom: "20px",
    fontWeight: "600"
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    color: "rgba(255,255,255,0.8)",
    fontSize: "13px"
  },

  activityIcon: {
    fontSize: "18px"
  },

  activityTime: {
    marginLeft: "auto",
    fontSize: "11px",
    color: "rgba(255,255,255,0.4)"
  }
};

// Add hover effects
const injectStyles = () => {
  if (typeof document !== "undefined" && !document.getElementById("dashboard-styles")) {
    const style = document.createElement("style");
    style.id = "dashboard-styles";
    style.textContent = `
      button:hover:not(:disabled) {
        transform: translateY(-3px) !important;
        filter: brightness(1.05) !important;
      }
      
      .stat-card:hover {
        transform: translateY(-5px);
        background: rgba(255,255,255,0.05);
      }
      
      .logout-btn:hover {
        background: rgba(239,68,68,0.3) !important;
        border-color: rgba(239,68,68,0.5) !important;
      }
      
      @media (max-width: 768px) {
        .buttons-grid {
          grid-template-columns: 1fr;
        }
        .stats-container {
          grid-template-columns: 1fr;
        }
        .navbar {
          padding: 12px 20px;
          flex-direction: column;
          gap: 10px;
        }
        .content {
          padding: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

injectStyles();