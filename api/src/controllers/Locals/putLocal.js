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
    return res.status(201).json({ success: true, local: updateLocal });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
