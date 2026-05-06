const Booking = require("../models/BookingModel");
const nodemailer = require("nodemailer");

exports.createBooking = async (req, res) => {
  try {

    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      message: "Booking Request Sent",
    });

  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

exports.getBookings = async (req, res) => {

  const data = await Booking.find();

  res.json(data);
};

exports.confirmBooking = async (req, res) => {

  const booking = await Booking.findById(req.params.id);

  booking.status = "Confirmed";

  await booking.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "your-app-password",
    },
  });

  await transporter.sendMail({
    from: "yourgmail@gmail.com",
    to: booking.email,
    subject: "Doctor Confirmation",
    text: "Your Appointment Confirmed",
  });

  res.json({
    message: "Confirmed",
  });
};