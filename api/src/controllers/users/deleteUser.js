const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    if (user.role === 'superAdmin') throw new Error('SuperAdmin cannot be suspended');
    user.verified = 'suspended';
    await user.save();
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Eliminar cue (borrado lógico)
 *     description: Elimina un usuario por ID que contiene el token del header. El borrado es lógico.
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autenticación con el ID del usuario.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/Success'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
