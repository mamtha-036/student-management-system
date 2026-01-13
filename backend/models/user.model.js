module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'staff'),
      defaultValue: 'staff'
    }
  });
  return User;
};
