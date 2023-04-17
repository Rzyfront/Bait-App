// const { Op } = require('sequelize');
const { fn, col } = require('sequelize');
const {
  Local, Characteristic, Image, Review,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const { count, rows } = await Local.findAndCountAll({
      where: req.where,
      include: [
        {
          model: Characteristic,
          attributes: allCharacteristics,
          where: req.characteristics,
        },
        {
          model: Image,
          attributes: ['url'],
        },
        {
          model: Review,
          attributes: [],
        },
      ],
      attributes: ['id', [fn('AVG', col('Reviews.rating')), 'rating'], 'name', 'location', 'verified', 'schedule'],
      order: req.order,
      limit: 10,
      offset: 0,
      group: ['Local.id', 'Images.id', 'Characteristic.id'],
      subQuery: false,
    });
    res.status(200).json({ count: count.length, locals: rows, success: true });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
