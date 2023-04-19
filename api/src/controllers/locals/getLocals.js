const { fn, col } = require('sequelize');
const {
  Local, Characteristic, Image, Review,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  const { numPage } = req.params;
  const page = numPage || 1;
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
          where: req.reviews,
          required: false,
        },
      ],
      attributes: ['id', [fn('AVG', col('Reviews.rating')), 'rating'], 'name', 'location', 'verified', 'schedule'],
      order: req.order,
      limit: page * 10,
      offset: (page - 1) * 10,
      group: ['Local.id', 'Images.id', 'Characteristic.id'],
      subQuery: false,
    });
    const totalPages = Math.ceil(count.length / 10);
    res.status(200).json({
      success: true, count: count.length, totalPages, locals: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
