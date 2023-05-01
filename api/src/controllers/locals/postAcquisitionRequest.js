const {
  sendRequestOdAcquisitionLocal,
} = require('../../config/nodemailer/nodemailer-config');
const { User, Document } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId, local } = req;
    const { document } = req.body;
    const { localId } = req.params;
    const user = await User.findByPk(userId);
    if (local.verified === 'verified') throw new Error('You cannot claim a verified location');
    const doc = await local.getDocument();
    if (doc) {
      const Doc = await Document.findByPk(document.id);
      await Doc.destroy();
      throw new Error('This location already has documentation, if this local belongs to you, please contact support.');
    }
    await local.setDocument(document.id);
    await local.setUser(userId);
    await sendRequestOdAcquisitionLocal({
      userEmail: user.email,
      userName: user.name,
      localId,
      localName: local.name,
    });
    res.status(200).json({ success: true, message: 'Email send successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

/**
 * @swagger
 * /locals/acquisition/{localId}:
 *   post:
 *     summary: Reclamar un local con el id proporcionado.
 *     description: Los usuarios pueden reclamar un local proporcionando la documentación necesaria que verifica que el local es suyo. También se envía un correo electrónico a la empresa para notificarles que un usuario ha reclamado un local.
 *     tags: [Local]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: localId
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID del local que se está reclamando.
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: El token JWT del usuario que está reclamando el local.
 *       - in: body
 *         name: document
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Document'
 *         description: La documentación necesaria para reclamar el local.
 *     responses:
 *       '200':
 *         description: El correo electrónico se envió correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud se procesó correctamente.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: El mensaje de éxito.
 *                   example: 'Email send successfully'
 *       '400':
 *         $ref: '#/components/responses/NotFound'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
