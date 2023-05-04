const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [{ model: Image, attribute: ['url'] }],
    });
    if (!user) throw new Error('User not found');
    if (user.verified === 'suspended') throw new Error('Su cuenta ha sido suspendida');
    if (user.role !== req.role) throw new Error('Por favor, inicie sesión nuevamente');
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /login:
 *  get:
 *    summary: Iniciar sesión con un token JWT
 *    description: Este endpoint devuelve la información de un usuario basado en su token JWT.
 *    tags: [Login]
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        description: Token JWT del usuario
 *        required: true
 *        schema:
 *          type: string
 *          format: JWT
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la solicitud se realizó con éxito.
 *                user:
 *                  allOf:
 *                   - $ref: '#/components/schemas/User'
 *                   - properties:
 *                       Image:
 *                         $ref: '#/components/schemas/Image'
 *      '400':
 *        $ref: '#/components/responses/BadRequest'
 *
 */
