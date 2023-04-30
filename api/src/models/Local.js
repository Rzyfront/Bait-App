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
      type: DataTypes.ENUM('verified', 'unVerified', 'archived'),
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
      // unique: true,
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
      // allowNull: true,
    },
    schedule: DataTypes.STRING,
  });
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Local:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único del local
 *         name:
 *           type: string
 *           description: Nombre del local
 *         verified:
 *           type: string
 *           enum: ['verified', 'unVerified', 'archived']
 *           description: Estado de verificación del local
 *         email:
 *           type: string
 *           format: email
 *           description: Dirección de correo electrónico del local
 *         location:
 *           type: string
 *           description: Dirección del local
 *         lat:
 *           type: number
 *           format: float
 *           description: Latitud de la ubicación del local
 *         lng:
 *           type: number
 *           format: float
 *           description: Longitud de la ubicación del local
 *         specialty:
 *           type: string
 *           description: Especialidad del local
 *         schedule:
 *           type: string
 *           description: Horario del local
 *       required:
 *         - name
 *         - location
 */
