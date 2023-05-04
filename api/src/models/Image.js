const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: Identificador único de la imagen.
 *           example: 1
 *         url:
 *           type: string
 *           description: URL de la imagen.
 *           example: "https://example.com/image.jpg"
 *       required:
 *         - url
*/
