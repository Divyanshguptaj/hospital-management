const Staff = require('../models/staffModel');
const Patient = require('../models/patientModel');

// ✅ Get full roster
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching staff roster' });
  }
};

// ➕ Add new staff
exports.createStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ message: 'Creation failed' });
  }
};

// 🕒 Clock-in/out logic (mock)
exports.clockAction = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // "in" or "out"

  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    const now = new Date();

    if (action === 'in') staff.clockInHistory.push(now);
    else if (action === 'out') staff.clockOutHistory.push(now);
    else return res.status(400).json({ message: 'Invalid action' });

    await staff.save();
    res.json({ message: `Clock-${action} recorded`, time: now });
  } catch (err) {
    res.status(500).json({ message: 'Clock-in/out failed' });
  }
};

// 📊 Attendance report
exports.getAttendanceReport = async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await Staff.findById(id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });

    const thisMonth = new Date().getMonth();
    const presentDays = staff.clockInHistory.filter(date => new Date(date).getMonth() === thisMonth).length;

    res.json({
      name: staff.name,
      role: staff.role,
      department: staff.department,
      presentDays,
      absentDays: 30 - presentDays // rough idea
    });
  } catch (err) {
    res.status(500).json({ message: 'Could not generate report' });
  }
};

// 🏥 Get department overview
exports.getDepartmentOverview = async (req, res) => {
  try {
    const staff = await Staff.find();
    const overview = {};

    staff.forEach(person => {
      if (!overview[person.department]) {
        overview[person.department] = { total: 0, doctors: 0, nurses: 0, admins: 0 };
      }
      overview[person.department].total += 1;
      overview[person.department][person.role.toLowerCase() + 's'] += 1;
    });

    res.json(overview);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch department data' });
  }
};

// 🔔 Mock notification panel
exports.getNotifications = async (req, res) => {
  res.json([
    { message: 'Shift change approved for Dr. Aryan', type: 'info' },
    { message: 'Admin meeting at 5 PM', type: 'alert' },
    { message: 'Night shift needs 1 more nurse', type: 'warning' }
  ]);
};

// 🎯 Filter staff by role
exports.filterByRole = async (req, res) => {
  const { role } = req.query;
  try {
    const staff = await Staff.find(role ? { role } : {});
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: 'Role-based filtering failed' });
  }
};

// ✅ Get today’s active staff (clocked in today)
exports.getActiveStaffToday = async (req, res) => {
  try {
    const today = new Date();
    const staff = await Staff.find({
      clockInHistory: {
        $elemMatch: {
          $gte: new Date(today.setHours(0, 0, 0, 0)),
          $lte: new Date(today.setHours(23, 59, 59, 999))
        }
      }
    });

    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch active staff' });
  }
};

exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, ehrNumber, status } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
      contact,
      ehrNumber,
      status
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error adding patient', error: err.message });
  }
};

// controllers/staffController.js
exports.getStaffDetails = async (req, res) => {
  try {
    // req.user is populated by the auth middleware
    const staffId = req.user.id;

    const staff = await Staff.findById(staffId).select("-password"); // exclude password

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(staff);
  } catch (err) {
    console.error("Error fetching staff details:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  console.log(id, status);
  try {
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    patient.status = status;
    await patient.save();

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { userId, appointmentIndex, status } = req.body;
  try {
    const patient = await Patient.findById(userId);
    if (!patient) { 
      return res.status(404).json({ message: "Patient not found" });
    }
    if (
      !Array.isArray(patient.appointments) ||
      appointmentIndex < 0 ||
      appointmentIndex >= patient.appointments.length
    ) {
      return res.status(400).json({ message: "Invalid appointment index" });
    }

    patient.appointments[appointmentIndex].status = status;
    await patient.save();

    res.status(200).json({ message: "Appointment status updated successfully" });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addAppointment = async (req, res) => {
  const { appointment } = req.body;
  try {
    console.log(req.params.id)
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.appointments.push(appointment);
    await patient.save();

    res.status(200).json({ message: "Appointment added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// POST /api/staff/addPatient
exports.addPatient = async (req, res) => {
  const { firstName, lastName, age, contact, ehrNumber, status, email, password} = req.body;
  // console.log(req.body);
  try {
    const newPatient = new Patient({ firstName, lastName, age, contact, ehrNumber, status, email, password });
    console.log(newPatient);
    await newPatient.save();
    res.status(201).json({ message: "Patient added", patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: "Error adding patient", error: err });
  }
};
