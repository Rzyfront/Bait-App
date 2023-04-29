const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Characteristic',
    {
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
 */
