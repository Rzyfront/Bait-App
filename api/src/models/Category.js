const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.ENUM('service', 'food', 'environment', 'qa/price'),
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false },
  );
};
