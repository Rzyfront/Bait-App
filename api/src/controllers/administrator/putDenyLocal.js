const { Document /** Local */ } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { documentId } = req.body;
    const doc = await Document.findByPk(documentId);
    // await local.setUser();
    await doc.destroy();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /administrator/denyLocal:
 *   put:
 *     summary: Rechaza la solicitud de asignación de un local por parte de un usuario.
 *     description: Borra un documento, lo cual deriva en que se rechace la petición de un usuario para que se le asigne un local. Solo los usuarios con roles de 'admin' o 'superAdmin' pueden realizar esta acción.
 *     tags: [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           description: El token de autenticación JWT del usuario.
 *     requestBody:
 *       description: El ID del documento que se desea borrar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: integer
 *                 description: El ID del documento que se desea borrar.
 *                 example: 123
 *     responses:
 *       '200':
 *         description: Se ha eliminado el documento correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si se ha eliminado el documento correctamente.
 *                   example: true
 *       '400':
 *         description: Ha ocurrido un error al eliminar el documento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si ha habido éxito en la petición.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: La descripción del error que ha ocurrido.
 *                   example: "No se ha encontrado el documento especificado."
 */
