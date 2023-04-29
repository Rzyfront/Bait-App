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
/**
 * @swagger
 * components:
 *   schemas:
 *    Document:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID del documento
 *        archive:
 *          type: string
 *          description: Nombre del archivo
 *        data:
 *          type: string
 *          format: binary
 *          description: Contenido del archivo
 *      required:
 *        - archive
 *        - data
*/
