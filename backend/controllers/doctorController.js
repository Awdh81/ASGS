const Doctor = require("../models/doctorModel");
const UserActivity = require("../models/UserActivity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const Animal = require("../models/Animal");
const Checkup = require("../models/Checkup");

// ================= 📩 MAIL FUNCTION =================
const sendOTP = async (email, otp) => {
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
    subject: "Doctor OTP",
    text: `Your OTP is: ${otp}`
  });
};

// ================= REGISTER =================
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    let doctor = await Doctor.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (doctor) {
      if (doctor.isVerified) {
        return res.status(400).json({ msg: "Doctor already exists" });
      }

      doctor.otp = otp;
      doctor.otpExpiry = Date.now() + 5 * 60 * 1000;

      await doctor.save();
      await sendOTP(email, otp);

      return res.json({ msg: "OTP resent" });
    }

    const hash = await bcrypt.hash(password, 10);

    doctor = await Doctor.create({
      name,
      email,
      password: hash,
      specialization,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000
    });

    await sendOTP(email, otp);

    res.json({ msg: "Registered, OTP sent" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= VERIFY OTP =================
exports.verifyDoctor = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) return res.status(400).json({ msg: "Not found" });

    if (doctor.otp !== otp) {
      return res.status(400).json({ msg: "Wrong OTP" });
    }

    if (doctor.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    doctor.isVerified = true;
    doctor.otp = null;
    doctor.otpExpiry = null;

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    doctor.token = token;

    await doctor.save();

    res.json({ msg: "Verified", token });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= LOGIN =================
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) return res.status(400).json({ msg: "Not found" });

    if (!doctor.isVerified) {
      return res.status(400).json({ msg: "Verify first" });
    }

    const match = await bcrypt.compare(password, doctor.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    doctor.token = token;
    await doctor.save();

    res.json({ msg: "Login success", token });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};





// 🐾 Animal
exports.addAnimal = async (req, res) => {
  const animal = new Animal(req.body);
  await animal.save();
  res.json({ message: "Animal Added" });
};

// 🩺 Checkup
exports.addCheckup = async (req, res) => {
  const checkup = new Checkup(req.body);
  await checkup.save();
  res.json({ message: "Checkup Added" });
};









// ================= LOGOUT =================
exports.logoutDoctor = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ msg: "No token provided ❌" });
    }

    const doctor = await Doctor.findOne({ token });

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found ❌" });
    }

    doctor.token = null;
    await doctor.save();

    res.json({ msg: "Logout successful ✅" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotDoctorPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ msg: "Doctor not found ❌" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    doctor.resetToken = token;
    doctor.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await doctor.save();

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
        <p>Your token:</p>
        <h1>${token}</h1>
      `
    });

    res.json({ msg: "Reset token sent 📩" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= RESET PASSWORD =================
exports.resetDoctorPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const doctor = await Doctor.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!doctor) {
      return res.status(400).json({ msg: "Invalid or expired token ❌" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    doctor.password = hashedPassword;
    doctor.resetToken = null;
    doctor.resetTokenExpiry = null;

    await doctor.save();

    res.json({ msg: "Password reset successful ✅" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};