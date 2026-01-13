const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const auth = require('../middleware/auth.middleware');

// ENROLL STUDENT INTO COURSE
router.post('/', auth(['admin']), enrollmentController.enroll);

// GET ENROLLMENTS OF A STUDENT
router.get('/student/:id', auth(['admin','staff']), enrollmentController.getStudentEnrollments);

// GET ENROLLED STUDENTS IN A COURSE
router.get('/course/:id', auth(['admin','staff']), enrollmentController.getCourseEnrollments);

module.exports = router;
