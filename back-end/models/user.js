const userModel = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return user;
};

module.exports = userModel;