const express = require("express");
const router = express.Router();

// 🔥 Controllers
const {
  registerPublic,
  verifyPublic,
  loginPublic,
  logoutPublic,
  forgotPublicPassword,
  resetPublicPassword,
  sellAnimal,
  getMarketAnimals,
  buyAnimal
} = require("../controllers/publicController");

// 📸 Upload Middleware (Cloudinary)
const upload = require("../middleware/upload");


// ================= 🔐 AUTH =================
router.post("/register", registerPublic);
router.post("/verify", verifyPublic);
router.post("/login", loginPublic);
router.post("/logout", logoutPublic);


// ================= 🔑 PASSWORD =================
router.post("/forgot-password", forgotPublicPassword);
router.post("/reset-password", resetPublicPassword);


// ================= 🛒 MARKET =================

// 🐾 Sell Animal (Cloudinary Image Upload)
router.post(
  "/sell",
 upload.single("image"),  // 🔥 ye Cloudinary ko trigger karega
  sellAnimal
);

// 🛍️ Get all animals
router.get("/market", getMarketAnimals);

// 💰 Buy animal
router.put("/buy/:id", buyAnimal);


module.exports = router;