const { Enrollment, Student, Course } = require('../models');

module.exports = {

  enroll: async (req, res) => {
    try {
      const { student_id, course_id, semester } = req.body;
      const enrollment = await Enrollment.create({ student_id, course_id, semester });
      return res.status(201).json({ message: 'Enrollment successful', enrollment });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getStudentEnrollments: async (req, res) => {
    try {
      const enrollments = await Enrollment.findAll({
        where: { student_id: req.params.id },
        include: Course
      });
      return res.json(enrollments);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getCourseEnrollments: async (req, res) => {
    try {
      const enrollments = await Enrollment.findAll({
        where: { course_id: req.params.id },
        include: Student
      });
      return res.json(enrollments);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

};
