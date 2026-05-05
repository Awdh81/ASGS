const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number,
  ownerName: String,
  ownerPhone: String,
});

module.exports = mongoose.model("Animal", animalSchema);