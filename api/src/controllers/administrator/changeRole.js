const { User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    if (!role) throw new Error('Se debe enviar un rol');
    if (role === 'admin') throw new Error('No puedes cambiar el rol a admin, contacta con un superAdmin');

    const updateUser = await User.findByPk(userId);
    if (!updateUser) throw new Error('Usuario no encontrado');
    updateUser.role = role;
    await updateUser.save();
    const user = {
      id: updateUser.id,
      role: updateUser.role,
      verified: updateUser.verified,
    };
    return res.status(201).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ message: err.message, success: false });
  }
};
/**
 * Actualiza el rol de un usuario existente.
 * Se requiere el token de autenticación con el rol de "admin" para poder realizar esta acción.
 *
 * @swagger
 * /administrator/role/{userId}:
 *    patch:
 *      summary: Actualizar el role de un usuario
 *      description: Este endpoint permite actualizar el role de un usuario específico. Solo se permite a los usuarios con el role de admin y el token debe ser válido.
 *      tags: [Administrador]
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          required: true
 *          description: Token de autenticación JWT.
 *        - in: path
 *          name: userId
 *          required: true
 *          description: ID del usuario que se desea actualizar
 *          schema:
 *            type: integer
 *            minimum: 1
 *        - in: body
 *          name: role
 *          required: true
 *          description: Nuevo role del usuario
 *          schema:
 *            type: object
 *            properties:
 *              role:
 *                type: string
 *                enum: [user, owner]
 *                description: Nuevo role para asignar al usuario (user, admin u owner)
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "201":
 *          description: OK - Se actualizó el role del usuario
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    description: Indica si la actualización fue exitosa
 *                  updateUser:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        description: ID del usuario actualizado
 *                        example: 2
 *                      name:
 *                        type: string
 *                        description: Nombre del usuario actualizado
 *                        example: Franco
 *                      lastname:
 *                        type: string
 *                        description: Apellido del usuario actualizado
 *                        example: Gutierrez
 *                      age:
 *                        type: integer
 *                        description: Edad del usuario actualizado
 *                        example: 21
 *                      phone_number:
 *                        type: string
 *                        description: Número de teléfono del usuario actualizado
 *                        example: "3442"
 *                      email:
 *                        type: string
 *                        description: Correo electrónico del usuario actualizado
 *                        example: fr@hoaasdil.com
 *                      password:
 *                        type: string
 *                        description: Contraseña del usuario actualizado (no se muestra por seguridad)
 *                      location:
 *                        type: string
 *                        description: Ubicación del usuario actualizado
 *                        example: Chaco
 *                      verified:
 *                        type: string
 *                        enum: [verified, unverified]
 *                        description: Estado de verificación del usuario actualizado
 *                        example: verified
 *                      isActive:
 *                        type: boolean
 *                        description: Indica si el usuario actualizado está activo o no
 *                        example: true
 *                      role:
 *                        type: string
 *                        enum: [user, admin, owner]
 *                        description: Nuevo role asignado al usuario actualizado
 *                        example: owner
 *                      isGoogleUser:
 *                        type: boolean
 *                        description: Indica si el usuario actualizado se registró con una cuenta de Google
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        description: Fecha de creación del usuario actualizado
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                        description: Fecha de última actualización del usuario actualizado
 *        "400":
 *          description: Bad Request - No se pudo actualizar el role del usuario
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    description: Mensaje de error que indica el problema encontrado
 *                    example: User not found
 *                  success:
 *                    type: boolean
 *                    description: Indica si la actualización fue exitosa o no
 *                    example: false
 */
