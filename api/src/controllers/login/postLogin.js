const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [{ model: Image, attribute: ['url'], required: false }] });
    if (!user) throw new Error('Contraseña o email incorrecto');

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) throw new Error('Contraseña o email incorrecto');

    if (user.verified === 'unVerified') throw new Error('Verfica tu correo electrónico');
    if (user.verified === 'suspended') throw new Error('Su cuenta ah sido suspendida');

    const token = jwt.sign({
      email: user.email,
      id: user.id,
      role: user.role,
      verified: user.verified,
    }, process.env.SECRET_KEY);

    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión con credenciales de usuario
 *     tags:
 *       - Login
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Datos de inicio de sesión del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             example:
 *               email: juan@gmail.com
 *               password: juan1234
 *     responses:
 *       '200':
 *         description: Token de autenticación generado para el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: true
 *                 token:
 *                   type: string
 *                   description: Token de autenticación del usuario.
 *                   example: "eyJhbGciOiJIUzI1NiIsIVCJ9.eyJlbWFpbCI6ImZyYW5jb2VnasIsImlkIjoxLCJyb2xlIjoic3VwZXJBZG1pbiIsInZlcmlmaWyaWZpZWQyMTIyMzN9.DMINZmDOOuD6q-j9zelHn5KZsM4XVE"
 *       '400':
 *         description: Error en la solicitud de inicio de sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado.
 *                   example: "Contraseña o email incorrecto"
 */
