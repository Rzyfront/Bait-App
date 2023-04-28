const { User, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { numPage } = req.params;
    const { where } = req;
    const page = numPage || 1;
    const { count, rows } = await User.findAndCountAll({
      where: where.user ?? {},
      attributes: ['id', 'name', 'lastname', 'age', 'role', 'location', 'phone_number', 'email', 'verified'],
      include: [
        { model: Image, attributes: ['url'] },
      ],
      limit: page * 10,
      offset: (page - 1) * 10,
    });
    const totalPages = Math.ceil(count / 10);
    if (!rows.length) throw new Error('Users not found');
    return res.status(200).json({
      success: true, count, totalPages, users: rows,
    });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /administrator:
 *   get:
 *     summary: Retorna todos los usuarios de la DB paginados de a 10.
 *     description: Este endpoint retorna todos los usuarios de la DB paginados de a 10. Se requiere un token de autenticación en el header, el cual debe contener una propiedad `role` con valor "admin" en su payload decodificado. Opcionalmente, se pueden enviar parámetros de query para filtrar la lista de usuarios por `role` y `email`.
 *     tags: [Administrador]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación JWT.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [user, owner, admin]
 *         description: Filtrar la lista de usuarios por rol.
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtrar la lista de usuarios por correo electrónico.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Retorna todos los usuarios de la DB paginados de a 10.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                 count:
 *                   type: integer
 *                   description: Cantidad de usuarios que se están retornando en esta respuesta.
 *                 totalPages:
 *                   type: integer
 *                   description: Cantidad total de páginas que se pueden obtener para estos usuarios.
 *                 users:
 *                   type: array
 *                   description: Lista de usuarios que coinciden con la consulta.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del usuario.
 *                       name:
 *                         type: string
 *                         description: Nombre del usuario.
 *                       lastname:
 *                         type: string
 *                         description: Apellido del usuario.
 *                       age:
 *                         type: integer
 *                         description: Edad del usuario.
 *                       role:
 *                         type: string
 *                         description: Rol del usuario.
 *                       location:
 *                         type: string
 *                         description: Ubicación del usuario.
 *                       phone_number:
 *                         type: string
 *                         description: Número de teléfono del usuario.
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del usuario.
 *                       Image:
 *                         type: object
 *                         description: Imagen del usuario.
 *                         properties:
 *                           url:
 *                             type: string
 *                             description: URL de la imagen en formato Base64.
 *       401:
 *         description: No se proporcionó el token de autorización o el usuario no tiene permisos de administrador.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /administrator/page/{numPage}:
 *   get:
 *     summary: Retorna todos los usuarios de la DB paginados de a 10.
 *     description: Este endpoint retorna todos los usuarios de la DB paginados de a 10. Para acceder a él es necesario estar autenticado como administrador y enviar un JWT en el header de la solicitud que contenga un payload con una propiedad "role" cuyo valor sea "admin". Además, se pueden enviar opcionalmente parámetros de query para filtrar por role y email. El número de página se recibe por parámetro en la ruta.
 *     tags: [Administrador]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación JWT.
 *       - in: path
 *         name: numPage
 *         required: true
 *         description: El número de página que se desea obtener.
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: role
 *         description: El rol de los usuarios que se quieren filtrar.
 *         schema:
 *           type: string
 *           enum: [user, owner, admin]
 *       - in: query
 *         name: email
 *         description: El correo electrónico de los usuarios que se quieren filtrar.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Retorna todos los usuarios de la DB paginados de a 10.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                 count:
 *                   type: integer
 *                   description: Cantidad de usuarios que se están retornando en esta respuesta.
 *                 totalPages:
 *                   type: integer
 *                   description: Cantidad total de páginas que se pueden obtener para estos usuarios.
 *                 users:
 *                   type: array
 *                   description: Lista de usuarios que coinciden con la consulta.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID del usuario.
 *                       name:
 *                         type: string
 *                         description: Nombre del usuario.
 *                       lastname:
 *                         type: string
 *                         description: Apellido del usuario.
 *                       age:
 *                         type: integer
 *                         description: Edad del usuario.
 *                       role:
 *                         type: string
 *                         description: Rol del usuario.
 *                       location:
 *                         type: string
 *                         description: Ubicación del usuario.
 *                       phone_number:
 *                         type: string
 *                         description: Número de teléfono del usuario.
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del usuario.
 *                       Image:
 *                         type: string
 *                         description: Imagen del usuario (en formato Base64).
 *               example:
 *                 success: true
 *                 count: 10
 *                 totalPages: 5
 *                 users:
 *                   - id: 10
 *                     name: Franco
 *                     lastname: Gutierrez
 *                     age: 21
 *                     role: user
 *                     location: Chaco
 *                     phone_number: 1234
 *                     email: franco_forex@hotmail.com
 *                     Image: { url: "https://example.com/image.jpg" }
 *       401:
 *         description: No se proporcionó el token de autorización o el usuario no tiene permisos de administrador.
 *       500:
 *         description: Error interno del servidor.
 */
