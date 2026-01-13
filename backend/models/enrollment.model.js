module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('enrollments', {
    enroll_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    semester: DataTypes.STRING,
    grade: DataTypes.STRING
  });
  return Enrollment;
};
