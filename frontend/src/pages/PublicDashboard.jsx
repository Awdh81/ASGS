function PublicDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/public-login";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome Public User 🎉</h1>

      {/* 🔘 Feature Buttons */}
      <div style={{ marginTop: "30px" }}>
        
        {/* 🛒 BUY */}
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => (window.location.href = "/buy")}
        >
          🛒 Buy Animals
        </button>

        {/* 💰 SELL */}
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => (window.location.href = "/sell")}
        >
          💰 Sell Animals
        </button>

        {/* 👨‍⚕️ DOCTOR */}
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => (window.location.href = "/doctor-booking")}
        >
          👨‍⚕️ Doctor Booking
        </button>

        {/* 📍 TRACKING */}
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => (window.location.href = "/tracking")}
        >
          📍 Animal Tracking
        </button>

      </div>

      {/* 🚪 Logout */}
      <div style={{ marginTop: "40px" }}>
        <button
          style={{ padding: "10px 20px", background: "red", color: "white" }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/public-login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default PublicDashboard;