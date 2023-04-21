const {
  Local, Characteristic, Menu, Review, Image,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  const { verified } = req.query;
  try {
    const locals = await Local.findByPk(req.local.id, {
      attributes: {
        exclude: ['email', 'createdAt', 'updatedAt'],
      },
      include: [{
        model: Characteristic,
        attributes: allCharacteristics,
      }, { model: Menu },
      {
        model: Review,
        where: { verified: verified ?? true },
        required: false,
      },
      { model: Image, attributes: ['url'] }],
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
