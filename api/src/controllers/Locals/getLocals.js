// const { Op } = require('sequelize');
const {
  Local, Characteristics, Image,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const locals = await Local.findAll({
      where: req.where,
      include: [{
        model: Characteristics,
        attributes: allCharacteristics,
        where: req.characteristics,
      },
      { model: Image, attributes: ['url'] },
      ],
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
