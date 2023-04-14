const {
  Local, Characteristics, Menu, Review,
} = require('../../db');
const { columnsToGetCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  const locals = await Local.findOne({
    where: { id: req.local.id },
    include: [{
      model: Characteristics,
      attributes: columnsToGetCharacteristics,
    }, { model: Menu }, { model: Review }],
  });
  res.status(200).json({ locals, success: true });
};
