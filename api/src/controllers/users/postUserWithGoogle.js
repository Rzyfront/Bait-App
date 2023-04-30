const jwt = require('jsonwebtoken');
const { User, Image } = require('../../db');
const { sendVerificationEmail } = require('../../config/nodemailer/nodemailer-config');

module.exports = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phoneNumber, photoURL, emailVerified,
    } = req.body;
    const image = await Image.create({ url: photoURL });
    const googleUser = await User.create({
      name: firstName,
      lastname: lastName,
      email,
      verified: emailVerified ? 'verified' : 'unVerified',
      phone_number: phoneNumber,
      password: process.env.GOOGLE_USERS_PASSWORD,
      isGoogleUser: true,
    });
    googleUser.setImage(image.id);

    if (emailVerified) {
      const token = jwt.sign({
        email: googleUser.email,
        id: googleUser.id,
        role: googleUser.role,
        verified: googleUser.verified,
      }, process.env.SECRET_KEY);
      return res.status(201).json({ success: true, token });
    }
    sendVerificationEmail(googleUser.id, email);
    return res.status(201).json({ success: true, message: 'Email send' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

/**
* @swagger
* /user/google:
*   post:
*     summary: Registro de usuario a través de Google
*     description: Registra un nuevo usuario utilizando las credenciales de Google.
*     tags:
*       - User
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         description: Objeto con los datos del usuario.
*         required: true
*         schema:
*           type: object
*           properties:
*             firstName:
*               type: string
*               description: Nombre del usuario.
*               example: John
*             lastName:
*               type: string
*               description: Apellido del usuario.
*               example: Doe
*             email:
*               type: string
*               description: Correo electrónico del usuario.
*               example: johndoe@gmail.com
*             phoneNumber:
*               type: string
*               description: Número de teléfono del usuario.
*               example: 1234567890
*             photoURL:
*               type: string
*               description: URL de la foto de perfil del usuario.
*               example: https://example.com/image.jpg
*             emailVerified:
*               type: boolean
*               description: Indica si la dirección de correo electrónico del usuario ha sido verificada.
*               example: true
*         examples:
*           userData:
*             value:
*               firstName: John
*               lastName: Doe
*               email: johndoe@gmail.com
*               phoneNumber: 1234567890
*               photoURL: https://example.com/image.jpg
*               emailVerified: true
*     responses:
*       201:
*         description: Usuario registrado correctamente.
*         schema:
*           type: object
*           properties:
*             success:
*               type: boolean
*               example: true
*             token:
*               type: string
*               description: Token JWT generado para el usuario registrado.
*               format: uuid
*               example: "eyJhbGciOiJIUzI6IkpXVCJ9.eyJlbWFpbCmNvbSIsImlkIjoxLVkIjoidmVyQiyMTIyMzN9.DMINZmDOOuD6Q2q-5KZsM4XVE"
*       400:
*         $ref: '#/components/responses/BadRequest'
*/
