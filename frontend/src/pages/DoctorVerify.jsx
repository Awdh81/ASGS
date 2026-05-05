import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorVerify() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8000/api/doctor/verify",
      form
    );

    localStorage.setItem("token", res.data.token);

    alert("Verified ✅");
    navigate("/doctor-dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>

      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
      <input placeholder="OTP" onChange={(e)=>setForm({...form,otp:e.target.value})} />

      <button>Verify</button>
    </form>
  );
}

export default DoctorVerify;