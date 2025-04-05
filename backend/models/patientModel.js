const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Added password field
  gender: String,
  contact: String,
  ehrNumber: String,
  status: { type: String, enum: ['Admitted', 'Discharged'], default: 'Admitted' },
  medicalHistory: [{
    date: Date,
    diagnosis: String,
    medications: [String],
    testResults: String
  }],
  appointments: [{
    date: Date,
    doctor: String,
    department: String
  }]
});

module.exports = mongoose.model('Patient', patientSchema);