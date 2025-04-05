const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.get('/', staffController.getAllStaff);
router.post('/', staffController.createStaff);
router.post('/add', staffController.addPatient);
router.put('/:id/clock', staffController.clockAction);
router.get('/:id/attendance', staffController.getAttendanceReport);

router.get('/departments/overview', staffController.getDepartmentOverview);
router.get('/notifications', staffController.getNotifications);
router.get('/filter/role', staffController.filterByRole);
router.get('/active/today', staffController.getActiveStaffToday);

module.exports = router;
