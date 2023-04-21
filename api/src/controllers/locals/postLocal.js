const { Local, User } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics, images, specialty, lat, lng,
  } = req.body;
  try {
    const user = await User.findByPk(req.userId);
    const newLocal = await Local.create({
      name, location, schedule, email, specialty, lat, lng,
    });
    await newLocal.createCharacteristic(characteristics);
    await newLocal.addImages(images.map((image) => image.id));
    await user.addLocal(newLocal);
    const local = await Local.findByPk(newLocal.id, { attributes: ['id', 'name', 'location', 'specialty'] });
    return res.status(201).json({ success: true, local });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
