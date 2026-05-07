const express = require("express");
const connectDB = require("./database/db");

const publicRoutes = require("./routes/publicRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8000;


// ================= MIDDLEWARE =================

// ✅ CORS
app.use(cors());

// ✅ BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ COOKIE
app.use(cookieParser());

// ✅ STATIC FOLDER
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoutes);


// ================= DATABASE =================

connectDB();


// ================= ROUTES =================

// ✅ PUBLIC ROUTES
app.use("/api/public", publicRoutes);

// ✅ DOCTOR ROUTES
app.use("/api/doctor", doctorRoutes);

// ✅ USER ROUTES
app.use("/api", userRoutes);

// ✅ ANIMAL BOOKING ROUTES
app.use("/api/bookings", bookingRoutes);


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("ASGS Server Running 🚀");
});



// ================= SERVER =================

app.listen(PORT, () => {
  console.log(`🌐 ASGS Server running on PORT ${PORT} 🚀`);
});

