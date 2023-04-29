const bcrypt = require('bcrypt');
const { User } = require('../../db');
const { sendVerificationEmail } = require('../../config/nodemailer/nodemailer-config');

module.exports = async (req, res) => {
  const {
    name,
    lastname,
    age,
    phone_number,
    email,
    location,
    password,
    image,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      age,
      phone_number,
      email,
      location,
      password: passwordHash,
    });
    await sendVerificationEmail(newUser.id, newUser.email, newUser.name);
    if (image) await newUser.setImage(image.id);
    res
      .status(201)
      .json({ success: true, message: 'Email send' });
  } catch (error) {
    res.status(400).json({ message: `Failed to create user:  ${error.message}`, success: false });
  }
};

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Crea un nuevo usuario.
 *     description: Registra un nuevo usuario utilizando los datos proporcionados.
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               age:
 *                 type: integer
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               location:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: object
 *             example:
 *               name: John
 *               lastname: Doe
 *               age: 25
 *               phone_number: "1234567890"
 *               email: johndoe@example.com
 *               location: New York
 *               password: password123
 *               image: { id: 1 }
 *     responses:
 *       '201':
 *         description: Se ha creado el usuario correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación ha sido exitosa.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje de respuesta.
 *                   example: Email send
 *       '404':
 *         $ref: '#/components/responses/BadRequest'
 */
