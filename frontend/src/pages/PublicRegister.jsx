import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PublicRegister() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/public/register", form);
      alert("OTP sent 📩");
      navigate("/public-verify");
    } catch (err) {
      alert(err.response?.data?.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Public Register</h2>

      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />

      <button>Register</button>
    </form>
  );
}

export default PublicRegister;