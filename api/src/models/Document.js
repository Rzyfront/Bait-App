const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      default: 'document',
    },
    archive: DataTypes.BLOB,
  });
};
