module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('students', {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.ENUM('M', 'F', 'Other')
  });
  return Student;
};
