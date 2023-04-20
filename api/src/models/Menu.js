const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Menu', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        'Entradas',
        'Sopas y cremas',
        'Ensaladas',
        'Platos principales',
        'Acompañamientos',
        'Postres',
        'Dieta Vegana',
        'Dieta Gluten Free',
        'Varios',
      ),
      defaultValue: 'Varios',
      allowNull: false,
    },
  });
};
