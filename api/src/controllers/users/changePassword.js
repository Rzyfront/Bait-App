const bcrypt = require('bcrypt');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.userId);

    const pass = await bcrypt.compare(oldPassword, user.password);
    if (!pass) throw new Error('Contraseña antigua incorrecta');

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    await user.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/**
 * @swagger
 * /user/changePassword:
 *   put:
 *     summary: Cambiar la contraseña del usuario
 *     description: Cambia la contraseña del usuario autenticado
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autorización con el id del usuario
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Solicitud para cambiar la contraseña del usuario
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *               description: Contraseña actual del usuario
 *             newPassword:
 *               type: string
 *               description: Nueva contraseña del usuario
 *     responses:
 *       '201':
 *         description: Contraseña cambiada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación se realizó con éxito
 *                   example: true
 *       '400':
 *         description: Error al cambiar la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación se realizó con éxito
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: Contraseña incorrecta
 */
