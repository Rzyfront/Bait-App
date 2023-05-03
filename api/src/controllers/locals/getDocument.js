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
    const token = jwt.sign({ documentId: local.Document.id }, process.env.SECRET_KEY_2, { expiresIn: '1h' });
    res.status(200).json({ success: true, url: `${process.env.SERVER_DEPLOY}/locals/document?auth=${token}` });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

/**
 * @swagger
 * /locals/document/{localId}:
 *   get:
 *     summary: Crea un link para acceder a la documentación de un local.
 *     description: Este endpoint devuelve url verificada mediante un JWT para acceder al documento asociado al local con el ID proporcionado en los parámetros. El usuario debe estar autenticado y tener un token de JWT con una propiedad `role` que tenga el valor `admin` o `superAdmin` para poder realizar la acción.
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
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 url:
 *                   type: string
 *                   description: url autenticada para acceder a la documentación de un local.
 *                   example: 'https://example.com?auth=JWT'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
