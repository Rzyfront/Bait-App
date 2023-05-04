const { User, Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId, localId } = req.body;
    const local = await Local.findByPk(localId);
    const user = await User.findByPk(userId);
    if (!user) throw new Error('No se encontró el usuario');
    if (user.role === 'admin' || user.role === 'superAdmin') throw new Error('El usuario al que se le asigna el local no puede ser administrador o super administrador');
    if (!local) throw new Error('No se encontró el local');
    await local.setUser(user.id);
    local.verified = 'verified';
    await local.save();
    const localData = {
      id: local.id,
      name: local.name,
      location: local.location,
      specialty: local.specialty,
      userId: local.UserId,
    };
    res.status(201).json({ success: true, local: localData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /administrator/assignLocal:
 *  put:
 *    summary: Asignar local a usuario propietario
 *    description: Asigna un local a un usuario propietario y verifica el local. Se requiere un token de autenticación con el rol de "admin" para acceder a esta ruta.
 *    tags: [Administrador]
 *    parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *        required: true
 *        description: Token de autenticación JWT.
 *    requestBody:
 *      description: Datos necesarios para asignar un local a un usuario propietario
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: integer
 *                description: ID del usuario propietario
 *              localId:
 *                type: integer
 *                description: ID del local que se desea asignar
 *            example:
 *              userId: 2
 *              localId: 1
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *        description: El local ha sido asignado correctamente al usuario propietario
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la operación fue exitosa
 *                  example: true
 *                local:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: ID del local asignado
 *                      example: 1
 *                    name:
 *                      type: string
 *                      description: Nombre del local
 *                      example: "ROD"
 *                    verified:
 *                      type: string
 *                      description: Estado de verificación del local
 *                      example: "verified"
 *                    email:
 *                      type: string
 *                      description: Email del local
 *                      example: "email@gmail.com"
 *                    location:
 *                      type: string
 *                      description: Ubicación del local
 *                      example: "Buenos Aires"
 *                    specialty:
 *                      type: string
 *                      description: Especialidad del local
 *                      example: "Pisa"
 *                    schedule:
 *                      type: string
 *                      description: Horario de atención del local
 *                      example: "18:00 - 00:00"
 *                    createdAt:
 *                      type: string
 *                      description: Fecha de creación del local
 *                      example: "2023-04-20T16:27:25.562Z"
 *                    updatedAt:
 *                      type: string
 *                      description: Fecha de actualización del local
 *                      example: "2023-04-20T16:27:41.166Z"
 *                    UserId:
 *                      type: integer
 *                      description: ID del usuario propietario del local
 *                      example: 2
 *      400:
 *        description: Ha ocurrido un error al asignar el local al usuario propietario
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la operación fue exitosa
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Descripción del error
 *                  example: "User is not an owner"
 *      401:
 *        description: No se ha proporcionado un token de autenticación o el token no tiene el rol de "admin"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la operación fue exitosa
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Descripción del error
 *                  example: "Unauthorized"
 *
 */
