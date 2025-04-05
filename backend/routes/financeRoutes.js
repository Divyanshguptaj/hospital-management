const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.post('/add', financeController.addBilling);
router.get('/bills', financeController.getBills);
router.get('/overdue', financeController.getOverdue);
router.get('/revenue', financeController.getRevenueSummary);

module.exports = router;
