const { Characteristics } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics,
  } = req.body;
  try {
    await Characteristics.update(characteristics, { where: { id: req.local.id } });
    const updateLocal = await req.local.update({
      name, location, schedule, email,
    });
    return res.status(200).send(updateLocal);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
