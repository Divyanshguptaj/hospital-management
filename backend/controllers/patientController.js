const Patient = require('../models/patientModel');

// 📋 Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.json(patients);
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


// 📋 Get logged-in patient's profile
exports.getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id)
      .populate('appointments'); // Only if appointments are referenced
    // console.log("lasdjfsdl",patient)
    return res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patient details' });
  }
};


// 📅 Get all appointments for logged-in patient
exports.getAllAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch the user from the database
    const user = await Patient.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Assuming appointments are stored in user.appointments
    const appointments = user.appointments || [];

    return res.status(200).json({success: true, message:"Fetched user appointment details", appointments});
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return res.status(500).json({
      message: "Failed to retrieve appointments.",
      error: err.message,
    });
  }
};

// 📜 Get medical history for logged-in patient
exports.getMedicalHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await Patient.findById(userId).select("medicalHistory");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ medicalHistory: user.medicalHistory });
  } catch (err) {
    console.error("Error fetching medical history:", err);
    res.status(500).json({ message: "Server error fetching medical history" });
  }
};

// 📑 Get reports for logged-in patient
exports.getAllReports = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ reports: patient.reports || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reports" });
  }
};

// controllers/patientController.js
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, contact, age, gender } = req.body;

    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.firstName = firstName || patient.firstName;
    patient.lastName = lastName || patient.lastName;
    patient.contact = contact || patient.contact;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;

    await patient.save();

    res.json({ message: "Profile updated successfully", patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
};
