const cloudinary = require('cloudinary').v2;
const { Image } = require('../../db');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  try {
    const responseImage = await cloudinary.uploader.upload(req.body.image);
    const newImage = await Image.create({ url: responseImage.secure_url });
    res.status(201).json({ image: newImage, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};
