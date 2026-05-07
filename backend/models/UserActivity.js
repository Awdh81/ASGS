const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: String,
  userName: String,
  userRole: String,
  action: {
    type: String,
    enum: ['login', 'logout', 'appointment_created', 'appointment_confirmed', 'appointment_rejected', 'animal_listed', 'animal_sold', 'animal_bought'],
    required: true
  },
  details: {
    type: Object,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String
});

module.exports = mongoose.model('UserActivity', userActivitySchema);