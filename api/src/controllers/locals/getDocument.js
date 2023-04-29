const cloudinary = require('../../config/cloudinary');// eslint-disable-line no-unused-vars
const { Local, Document } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { localId } = req.params;
    const local = await Local.findByPk(localId, { include: [{ model: Document }] });
    if (!local) throw new Error('Local not found');
    if (!local.Document) throw new Error('Document not found');

    // const secureURL = cloudinary.url(local.Document.archive, { secure: true });
    //
    // res.redirect(secureURL);
    res.set('Content-Type', 'application/pdf');
    res.send(local.Document.data);
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
