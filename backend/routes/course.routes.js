const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const auth = require('../middleware/auth.middleware');

// ADMIN ONLY FOR CREATE, UPDATE, DELETE
router.post('/', auth(['admin']), courseController.createCourse);
router.get('/', auth(['admin', 'staff']), courseController.getCourses);
router.get('/:id', auth(['admin', 'staff']), courseController.getCourseById);
router.put('/:id', auth(['admin']), courseController.updateCourse);
router.delete('/:id', auth(['admin']), courseController.deleteCourse);

module.exports = router;
