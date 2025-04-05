const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  patientName: String,
  amount: Number,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Added password field
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  date: { type: Date, default: Date.now },
  department: String,

  insurance: {
    provider: String,
    claimStatus: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
    claimAmount: Number
  }
});

module.exports = mongoose.model('Finance', financeSchema);
