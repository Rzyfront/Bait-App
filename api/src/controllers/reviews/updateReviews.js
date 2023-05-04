const { Review } = require('../../db');

module.exports = async (req, res) => {
  const { reviewId } = req.params;
  const { userId, toxicity } = req;
  const {
    title, comment, image, food, environment, service, qaPrice, ticket,
  } = req.body;
  try {
    const updReview = await Review.findByPk(reviewId);
    if (userId !== updReview.UserId) throw new Error('Solo el usuario que realizó la review puede modificarla');
    if (updReview.verified === 'archived') throw new Error('No se puede modificar una reseña archivada');
    const rating = (food + environment + service + qaPrice) / 4;
    // Update the review with the new information
    await updReview.update({
      title, comment, food, environment, service, qaPrice, rating, verified: 'unVerified', toxicity,
    });
    await updReview.setImage(image.id);
    if (ticket) await updReview.setTicket(ticket.id);
    return res.status(200).json({ success: true, review: updReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
/**
 * @swagger
 * /reviews/{reviewId}:
 *   put:
 *     summary: Actualiza una reseña existente.
 *     description: Actualiza la información de una reseña existente. Se requiere autenticación y verificación del usuario que la hizo. La toxicidad del comentario es analizada por la API de Perspective y se agrega en la propiedad 'toxicity'. No se pueden modificar reseñas archivadas.
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         description: ID de la reseña a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: header
 *         name: Authorization
 *         description: Token de autenticación del usuario.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Nueva información de la reseña.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: Título de la reseña.
 *               example: Nice
 *             comment:
 *               type: string
 *               description: Comentario de la reseña.
 *               example: Bastante aceptable
 *             food:
 *               type: integer
 *               description: Calificación de comida de la reseña (1-5).
 *               example: 3
 *             environment:
 *               type: integer
 *               description: Calificación de ambiente de la reseña (1-5).
 *               example: 4
 *             service:
 *               type: integer
 *               description: Calificación de servicio de la reseña (1-5).
 *               example: 5
 *             qaPrice:
 *               type: integer
 *               description: Calificación de calidad-precio de la reseña (1-5).
 *               example: 2
 *             image:
 *               type: object
 *               description: Objeto que contiene el ID y la URL de la imagen de la reseña.
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la imagen.
 *                   example: 1
 *                 url:
 *                   type: string
 *                   description: URL de la imagen.
 *                   example: 'http://asd.com/images.jpg'
 *             ticket:
 *               type: object
 *               description: Objeto que contiene el ID y la URL del ticket de la reseña.
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del ticket.
 *                   example: 2
 *                 url:
 *                   type: string
 *                   description: URL del ticket.
 *                   example: 'http://asd.com/images.jpg'
 *     responses:
 *       200:
 *         description: La reseña ha sido actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud se completó con éxito.
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
