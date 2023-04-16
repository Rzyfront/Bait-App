const {
  Local, Characteristic, Menu, Review, Image,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const locals = await Local.findByPk(req.local.id, {
      include: [{
        model: Characteristic,
        attributes: allCharacteristics,
      }, { model: Menu },
      { model: Review },
      { model: Image }],
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
