module.exports = async (req, res) => {
  try {
    const { local, userId, role } = req;
    if (userId !== req.local.UserId && role !== 'admin' && role !== 'superAdmin') throw new Error('Only an admin or the owner of the locale can delete a locale');
    local.verified = 'archived';
    await local.save();
    return res.status(201).json({ success: true, message: 'Local successfully deleted' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
/**
 * @swagger
 * /locals/{localId}:
 *   delete:
 *     summary: Borra un local por su ID
 *     description: Borra un local identificado por su ID de manera lógica (archivado). Solo el propietario del local o un administrador pueden realizar esta acción.
 *     tags: [Local]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: localId
 *         description: ID del local a borrar
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: header
 *         name: authorization
 *         description: JWT con la propiedad 'role' igual a 'owner', 'admin' o 'superAdmin'
 *         required: true
 *         schema:
 *           type: string
 *           format: jwt
 *     responses:
 *       '201':
 *         description: Local eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indica si se eliminó el local correctamente
 *                 message:
 *                   type: string
 *                   example: Local eliminado correctamente
 *                   description: Mensaje de éxito
 *       '400':
 *         description: Error al intentar eliminar el local
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indica si se produjo un error al intentar eliminar el local
 *                 message:
 *                   type: string
 *                   example: Solo un administrador o el propietario del local pueden eliminar un local
 *                   description: Mensaje de error
 */
