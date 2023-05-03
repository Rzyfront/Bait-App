const { Document, Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { localId, documentId } = req.body;
    const [local, doc] = await Promise.all([Local.findByPk(localId), Document.findByPk(documentId)]);
    await local.setUser();
    await doc.destroy();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
