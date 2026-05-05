const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/asgs`);
    console.log("😊.........ASGS DB connected..........😊");
  } catch (error) {
    console.log("🥺ASGS DB connection failed 🥺", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;