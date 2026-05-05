const express = require("express");
const connectDB = require("./database/db");
const publicRoutes = require("./routes/publicRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;


// ================= MIDDLEWARE =================

// ✅ CORS
app.use(cors());

// ✅ JSON PARSER (🔥 SABSE IMPORTANT - YAHI FIX HAI)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ COOKIE
app.use(cookieParser());

// ✅ STATIC (image access)
app.use("/uploads", express.static("uploads"));


// ================= ROUTES =================

// 🔥 multer wala route PEHLE
app.use("/api/public", publicRoutes);

// baaki routes
app.use("/api/doctor", doctorRoutes);
app.use("/api", userRoutes);


// ================= DB =================

connectDB();


// ================= TEST =================

app.get("/", (req, res) => {
  res.send("Server chal raha hai 🚀");
});


// ================= SERVER =================

app.listen(PORT, () => {
  console.log(`🌐.. Awdh Server running SIR on ${PORT}. 🚀`);
});