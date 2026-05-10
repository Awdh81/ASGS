const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },

  title: String,
  type: String,
  age: Number,
  price: Number,
  description: String,

  image: String, // image path

  sellerName: String,
  sellerEmail: String,
  sellerPhone: String,
  sellerAddress: String,

  status: {
    type: String,
    default: "available" // sold / available
  }

}, { timestamps: true });

module.exports = mongoose.model("Market", marketSchema);