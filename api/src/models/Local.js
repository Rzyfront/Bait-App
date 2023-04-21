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
      type: DataTypes.ENUM('verified', 'unVerified', 'suspended'),
      defaultValue: 'unVerified',
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lng: {
      type: DataTypes.FLOAT,
    },
    specialty: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    schedule: DataTypes.STRING,
  });
};
