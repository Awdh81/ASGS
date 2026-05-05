const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    isVerified: { type: Boolean, default: false },
    isLogout: { type: Boolean, default: false },

    token: { type: String, default: null },

    // 🔐 OTP
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    // 🔥 OTP LIMIT SYSTEM
    otpAttempts: {
      type: Number,
      default: 0
    },
    otpBlockTime: {
      type: Date,
      default: null
    },

    // 🔐 RESET PASSWORD
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null }
  },
  { timestamps: true } // ✅ yaha close kiya
);

module.exports = mongoose.model("User", userSchema);