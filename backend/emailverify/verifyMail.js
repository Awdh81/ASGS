const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// ================= 📩 TRANSPORTER =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


// ================= 📩 SEND OTP =================
const sendOTP = async (otp, email) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP Verification 🔐",
      html: `
      <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="max-width:500px; margin:auto; background:#fff; padding:25px; border-radius:10px; text-align:center;">
          
          <h2>🔐 OTP Verification</h2>
          <p>Aapka verification ke liye OTP niche diya gaya hai:</p>

          <div style="padding:15px; background:#f1f1f1; border-radius:8px;">
            <h1 style="color:#007bff;">${otp}</h1>
          </div>

          <p style="color:#777;">Ye OTP 5 minute me expire ho jayega</p>
        </div>
      </div>
      `
    });

    console.log("OTP sent ✅");
  } catch (err) {
    console.error("OTP Mail error ❌", err);
  }
};


// ================= 📩 SEND TOKEN =================
const sendTokenMail = async (token, email) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verified ✅",
      html: `
      <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="max-width:500px; margin:auto; background:#fff; padding:25px; border-radius:10px; text-align:center;">
          
          <h2>🎉 Email Verified</h2>
          <p>Aapka login token niche diya gaya hai:</p>

          <div style="padding:15px; background:#f1f1f1; border-radius:8px;">
            <h3 style="color:#28a745;">${token}</h3>
          </div>

          <p style="color:#777;">Is token ka use authentication ke liye kare</p>
        </div>
      </div>
      `
    });

    console.log("Token Email sent ✅");
  } catch (err) {
    console.error("Token Mail error ❌", err);
  }
};


// ================= 🔥 REGISTER =================
const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    email = email.toLowerCase();

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false
    });

    await user.save();

    await sendOTP(otp, email);

    res.status(201).json({
      message: "User registered. OTP sent 📩"
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= 🔥 VERIFY OTP =================
const verifyOTP = async (req, res) => {
  try {
    let { email, otp } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found ❌" });

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired ❌" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP ❌" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;

    await user.save();

    // ✅ EMAIL TOKEN
    await sendTokenMail(token, email);

    res.status(200).json({
      message: "Email verified successfully ✅",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= 🔥 LOGIN =================
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found ❌" });

    if (!user.isVerified) {
      return res.status(400).json({ message: "Verify email first ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Login successful ✅",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= EXPORT =================
module.exports = { registerUser, verifyOTP, loginUser };