const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: String,
  profileImage: {
    type: String,
    default: ''  // Will store Base64 encoded image data
  },
  joiningDate: Date,
  qrCode: String,
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);