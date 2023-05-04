const jwt = require('jsonwebtoken');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');
    if (!user.isGoogleUser) throw new Error('No es una cuenta de google');

    if (user.verified === 'unVerified') throw new Error('Verifique su dirección de correo electrónico');
    if (user.verified === 'suspended') throw new Error('Su cuenta ha sido suspendida');

    const token = jwt.sign({
      email: user.email,
      id: user.id,
      role: user.role,
      verified: user.verified,
    }, process.env.SECRET_KEY);

    res.json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Iniciar sesión con una cuenta de Google.
 *
 * @swagger
 * /login/google:
 *   post:
 *     summary: Iniciar sesión con una cuenta de Google.
 *     tags: [Login]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: El correo electrónico de la cuenta de Google.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Devuelve un token JWT válido si la autenticación fue exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la autenticación fue exitosa o no.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: El token JWT generado.
 *                   example: 'laksd93jwi23w82niosdn.2923hjewusnidfu932n.2o3n3d3289di3'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
