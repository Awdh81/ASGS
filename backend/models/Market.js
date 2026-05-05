const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },

  title: String,
  price: Number,
  description: String,

  image: String, // image path

  sellerName: String,
  sellerPhone: String,

  status: {
    type: String,
    default: "available" // sold / available
  }

}, { timestamps: true });

module.exports = mongoose.model("Market", marketSchema);