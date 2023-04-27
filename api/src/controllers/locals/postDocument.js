const { unlink } = require('fs');
const cloudinary = require('../../config/cloudinary');
const { Document } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { public_id } = await cloudinary.uploader.upload(req.file.path);
    unlink(req.file.path, (err) => {
      if (err) throw err;
    });
    const newDocument = await Document.create({ archive: public_id });
    res.status(200).json({ success: true, newDocument });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};
