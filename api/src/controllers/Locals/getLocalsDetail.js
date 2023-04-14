const { Local, Characteristics, Menu } = require('../../db');
const { columnsToGetCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  const locals = await Local.findOne({
    where: { id: req.local.id },
    include: [{
      model: Characteristics,
      attributes: columnsToGetCharacteristics,
    }, { model: Menu }],
  });
  res.status(200).json({ locals, success: true });
};
