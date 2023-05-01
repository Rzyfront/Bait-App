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
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del local
 *           example: Rodzini
 *         verified:
 *           type: string
 *           enum: ['verified', 'unVerified', 'archived']
 *           description: Estado de verificación del local
 *           example: 'unVerified'
 *         email:
 *           type: string
 *           format: email
 *           description: Dirección de correo electrónico del local
 *           example: 'email@example.com'
 *         location:
 *           type: string
 *           description: Dirección del local
 *           example: 'Chaco'
 *         lat:
 *           type: number
 *           format: float
 *           description: Latitud de la ubicación del local
 *           example: -0.56783456787
 *         lng:
 *           type: number
 *           format: float
 *           description: Longitud de la ubicación del local
 *           example: 20.965678887
 *         specialty:
 *           type: string
 *           description: Especialidad del local
 *           example: 'Italiana'
 *         schedule:
 *           type: string
 *           description: Horario del local
 *           example: '18 - 24'
 *       required:
 *         - name
 *         - location
 */
