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

/**
 * @swagger
 * /locals/document:
 *   get:
 *     summary: Muestra un PDF con el ID proporcionado en los parámetros.
 *     description: Este endpoint devuelve el archivo PDF con el ID proporcionado en los parámetros mediante un token firmado
 *     tags: [Local]
 *     parameters:
 *       - in: query
 *         name: auth
 *         schema:
 *           type: string
 *         required: true
 *         description: Token del cual se obtiene el id del documento a servir.
 *     responses:
 *       200:
 *         description: OK. El archivo PDF del documento se ha enviado correctamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
