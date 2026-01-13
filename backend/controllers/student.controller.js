const { Student } = require('../models');
const { Op } = require('sequelize');


module.exports = {

  createStudent: async (req, res) => {
    try {
      const student = await Student.create(req.body);
      return res.status(201).json({ message: 'Student created', student });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getStudents: async (req, res) => {
  try {
    const { search, sortBy = 'student_id', order = 'ASC', page = 1, pageSize = 10 } = req.query;

    const where = {};

    // SEARCH FILTER
    if (search) {
      where[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * pageSize;

    const students = await Student.findAll({
      where,
      order: [[sortBy, order]],
      limit: parseInt(pageSize),
      offset: parseInt(offset)
    });

    return res.json(students);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
},


  getStudentById: async (req, res) => {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      return res.json(student);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      await student.update(req.body);
      return res.json({ message: 'Student updated', student });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      await student.destroy();
      return res.json({ message: 'Student deleted' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

};
