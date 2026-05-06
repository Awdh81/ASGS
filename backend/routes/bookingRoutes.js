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

    res.json({
      message: error.message,
    });

  }

});

module.exports = router;