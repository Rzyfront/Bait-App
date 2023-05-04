const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req; // se envia por token el Id para obtener el registro a modificar
    const {
      name,
      lastname,
      age,
      phone_number,
      location,
      image,
    } = req.body; // se envia un objeto con las modificaciones desde el front

    const updateUser = await User.findByPk(userId);

    updateUser.name = name;
    updateUser.lastname = lastname;
    updateUser.age = age;
    updateUser.phone_number = phone_number;
    updateUser.location = location;
    if (image && image.id) await updateUser.setImage(image.id);
    await updateUser.save();

    const user = {
      id: updateUser.id,
      name: updateUser.name,
      lastname: updateUser.lastname,
      age: updateUser.age,
      location: updateUser.location,
      phone_number: updateUser.phone_number,
      email: updateUser.email,
    };

    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Modificar información del usuario
 *     description: Permite modificar la información de un usuario autenticado.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación JWT.
 *     requestBody:
 *       description: Objeto con los campos a modificar.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario.
 *               lastname:
 *                 type: string
 *                 description: Nuevo apellido del usuario.
 *               age:
 *                 type: integer
 *                 description: Nueva edad del usuario.
 *               phone_number:
 *                 type: string
 *                 description: Nuevo número de teléfono del usuario.
 *               location:
 *                 type: string
 *                 description: Nueva ubicación del usuario.
 *               image:
 *                 type: object
 *                 description: Nueva imagen de perfil del usuario.
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Id de la imagen del usuario.
 *     responses:
 *       '201':
 *         description: Modificación exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                   description: Objeto con los datos del usuario modificado.
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */
