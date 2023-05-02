const jwt = require('jsonwebtoken');
const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) throw new Error('Token not provided or invalid');

    const { id, verified } = jwt.verify(token, process.env.SECRET_KEY_2);
    if (!id || !verified) throw new Error('Token not provided or invalid');

    const userToVerify = await User.findByPk(id);
    if (!userToVerify) throw new Error('Token not provided or invalid');

    userToVerify.verified = verified;
    await userToVerify.save();

    res.status(200).send(`<html lang="es"><head><meta charset="UTF-8"><title>Confirmación de correo electrónico</title><style>body{font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#333;height:100vh;display:grid;place-content:center}.container{max-width:600px;margin:0 auto;padding:1.5rem;background-color:#f9f9f9;border:1px solid #ddd;text-align:center}h1{font-size:24px;margin:0 0 1.5rem}p{margin:0 0 1.5rem}.button{display:inline-block;background-color:#007bff;color:#fff;padding:1rem 2rem;text-decoration:none;border-radius:5px;margin-top:1.5rem}</style></head><body><div class="container"><h1>¡Gracias por verificar tu correo electrónico!</h1><p>Tu correo electrónico ha sido verificado con éxito. Ahora puedes disfrutar de todas las funcionalidades de nuestro sitio web.</p><a href="${process.env.FRONT_DEPLOY}" class="button">Ir a la página principal</a></div></body></html>`);
  } catch (error) {
    res.status(400).send('<h1>User not verified</h1>');
  }
};

/**
 * @swagger
 * /user/verified:
 *   get:
 *     summary: Verifica la cuenta de un usuario
 *     description: Verifica la cuenta de un usuario a través de un token JWT que contiene el ID del usuario y la confirmación de correo electrónico.
 *     tags:
 *       - User
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         description: Token JWT que contiene el ID del usuario y la confirmación de correo electrónico.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Respuesta exitosa que contiene una página HTML que confirma que el correo electrónico del usuario ha sido verificado.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: >
 *                 <html>
 *                   <head>
 *                     <title>¡Gracias por verificar tu correo electrónico!</title>
 *                   </head>
 *                   <body>
 *                     <h1>¡Gracias por verificar tu correo electrónico!</h1>
 *                     <p>Tu correo electrónico ha sido verificado con éxito. Ahora puedes disfrutar de todas las funcionalidades de nuestro sitio web.</p>
 *                     <a href="https://example.com" class="button">Ir a la página principal</a>
 *                   </body>
 *                 </html>
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */
