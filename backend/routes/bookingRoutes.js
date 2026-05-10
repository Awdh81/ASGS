const express = require("express");
const router = express.Router();

const Booking = require("../models/BookingModel");

const nodemailer = require("nodemailer");


// CREATE BOOKING
router.post("/create", async (req, res) => {

  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      message: "Booking Created Successfully",
    });

  } catch (error) {

    res.json({
      message: error.message,
    });

  }

});


// GET BOOKINGS
router.get("/all", async (req, res) => {

  try {

    const data = await Booking.find();

    res.json(data);

  } catch (error) {

    res.json({
      message: error.message,
    });

  }

});


// CONFIRM BOOKING + SEND EMAIL
router.put("/confirm/:id", async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    // STATUS UPDATE
    booking.status = "Confirmed";

    await booking.save();

    // EMAIL TRANSPORTER
    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

    });

    // SEND EMAIL
    await transporter.sendMail({

      from: process.env.MAIL_USER,

      to: booking.email,

      subject: "ASGS Doctor Booking Confirmed",

      html: `
        <h2>Animal Doctor Appointment Confirmed 🐄👨‍⚕️</h2>

        <p>Hello ${booking.ownerName}</p>

        <p>Your booking has been confirmed successfully.</p>

        <p><b>Animal:</b> ${booking.animalType}</p>

        <p><b>Problem:</b> ${booking.problem}</p>

        <p>Thank You for using ASGS ❤️</p>
      `,

    });

    res.json({
      message: "Booking Confirmed & Email Sent",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});


// REJECT BOOKING + SEND EMAIL
router.put("/reject/:id", async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Rejected";

    await booking.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: booking.email,
      subject: "ASGS Doctor Booking Rejected",
      html: `
        <h2>Animal Doctor Appointment Rejected 💔</h2>

        <p>Hello ${booking.ownerName},</p>

        <p>We are sorry to inform you that your appointment request has been rejected by the doctor.</p>

        <p><b>Animal:</b> ${booking.animalType}</p>
        <p><b>Problem:</b> ${booking.problem}</p>

        <p>If you want, please try booking again or contact support for more details.</p>

        <p>Thank You for using ASGS ❤️</p>
      `,
    });

    res.json({
      message: "Booking Rejected & Email Sent",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;