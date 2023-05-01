const { unlink, readFileSync } = require('fs');// eslint-disable-line no-unused-vars
const cloudinary = require('../../config/cloudinary');// eslint-disable-line no-unused-vars
const { Document } = require('../../db');

module.exports = async (req, res) => {
  try {
    // const { public_id } = await cloudinary.uploader.upload(req.file.path);
    const { originalname, path } = req.file;
    const buffer = readFileSync(path);
    const { id, archive } = await Document.create({ archive: originalname, data: buffer });
    unlink(req.file.path, (err) => {
      if (err) throw err;
    });
    // const newDocument = await Document.create({ archive: public_id });
    res.status(200).json({ success: true, newDocument: { id, archive } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};

/**
 * @swagger
 * /locals/document:
 *   post:
 *     summary: Subir documento PDF
 *     description: Sube un documento PDF y lo guarda en la base de datos.
 *     tags:
 *       - Local
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autorización JWT del cual se verifica que el usuario este logueado.
 *         required: true
 *         schema:
 *           type: string
 *           format: jwt
 *       - in: formData
 *         name: archivo
 *         description: Archivo PDF a subir.
 *         required: true
 *         type: file
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Documento subido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 newDocument:
 *                   type: object
 *                   description: Información del nuevo documento subido.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del nuevo documento.
 *                       example: 1
 *                     archive:
 *                       type: string
 *                       description: Nombre del archivo subido.
 *                       example: "example.pdf"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
