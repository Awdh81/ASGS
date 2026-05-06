const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(

  {

    // OWNER DETAILS
    ownerName: String,
    email: String,
    phone: String,
    address: String,

    // ANIMAL DETAILS
    animalType: String,
    animalBreed: String,
    animalAge: String,
    animalGender: String,

    // HEALTH DETAILS
    problem: String,
    symptoms: String,
    emergency: String,

    // APPOINTMENT
    preferredDate: String,
    preferredTime: String,

    // STATUS
    status: {
      type: String,
      default: "Pending",
    },

  },

  {
    timestamps: true,
  }

);

module.exports = mongoose.model("Booking", bookingSchema);