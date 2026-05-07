const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const Booking = require("../models/BookingModel");
const Doctor = require("../models/doctorModel");
const Public = require("../models/publicModel");
const Market = require("../models/Market");
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 Check if user is admin (middleware)
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only! ❌" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= 📊 DASHBOARD STATS =================
router.get("/dashboard-stats", authMiddleware, isAdmin, async (req, res) => {
  try {
    // Total Users (Admin + Public)
    const totalAdmins = await User.countDocuments();
    const totalPublicUsers = await Public.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    
    // Total Appointments
    const totalAppointments = await Booking.countDocuments();
    const pendingAppointments = await Booking.countDocuments({ status: "Pending" });
    const confirmedAppointments = await Booking.countDocuments({ status: "Confirmed" });
    const rejectedAppointments = await Booking.countDocuments({ status: "Rejected" });
    
    // Marketplace Stats
    const totalListings = await Market.countDocuments();
    const soldItems = await Market.countDocuments({ status: "sold" });
    const availableItems = await Market.countDocuments({ status: "available" });
    
    // Calculate total revenue
    const marketItems = await Market.find({ status: "sold" });
    const totalRevenue = marketItems.reduce((sum, item) => sum + (item.price || 0), 0);
    
    // Recent Activity (Last 10 appointments)
    const recentAppointments = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get all users with their roles
    const adminUsers = await User.find().select("-password");
    const publicUsers = await Public.find().select("-password");
    const doctorUsers = await Doctor.find().select("-password");
    
    res.json({
      success: true,
      data: {
        users: {
          total: totalAdmins + totalPublicUsers + totalDoctors,
          admins: totalAdmins,
          publicUsers: totalPublicUsers,
          doctors: totalDoctors
        },
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          confirmed: confirmedAppointments,
          rejected: rejectedAppointments
        },
        marketplace: {
          totalListings: totalListings,
          soldItems: soldItems,
          availableItems: availableItems,
          totalRevenue: totalRevenue
        },
        recentAppointments: recentAppointments,
        allUsers: {
          admins: adminUsers,
          public: publicUsers,
          doctors: doctorUsers
        }
      }
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// ================= 👥 GET ALL USERS =================
router.get("/users", authMiddleware, isAdmin, async (req, res) => {
  try {
    const admins = await User.find().select("-password");
    const publicUsers = await Public.find().select("-password");
    const doctors = await Doctor.find().select("-password");
    
    // Combine all users with role info
    const allUsers = [
      ...admins.map(u => ({ ...u.toObject(), role: "admin" })),
      ...publicUsers.map(u => ({ ...u.toObject(), role: "public" })),
      ...doctors.map(u => ({ ...u.toObject(), role: "doctor" }))
    ];
    
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 📅 GET ALL APPOINTMENTS =================
router.get("/appointments/all", authMiddleware, isAdmin, async (req, res) => {
  try {
    const appointments = await Booking.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 🛒 GET MARKETPLACE LISTINGS =================
router.get("/marketplace", authMiddleware, isAdmin, async (req, res) => {
  try {
    const listings = await Market.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 🐕 GET ANIMALS (from publicController) =================
router.get("/animals", authMiddleware, isAdmin, async (req, res) => {
  try {
    const animals = await Market.find().select("title price description image status createdAt");
    res.json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 📋 GET ACTIVITY LOGS =================
router.get("/activity-logs", authMiddleware, isAdmin, async (req, res) => {
  try {
    // Get recent bookings as activity
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(50);
    
    const activities = recentBookings.map(booking => ({
      id: booking._id,
      userEmail: booking.email,
      userName: booking.ownerName,
      action: `appointment_${booking.status?.toLowerCase() || "created"}`,
      details: { animal: booking.animalType, date: booking.preferredDate },
      timestamp: booking.createdAt,
      ipAddress: "N/A"
    }));
    
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 🗑️ DELETE USER =================
router.delete("/user/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // admin, public, doctor
    
    let deleted = false;
    
    if (type === "admin") {
      deleted = await User.findByIdAndDelete(id);
    } else if (type === "public") {
      deleted = await Public.findByIdAndDelete(id);
    } else if (type === "doctor") {
      deleted = await Doctor.findByIdAndDelete(id);
    }
    
    if (!deleted) {
      return res.status(404).json({ message: "User not found ❌" });
    }
    
    res.json({ message: "User deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 📊 DOCTOR-WISE APPOINTMENTS =================
router.get("/doctor-appointments", authMiddleware, isAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find().select("name email specialization");
    const doctorStats = [];
    
    for (const doctor of doctors) {
      // You need to add doctorId in Booking model for this
      // For now, return empty stats
      doctorStats.push({
        doctor: doctor,
        appointments: [],
        totalConfirmed: 0,
        totalRejected: 0
      });
    }
    
    res.json(doctorStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= 📈 GET USER REGISTRATION TREND =================
router.get("/user-trend", authMiddleware, isAdmin, async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    
    const adminRegistrations = await User.find({
      createdAt: { $gte: last7Days }
    });
    
    const publicRegistrations = await Public.find({
      createdAt: { $gte: last7Days }
    });
    
    const doctorRegistrations = await Doctor.find({
      createdAt: { $gte: last7Days }
    });
    
    res.json({
      last7Days: {
        admins: adminRegistrations.length,
        public: publicRegistrations.length,
        doctors: doctorRegistrations.length,
        total: adminRegistrations.length + publicRegistrations.length + doctorRegistrations.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;