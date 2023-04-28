const cloudinary = require('../../config/cloudinary');
const { Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const responseImage = await cloudinary.uploader.upload(req.body.image);
    const newImage = await Image.create({ url: responseImage.secure_url });
    res.status(201).json({ image: newImage, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};
