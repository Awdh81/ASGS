import React, { useState } from "react";
import { verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleVerify = async () => {
    try {
      const res = await verifyOTP({ email, otp });

      // ✅ token save
      localStorage.setItem("token", res.data.token);

      alert("Login Success ✅");

      navigate("/dashboard");

    } catch (err) {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>

      <input onChange={(e) => setOtp(e.target.value)} />

      <button onClick={handleVerify}>Verify OTP</button>
    </div>
  );
}

export default VerifyOTP;