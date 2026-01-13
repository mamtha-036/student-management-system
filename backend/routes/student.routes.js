const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const auth = require('../middleware/auth.middleware');

// PROTECTED ROUTES (ADMIN ONLY)
router.post('/', auth(['admin']), studentController.createStudent);
router.get('/', auth(['admin', 'staff']), studentController.getStudents);
router.get('/:id', auth(['admin', 'staff']), studentController.getStudentById);
router.put('/:id', auth(['admin']), studentController.updateStudent);
router.delete('/:id', auth(['admin']), studentController.deleteStudent);

module.exports = router;
