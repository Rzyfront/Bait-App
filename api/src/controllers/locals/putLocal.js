const { Characteristic } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics, lat, lng, specialty, document,
  } = req.body;
  try {
    await Characteristic.update(characteristics, { where: { id: req.local.id } });
    const updateLocal = await req.local.update({
      name, location, schedule, email, lat, lng, specialty,
    });
    if (document) await updateLocal.setDocument(document.id);
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
