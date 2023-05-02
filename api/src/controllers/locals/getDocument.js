const jwt = require('jsonwebtoken');
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
    // res.set('Content-Type', 'application/pdf');
    // res.send(local.Document.data);
    const token = jwt.sign({ documentId: local.Document.id }, process.env.SECRET_KEY_2, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

/**
 * @swagger
 * /locals/document/{localId}:
 *   get:
 *     summary: Muestra el PDF del local con el ID proporcionado en los parámetros.
 *     description: Este endpoint devuelve el archivo PDF del documento asociado al local con el ID proporcionado en los parámetros. El usuario debe estar autenticado y tener un token de JWT con una propiedad `role` que tenga el valor `admin` o `superAdmin` para poder realizar la acción.
 *     tags: [Local]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: localId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del local.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: El token de autenticación JWT con una propiedad `role` que tenga el valor `admin` o `superAdmin`.
 *     responses:
 *       200:
 *         description: OK. El archivo PDF del documento se ha enviado correctamente.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
