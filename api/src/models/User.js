const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.ENUM('verified', 'unVerified', 'suspended'),
      defaultValue: 'unVerified',
    },
    isActive:{
      type:DataTypes.BOOLEAN,
      default:true
    }
  });
};
