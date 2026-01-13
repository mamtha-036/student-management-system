const { Course } = require('../models');

module.exports = {

  createCourse: async (req, res) => {
    try {
      const course = await Course.create(req.body);
      return res.status(201).json({ message: 'Course created', course });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getCourses: async (req, res) => {
    try {
      const courses = await Course.findAll();
      return res.json(courses);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      return res.json(course);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      await course.update(req.body);
      return res.json({ message: 'Course updated', course });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      await course.destroy();
      return res.json({ message: 'Course deleted' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

};
