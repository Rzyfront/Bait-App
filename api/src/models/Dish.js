const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dish', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(500),
    },
  }, { timestamps: false });
};
/**
 *
 * @swagger
 * components:
 *  schemas:
 *    Dish:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: ID autoincremental del plato.
 *          example: 1
 *        name:
 *          type: string
 *          description: Nombre del plato.
 *          example: Milanesa con papas
 *        type:
 *          type: string
 *          description: Tipo de plato.
 *          example: Milanesa
 *        price:
 *          type: integer
 *          description: Precio del plato.
 *          example: 200
 *        description:
 *          type: string
 *          description: Descripción del plato.
 *          maxLength: 500
 *          example: Milanesa a la napolitana con papas fritas
 *      required:
 *        - name
 *        - type
 *        - price
 *        - description
 */
