const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    archive: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    data: {
      type: DataTypes.BLOB,
    },
  }, { timestamps: false });
};
