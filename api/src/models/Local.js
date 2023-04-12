const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Local', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.ENUM(true, false),
      defaultValue: false,
    },
    email: DataTypes.STRING,
    location: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    schedule: DataTypes.STRING,
  });
};
