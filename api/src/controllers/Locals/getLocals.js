const { Local, Characteristics } = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const locals = await Local.findAll({
      include: {
        model: Characteristics,
        attributes: allCharacteristics,
      },
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};
