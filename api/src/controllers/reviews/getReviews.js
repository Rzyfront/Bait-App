const {
  Review, Image, User, Local,
} = require('../../db');

module.exports = async (req, res) => {
  try {
    const { count, rows } = await Review.findAndCountAll({
      where: req.where,
      include: [{
        model: User,
        attributes: ['name', 'lastname', 'id', 'email', 'role', 'age'],
        include: [{ model: Image, attributes: ['url'] }],
      }, { model: Image, attributes: ['url'] },
      { model: Local, attributes: ['name', 'id'] },
      ],
      limit: 10,
      offset: (req.page - 1) * 10,
    });

    const totalPages = Math.ceil(count / 10);
    return res.status(200).json({
      totalPages, count, success: true, reviews: rows,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};
/**
 * @swagger
 * /administrator/reviews:
 *   get:
 *     summary: Retorna todas las reviews de la DB paginadas de a 10.
 *     description: Este endpoint retorna todas las reviews de la DB paginadas de a 10. Para acceder a él es necesario estar autenticado como administrador y enviar un JWT en el header de la solicitud que contenga un payload con una propiedad "role" cuyo valor sea "admin". Además, se pueden enviar opcionalmente parámetros de query para filtrar por verified y page.
 *     tags: [Administrador]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación JWT.
 *       - in: query
 *         name: verified
 *         description: Indica el estado de verificación de las reviews que se quieren filtrar.
 *         schema:
 *           type: string
 *           enum: [verified, unVerified, archived]
 *           default: verified
 *       - in: query
 *         name: page
 *         description: El número de página que se desea obtener.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Retorna todas las reviews de la DB paginadas de a 10.
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
 *                   description: Cantidad de reviews que se están retornando en esta respuesta.
 *                 totalPages:
 *                   type: integer
 *                   description: Cantidad total de páginas que se pueden obtener para estas reviews.
 *                 reviews:
 *                   type: array
 *                   description: Lista de reviews que coinciden con la consulta.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la review.
 *                       title:
 *                         type: string
 *                         description: Título de la review.
 *                       comment:
 *                         type: string
 *                         description: Comentario de la review.
 *                       verified:
 *                         type: string
 *                         description: Estado de verificación de la review.
 *                       food:
 *                         type: integer
 *                         description: Puntuación de la comida.
 *                       service:
 *                         type: integer
 *                         description: Puntuación del servicio.
 *                       environment:
 *                         type: integer
 *                         description: Puntuación del ambiente.
 *                       qaPrice:
 *                         type: integer
 *                         description: Puntuación calidad/precio.
 *                       rating:
 *                         type: number
 *                         description: Puntuación general de la review.
 *                       toxicity:
 *                         type: number
 *                         description: Toxicidad del comentario de la review.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de creación de la review.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de última actualización de la review.
 *                       LocalId:
 *                         type: integer
 *                         description: ID del local asociado a la review.
 *                       UserId:
 *                         type: integer
 *                         description: ID del usuario que creó la review.
 *                       User:
 *                         type: object
 *                         description: Objeto que representa al usuario que creó la review.
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del usuario.
 *                           name:
 *                             type: string
 *                             description: Nombre del usuario.
 *                           lastname:
 *                             type: string
 *                             description: Apellido del usuario.
 *                           Image:
 *                             type: object
 *                             description: Objeto que representa la imagen de perfil del usuario.
 *                             properties:
 *                               url:
 *                                 type: string
 *                                 description: URL de la imagen de perfil del usuario.
 *                       Image:
 *                         type: object
 *                         description: Objeto que representa la imagen asociada a la review.
 *                         properties:
 *                           url:
 *                             type: string
 *                             description: URL de la imagen asociada a la review.
 *                       Local:
 *                         type: object
 *                         description: Objeto que representa el lcoal asociado a la review.
 *                         properties:
 *                           name:
 *                             type: string
 *                             description: Nombre del local asociado a la review.
 *                           id:
 *                             type: number
 *                             description: ID del local asociado a la review.
 *                   example:
 *                    success: true
 *                    count: 76
 *                    totalPages: 8
 *                    reviews:
 *                      - id: 7
 *                        title: se puede comer
 *                        comment: aceptable
 *                        verified: unVerified
 *                        food: 1
 *                        service: 1
 *                        environment: 3
 *                        qaPrice: 4
 *                        rating: 2.25
 *                        toxicity: 0.120304
 *                        createdAt: '2023-04-21T17:58:39.860Z'
 *                        updatedAt: '2023-04-21T17:58:39.870Z'
 *                        LocalId: 1
 *                        UserId: 1
 *                        User:
 *                          name: Franco
 *                          lastname: Gutierrez
 *                          id: 1
 *                          Image: { url: "https://example.com/image.jpg" }
 *                        Image: { url: "https://example.com/image.jpg" }
 *                        Local: { name: "Mc Donals", id: 1 }
 *       401:
 *         description: No se proporcionó el token de autorización o el usuario no tiene permisos de administrador.
 *       500:
 *         description: Error interno del servidor.
 */
