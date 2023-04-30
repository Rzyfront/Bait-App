const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { verified } = req.query;
    const userToSupend = await User.findByPk(userId);
    if (userToSupend.role === 'superAdmin') throw new Error('SuperAdmin cannot be suspended');
    userToSupend.verified = verified ?? 'suspend';
    await userToSupend.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/**
 *
 * @swagger
 * /administator/suspend/{userId}:
 *     patch:
 *       summary: Suspender un usuario
 *       description: Este endpoint suspende a un usuario en particular.
 *       tags: [Administrador]
 *       parameters:
 *         - in: header
 *           name: Authorization
 *           schema:
 *             type: string
 *           required: true
 *           description: Token de autenticación JWT.
 *         - name: userId
 *           in: path
 *           description: ID del usuario a suspender
 *           required: true
 *           schema:
 *             type: integer
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '201':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Indica si la operación se realizó con éxito.
 *                     example: true
 *         '400':
 *           description: Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     description: Indica si la operación falló.
 *                     example: false
 *                   message:
 *                     type: string
 *                     description: Mensaje de error detallado.
 *                     example: error
 *
 * */
