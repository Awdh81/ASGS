const mongoose = require("mongoose");

const checkupSchema = new mongoose.Schema({
  animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
  symptoms: String,
  diagnosis: String,
});

module.exports = mongoose.model("Checkup", checkupSchema);