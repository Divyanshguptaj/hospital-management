const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const auth = require('../middleware/authMiddleware');

router.get('/getAllAppointments',auth, patientController.getAllAppointments);
router.get('/medical-history',auth, patientController.getMedicalHistory);
router.get("/getAllReports", auth, patientController.getAllReports);
router.get('/me',auth, patientController.getPatientDetails);
router.post('/:id/reminder', patientController.sendReminder);
router.put("/updateProfile", auth, patientController.updateProfile);
router.get('/getAllPatients',patientController.getAllPatients);


// router.get('/search', patientController.searchPatients);
// router.get('/:id', patientController.getPatientById);
// router.post('/', patientController.createPatient);
// router.put('/:id', patientController.updatePatient);
// router.post('/:id/status', patientController.admitDischarge);

module.exports = router;
