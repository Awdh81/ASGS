import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(form); // 🔍 debug

      await axios.post(
        "http://localhost:8000/api/doctor/register",
        form
      );

      alert("OTP sent 📩");
      navigate("/doctor-verify");

    } catch (err) {
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Doctor Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <input
        name="specialization"
        placeholder="Specialization"
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default DoctorRegister;