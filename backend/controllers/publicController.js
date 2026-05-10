const Public = require("../models/publicModel");
const UserActivity = require("../models/UserActivity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Market = require("../models/Market"); // ✅ ONLY ONE TIME

// ================= 📩 OTP MAIL =================
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
    subject: "Public OTP",
    text: `OTP: ${otp}`
  });
};

// ================= REGISTER =================
exports.registerPublic = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await Public.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ msg: "Already exists" });
      }

      user.otp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;

      await user.save({ validateBeforeSave: false });
      await sendOTP(email, otp);

      return res.json({ msg: "OTP resent" });
    }

    const hash = await bcrypt.hash(password, 10);

    user = await Public.create({
      username,
      email,
      password: hash,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000
    });

    await sendOTP(email, otp);

    res.json({ msg: "Registered, OTP sent" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= VERIFY =================
exports.verifyPublic = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await Public.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Wrong OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    user.token = token;
    await user.save({ validateBeforeSave: false });

    res.json({ msg: "Verified", token });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= LOGIN =================
exports.loginPublic = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Public.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Not found" });

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Verify first" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    user.token = token;
    await user.save({ validateBeforeSave: false });

    res.json({ msg: "Login success", token });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= LOGOUT =================
exports.logoutPublic = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(400).json({ msg: "No token ❌" });

    const user = await Public.findOne({ token });

    if (!user) return res.status(400).json({ msg: "User not found ❌" });

    user.token = null;
    await user.save({ validateBeforeSave: false });

    res.json({ msg: "Logout successful ✅" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPublicPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Public.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found ❌" });

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    res.json({ msg: "Reset token sent 📩", token });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= RESET PASSWORD =================
exports.resetPublicPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await Public.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ msg: "Invalid token ❌" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save({ validateBeforeSave: false });

    res.json({ msg: "Password reset successful ✅" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= 🛒 SELL ANIMAL =================
// ================= 🛒 SELL ANIMAL =================
exports.sellAnimal = async (req, res) => {
  try {
    console.log("FILE DATA 👉", req.file);
    console.log("BODY DATA 👉", req.body);

    // ❌ agar file nahi aayi
    if (!req.file) {
      return res.status(400).json({ msg: "Image not uploaded ❌" });
    }

    // ❌ agar Cloudinary URL nahi mila
    if (!req.file.path) {
      return res.status(400).json({ msg: "Cloudinary upload failed ❌" });
    }

    const market = new Market({
      title: req.body.title,
      type: req.body.type,
      age: Number(req.body.age) || undefined,
      price: Number(req.body.price) || undefined,
      description: req.body.description,
      animalId: req.body.animalId,
      sellerName: req.body.sellerName,
      sellerEmail: req.body.sellerEmail,
      sellerPhone: req.body.sellerPhone,
      sellerAddress: req.body.sellerAddress,
      image: req.file.path   // ✅ Cloudinary URL
    });

    await market.save();

    res.status(200).json({
      message: "Animal listed for sale 🐾",
      data: market
    });

  } catch (error) {
    console.log("ERROR 👉", error);
    res.status(500).json({
      error: error.message || "Something went wrong ❌"
    });
  }
};


// ================= 🛍️ GET MARKET =================
exports.getMarketAnimals = async (req, res) => {
  try {
    const data = await Market.find().populate("animalId");

    res.status(200).json({
      count: data.length,
      data: data
    });

  } catch (error) {
    console.log("ERROR 👉", error);
    res.status(500).json({
      error: error.message || "Fetch failed ❌"
    });
  }
};

// ================= 💰 BUY =================
exports.buyAnimal = async (req, res) => {
  try {
    const { id } = req.params;

    await Market.findByIdAndUpdate(id, { status: "sold" });

    res.json({ message: "Animal purchased ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};