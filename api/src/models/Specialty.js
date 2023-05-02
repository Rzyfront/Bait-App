const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Specialty', {
    name: {
      type: DataTypes.ENUM,
      values: [
        'Italiana',
        'Francesa',
        'India',
        'Asiática',
        'Parrilla',
        'Comida rápida',
        'Vegana',
        'Vegetariana',
        'Dietas especiales',
      ],
    },
  });
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
 *          enum: [Italiana, Francesa, India, Asiática, Parrilla, Comida rápida, Vegana, Vegetariana, Dietas especiales]
 *          description: El nombre de la especialidad de comida.
 *
 */
