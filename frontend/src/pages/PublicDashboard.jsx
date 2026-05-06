import { useNavigate } from "react-router-dom";

function PublicDashboard() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔒 Check Login
  if (!token) {
    window.location.href = "/public-login";
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >

      {/* TITLE */}
      <h1>Welcome Public User 🎉</h1>

      {/* BUTTONS */}
      <div style={{ marginTop: "30px" }}>

        {/* BUY */}
        <button
          style={{
            margin: "10px",
            padding: "15px 25px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/buy")}
        >
          🛒 Buy Animals
        </button>

        {/* SELL */}
        <button
          style={{
            margin: "10px",
            padding: "15px 25px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/sell")}
        >
          💰 Sell Animals
        </button>

        {/* DOCTOR BOOKING */}
        <button
          style={{
            margin: "10px",
            padding: "15px 25px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/animal-doctor-booking")}
        >
          👨‍⚕️ Doctor Booking
        </button>

        {/* TRACKING */}
        <button
          style={{
            margin: "10px",
            padding: "15px 25px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/tracking")}
        >
          📍 Animal Tracking
        </button>

      </div>

      {/* LOGOUT */}
      <div style={{ marginTop: "40px" }}>

        <button
          style={{
            padding: "12px 25px",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/public-login");
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default PublicDashboard;