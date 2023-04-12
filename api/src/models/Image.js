const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.difine('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
