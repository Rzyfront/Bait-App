const { Local } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics,
  } = req.body;
  try {
    const newLocal = await Local.create({
      name, location, schedule, email,
    });
    await newLocal.createCharacteristic(characteristics);
    return res.status(201).json({ success: true, local: newLocal });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
