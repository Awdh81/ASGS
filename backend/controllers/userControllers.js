const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

// ================= 📩 MAIL FUNCTION =================
const sendOTP = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
      `
    });

    console.log("OTP sent ✅");
  } catch (err) {
    console.error("Mail error ❌", err);
    throw err;
  }
};

// ================= 🔥 REGISTER =================
const registerUser = async (req, res) => {
  try {
    let { username, email, password, role } = req.body;

    email = email.toLowerCase();

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });

    // 🔥 Agar user exist hai
    if (user) {

      // ❌ agar already verified hai
      if (user.isVerified) {
        return res.status(400).json({ message: "User already exists" });
      }

      // ⛔ Block check
      if (user.otpBlockTime && user.otpBlockTime > Date.now()) {
        return res.status(400).json({
          message: "Try again after some time ⏱"
        });
      }

      // 🔢 Attempt count
      if (user.otpAttempts >= 3) {
        user.otpBlockTime = Date.now() + 10 * 60 * 1000; // 10 min block
        user.otpAttempts = 0;
        await user.save();

        return res.status(400).json({
          message: "Too many attempts ❌ Try after 10 minutes"
        });
      }

      // 🔁 resend OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
      user.otpAttempts += 1;

      await user.save();
      await sendOTP(otp, email);

      return res.json({
        message: `OTP resent (${user.otpAttempts}/3) 📩`
      });
    }

    // 🆕 NEW USER
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "admin", // ✅ Default role is admin
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
      otpAttempts: 1
    });

    await user.save();
    await sendOTP(otp, email);

    res.status(201).json({
      message: "User registered. OTP sent 📩"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= 🔥 VERIFY OTP =================
const verifyOTP = async (req, res) => {
  try {
    let { email, otp } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // ✅ verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    user.otpAttempts = 0;
    user.otpBlockTime = null;

    // ✅ TOKEN GENERATE with role
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "admin" }, // ✅ Added role
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Email verified successfully ✅",
      token: token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role || "admin"
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= 🔥 LOGIN =================
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify email first ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    // ✅ Generate token with role
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.role || "admin"  // ✅ Role added here
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful ✅",
        token: token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role || "admin"
        }
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= 🔥 LOGOUT =================
const logoutUser = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided ❌" });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    user.token = null;
    await user.save();

    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Logout successful ✅"
    });

  } catch (error) {
    console.log("🔥 LOGOUT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= 🔥 FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `
        <h2>Reset Password 🔐</h2>
        <p>Use this token:</p>
        <h1>${token}</h1>
      `
    });

    res.json({ message: "Reset token sent 📩" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= 🔥 RESET PASSWORD =================
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.json({ message: "Invalid or expired token ❌" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful ✅" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ================= 📊 GET CURRENT USER (Optional) =================
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password -otp -resetToken");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= EXPORT =================
module.exports = { 
  registerUser, 
  verifyOTP, 
  loginUser, 
  logoutUser,
  forgotPassword, 
  resetPassword,
  getCurrentUser  // ✅ Added
};