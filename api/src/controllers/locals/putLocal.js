const { Characteristic } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics,
  } = req.body;
  try {
    if (req.userId !== req.local.UserId) throw new Error('The user is not the owner of the locale');
    await Characteristic.update(characteristics, { where: { id: req.local.id } });
    const updateLocal = await req.local.update({
      name, location, schedule, email,
    });
    const local = {
      id: updateLocal.id,
      name: updateLocal.name,
      location: updateLocal.location,
      specialty: updateLocal.specialty,
    };
    return res.status(201).json({ success: true, local });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
