const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  // ✅ verification
  isVerified: {
    type: Boolean,
    default: false
  },

  // 🔢 OTP
  otp: String,
  otpExpiry: Date,

  // 🔐 JWT token
  token: String,

  // 🔑 RESET PASSWORD
  resetToken: String,
  resetTokenExpiry: Date

}, {
  timestamps: true
});

module.exports = mongoose.model("Doctor", doctorSchema);