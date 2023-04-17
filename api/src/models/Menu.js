const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Menu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // dishId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Dish',
    //     key: 'id',
    //   },
    // },
  });
};
