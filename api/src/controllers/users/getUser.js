const { User, Image, Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'lastname', 'age', 'location'],
      include: [
        { model: Image, attributes: ['url'] },
        {
          model: Review,
          where: { verified: 'verified' },
          required: false,
        },
      ],
    });
    if (!user) throw new Error('Usuario no encontrado');
    return res.status(200).json({ user, success: true });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Obtiene información del usuario por ID
 *     description: "Obtiene la información del usuario, incluyendo su imagen y reseñas (si tiene) por ID."
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Información del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si
 *                 user:
 *                   allOf:
 *                    - $ref: '#/components/schemas/User'
 *                    - properties:
 *                       Image:
 *                        $ref: '#/components/schemas/Image'
 *                       Reviews:
 *                         type: array
 *                         description: Lista de reseñas del usuario
 *                         items:
 *                           $ref: '#/components/schemas/Review'
 *       404:
 *        $ref: '#/components/responses/NotFound'
 */
