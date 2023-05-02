const jwt = require('jsonwebtoken');
const { Document } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { auth } = req.query;
    if (!auth) throw new Error('Token not provided or invalid');

    const { documentId } = jwt.verify(auth, process.env.SECRET_KEY_2);
    if (!documentId) throw new Error('Token not provided or invalid');

    const document = await Document.findByPk(documentId);
    if (!document) throw new Error('Token not provided or invalid');

    res.set('Content-Type', 'application/pdf');
    res.send(document.data);
  } catch (error) {
    res.status(401).send(`<h1>${error.message}</h1>`);
  }
};
