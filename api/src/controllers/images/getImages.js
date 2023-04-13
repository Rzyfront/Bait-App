const { Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json({ images, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
