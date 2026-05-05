function DoctorDashboard() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/doctor-login";
  }

  return (
    <div>
      <h1>Welcome Doctor 👨‍⚕️</h1>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/doctor-login";
      }}>
        Logout
      </button>
    </div>
  );
}

export default DoctorDashboard;