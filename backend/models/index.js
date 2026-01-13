const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false
  }
);

// Load models
const User = require('./user.model')(sequelize, DataTypes);
const Student = require('./student.model')(sequelize, DataTypes);
const Course = require('./course.model')(sequelize, DataTypes);
const Enrollment = require('./enrollment.model')(sequelize, DataTypes);

// Relationships
Student.hasMany(Enrollment, { foreignKey: 'student_id' });
Enrollment.belongsTo(Student, { foreignKey: 'student_id' });

Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = {
  sequelize,
  User,
  Student,
  Course,
  Enrollment
};

