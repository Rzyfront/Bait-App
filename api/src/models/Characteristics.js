const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Characteristics',
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
