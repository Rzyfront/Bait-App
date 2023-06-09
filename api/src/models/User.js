const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    verified: {
      type: DataTypes.ENUM('verified', 'unVerified', 'suspended'),
      defaultValue: 'unVerified',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'owner', 'user', 'superAdmin'),
      defaultValue: 'user',
    },
    isGoogleUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Identificador único del usuario
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *           required: true
 *           example: Franco
 *         lastname:
 *           type: string
 *           description: Apellido del usuario
 *           required: true
 *           example: Gutierrez
 *         age:
 *           type: integer
 *           description: Edad del usuario
 *           example: 21
 *         phone_number:
 *           type: string
 *           description: Número de teléfono del usuario
 *           example: 1233434345
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *           required: true
 *           unique: true
 *           example: email@example.com
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           required: true
 *           example: hashPassword
 *         location:
 *           type: string
 *           description: Ubicación del usuario
 *           example: Buenos Aires
 *         verified:
 *           type: string
 *           enum: ['verified', 'unVerified', 'suspended']
 *           description: Estado de verificación del usuario
 *           default: unVerified
 *           example: verified
 *         isActive:
 *           type: boolean
 *           description: Indica si el usuario está activo
 *           default: true
 *           example: true
 *         role:
 *           type: string
 *           enum: ['admin', 'owner', 'user', 'superAdmin']
 *           description: Rol del usuario
 *           default: user
 *           example: superAdmin
 *         isGoogleUser:
 *           type: boolean
 *           description: Indica si el usuario ha iniciado sesión a través de Google
 *           default: false
 *           example: true
 *       required:
 *         - name
 *         - email
 *         - verified
 *         - role
 *         - isActive
 */
