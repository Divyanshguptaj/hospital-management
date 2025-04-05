const Patient = require('../models/patientModel');

// 📋 Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patients' });
  }
};

// 🔍 Search/filter patients by name/status
exports.searchPatients = async (req, res) => {
  const { name, status } = req.query;
  const query = {};

  if (name) query.firstName = new RegExp(name, 'i');
  if (status) query.status = status;

  try {
    const results = await Patient.find(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
};

// 📄 Get a single patient's profile
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(404).json({ message: 'Patient not found' });
  }
};

// ➕ Create new patient
exports.createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create patient' });
  }
};

// ✏️ Update profile/status
exports.updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
};

// 🏥 Admit / Discharge logic
exports.admitDischarge = async (req, res) => {
  const { status, roomNumber, doctor, reason } = req.body;

  if (!['Admitted', 'Discharged'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: `${status} successful`,
      details: { roomNumber, doctor, reason },
      patient
    });
  } catch (err) {
    res.status(400).json({ message: 'Status update failed' });
  }
};

// 📬 Simulate sending SMS/Email
exports.sendReminder = async (req, res) => {
  const { type } = req.body;

  if (!['sms', 'email'].includes(type)) {
    return res.status(400).json({ message: 'Invalid type' });
  }

  // Simulate API
  res.json({ message: `${type.toUpperCase()} reminder sent (simulated)` });
};
