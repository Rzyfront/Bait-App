const { Local, Characteristics } = require('../../db');
const { columnsToGetCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const locals = await Local.findAll({
      include: {
        model: Characteristics,
        attributes: columnsToGetCharacteristics,
      },
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(404).json({ success: false });
  }
};
