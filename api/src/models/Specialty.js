const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Specialty', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      // values: [
      //   'Italiana',
      //   'Francesa',
      //   'India',
      //   'Asiática',
      //   'Parrilla',
      //   'Comida rápida',
      //   'Vegana',
      //   'Vegetariana',
      //   'Dietas especiales',
      // ],
    },
  }, { timestamps: false });
};

/**
 * @swagger
 * components:
 *  schemas:
 *    Specialty:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: El nombre de la especialidad de comida.
 *          example: Parrilla
*
*/

// *          enum: [Italiana, Francesa, India, Asiática, Parrilla, Comida rápida, Vegana, Vegetariana, Dietas especiales]
