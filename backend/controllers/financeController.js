const Finance = require('../models/financeModel');

// Add a billing entry
exports.addBilling = async (req, res) => {
  try {
    const newEntry = new Finance(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Billing added', billing: newEntry });
  } catch (err) {
    res.status(500).json({ message: 'Error adding billing', error: err.message });
  }
};

// Get all bills (with optional filters)
exports.getBills = async (req, res) => {
  try {
    const { status, department, patientName } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (patientName) filter.patientName = { $regex: patientName, $options: 'i' };

    const bills = await Finance.find(filter).sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bills', error: err.message });
  }
};

// Get overdue payments
exports.getOverdue = async (req, res) => {
  try {
    const overdue = await Finance.find({ status: 'Pending' });
    res.json(overdue);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching overdue bills', error: err.message });
  }
};

// Get revenue summary
exports.getRevenueSummary = async (req, res) => {
  try {
    const result = await Finance.aggregate([
      { $match: { status: 'Paid' } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching revenue', error: err.message });
  }
};
