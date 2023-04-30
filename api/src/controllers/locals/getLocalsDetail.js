const { fn, col } = require('sequelize');
const {
  Local, Characteristic, Review, Image,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const locals = await Local.findByPk(req.local.id, {
      attributes: {
        include: [
          [fn('AVG', col('Reviews.rating')), 'rating'],
          [fn('AVG', col('Reviews.food')), 'avgFood'],
          [fn('AVG', col('Reviews.service')), 'avgService'],
          [fn('AVG', col('Reviews.environment')), 'avgEnvironment'],
          [fn('AVG', col('Reviews.qaPrice')), 'avgQaPrice'],
        ],
        exclude: ['email', 'createdAt', 'updatedAt'],
      },
      include: [{
        model: Characteristic,
        attributes: allCharacteristics,
      },
      {
        model: Review,
        attributes: [],
      },
      { model: Image, attributes: ['url'] }],
      group: ['Local.id', 'Images.id', 'Characteristic.id'],
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
