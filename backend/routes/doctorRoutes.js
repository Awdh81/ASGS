const express = require("express");
const router = express.Router();



// 🔥 Import ALL controllers
const {
  registerDoctor,
  verifyDoctor,
  loginDoctor,
  logoutDoctor,
  forgotDoctorPassword,
  addAnimal,
  addCheckup,
  resetDoctorPassword
} = require("../controllers/doctorController");

// 🔥 Middleware
const trackActivity = require("../middleware/trackActivity");

// ================= AUTH =================
router.post("/register", registerDoctor);
router.post("/verify", verifyDoctor);
router.post("/login", trackActivity("login"), loginDoctor);
router.post("/logout", trackActivity("logout"), logoutDoctor);
router.post("/animal", addAnimal);
router.post("/checkup", addCheckup);

// ================= PASSWORD =================
router.post("/forgot-password", forgotDoctorPassword);
router.post("/reset-password", resetDoctorPassword);

module.exports = router;