const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/', patientController.getAllPatients);
router.get('/search', patientController.searchPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.post('/:id/status', patientController.admitDischarge);
router.post('/:id/reminder', patientController.sendReminder);

module.exports = router;
