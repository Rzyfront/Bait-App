const { unlink, readFileSync } = require('fs');// eslint-disable-line no-unused-vars
const cloudinary = require('../../config/cloudinary');
const { Document } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { public_id } = await cloudinary.uploader.upload(req.file.path);
    // const { originalname, path } = req.file;
    // const buffer = readFileSync(path);
    // const newDocument = await Document.create({ archive: originalname, data: buffer });
    unlink(req.file.path, (err) => {
      if (err) throw err;
    });
    const newDocument = await Document.create({ archive: public_id });
    res.status(200).json({ success: true, newDocument });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};
