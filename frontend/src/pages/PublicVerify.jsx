import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PublicVerify() {
  const [form, setForm] = useState({
    email: "",
    otp: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/public/verify",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Verified ✅");
      navigate("/public-dashboard");

    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="otp" placeholder="OTP" onChange={handleChange} />

      <button>Verify</button>
    </form>
  );
}

export default PublicVerify;