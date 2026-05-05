const express = require("express");

const router = express.Router();

// 🔐 Middleware
const authMiddleware = require("../middleware/authMiddleware");

// 👤 Controllers
const { registerUser, verifyOTP, loginUser, logoutUser, forgotPassword, resetPassword,} = require("../controllers/userControllers");


// ================= AUTH ROUTES =================


router.post("/register", registerUser);


router.post("/verify", verifyOTP);


router.post("/login", loginUser);


router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);





// 🔐 Profile (login required)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data ✅",
    user: req.user
  });
});


module.exports = router;