const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // <- Make sure this is present
  role: { type: String, enum: ['Doctor', 'Nurse', 'Admin'] },
  department: String,
  shift: String,
  clockInHistory: [Date],
  clockOutHistory: [Date]
});

module.exports = mongoose.model('Staff', staffSchema);
