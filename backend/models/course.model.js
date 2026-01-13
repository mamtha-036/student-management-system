module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('courses', {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    course_name: DataTypes.STRING,
    course_code: {
      type: DataTypes.STRING,
      unique: true
    },
    credit_hours: DataTypes.INTEGER
  });
  return Course;
};
