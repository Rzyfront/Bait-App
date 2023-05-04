const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Characteristic',
    {
      type: {
        type: DataTypes.ENUM('Elegante', 'Joven', 'Nuevo', 'Colonial'),
        defaultValue: 'Nuevo',
      },
      wifi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      parking_lot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      outdoor_seating: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      live_music: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      table_service: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      family_style: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      romantic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      big_group: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      work_friendly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pet_friendly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // PAYMENT METHODS
      pay_apps: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      debit_card: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      credit_card: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false },
  );
};
/**
 * @swagger
 * components:
 *   schemas:
 *     Characteristic:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum:
 *             - Elegante
 *             - Joven
 *             - Nuevo
 *             - Colonial
 *           default: Nuevo
 *         wifi:
 *           type: boolean
 *           default: false
 *         parking_lot:
 *           type: boolean
 *           default: false
 *         outdoor_seating:
 *           type: boolean
 *           default: false
 *         live_music:
 *           type: boolean
 *           default: false
 *         table_service:
 *           type: boolean
 *           default: false
 *         family_style:
 *           type: boolean
 *           default: false
 *         romantic:
 *           type: boolean
 *           default: false
 *         big_group:
 *           type: boolean
 *           default: false
 *         work_friendly:
 *           type: boolean
 *           default: false
 *         pet_friendly:
 *           type: boolean
 *           default: false
 *         pay_apps:
 *           type: boolean
 *           default: false
 *         devit_card:
 *           type: boolean
 *           default: false
 *         credit_card:
 *           type: boolean
 *           default: false
 *         cash:
 *           type: boolean
 *           default: false
 *       required:
 *         - wifi
 *         - parking_lot
 *         - outdoor_seating
 *         - live_music
 *         - table_service
 *         - family_style
 *         - romantic
 *         - big_group
 *         - work_friendly
 *         - pet_friendly
 *         - pay_apps
 *         - devit_card
 *         - credit_card
 *         - cash
 */
