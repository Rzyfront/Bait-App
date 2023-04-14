const { Local } = require('../../db');
const { Characteristics } = require('../../db');
const { columnsToGetCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  const locals = await Local.findAll({
    include: {
      model: Characteristics,
      attributes: columnsToGetCharacteristics,
    },
  });
  res.status(200).json({ locals, success: true });
};
