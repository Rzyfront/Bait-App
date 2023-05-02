const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Schedule',
    {
      sunday: {
        type: DataTypes.STRING,
      },
      monday: {
        type: DataTypes.STRING,
      },
      tuesday: {
        type: DataTypes.STRING,
      },
      wednesday: {
        type: DataTypes.STRING,
      },
      thursday: {
        type: DataTypes.STRING,
      },
      friday: {
        type: DataTypes.STRING,
      },
      saturday: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
  );
};
/**
 * @swagger
 * components:
 *  schemas:
 *    Schedule:
 *      type: object
 *      properties:
 *        sunday:
 *          type: string
 *        monday:
 *          type: string
 *        tuesday:
 *          type: string
 *        wednesday:
 *          type: string
 *        thursday:
 *          type: string
 *        friday:
 *          type: string
 *        saturday:
 *          type: string
 *      required:
 *        - sunday
 *        - monday
 *        - tuesday
 *        - wednesday
 *        - thursday
 *        - friday
 *        - saturday
 *
 */
