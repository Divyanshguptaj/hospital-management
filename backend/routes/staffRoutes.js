const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const staffController = require('../controllers/staffController');

router.get('/all',auth, staffController.getAllStaff);
router.get('/me',auth, staffController.getStaffDetails);
router.put('/updateStatus/:id', staffController.updateStatus);
router.put('/updateAppointmentStatus', staffController.updateAppointmentStatus);
router.put('/addAppointment/:id', staffController.addAppointment);
router.post('/addPatient', staffController.addPatient);
// router.post('/', staffController.createStaff);
// router.post('/add', staffController.addPatient);
// router.put('/:id/clock', staffController.clockAction);
// router.get('/:id/attendance', staffController.getAttendanceReport);

// router.get('/departments/overview', staffController.getDepartmentOverview);
// router.get('/notifications', staffController.getNotifications);
// router.get('/filter/role', staffController.filterByRole);
// router.get('/active/today', staffController.getActiveStaffToday);

module.exports = router;
