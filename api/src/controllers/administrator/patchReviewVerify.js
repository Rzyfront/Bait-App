const { sendNotificationThatReviewWasVerified, sendReviewRejected } = require('../../config/nodemailer/nodemailer-config');
const { Review, User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { verified, reason } = req.query;
    const review = await Review.findByPk(reviewId, {
      attributes: ['title', 'comment', 'id'],
      include: [{ model: User, attributes: ['name', 'email', 'id'] }],
    });
    if (!review) throw new Error('No se encotró la reseña');
    if (review.UserId === req.userId) throw new Error('No puede verificar una reseña realizada por usted');
    review.verified = verified ?? 'verified';
    if (!verified || verified === 'verified') {
      await sendNotificationThatReviewWasVerified({
        userName: review.User.name,
        userEmail: review.User.email,
        reviewTitle: review.title,
      });
    } else if (verified === 'archived') {
      await sendReviewRejected(
        review.User.email,
        review.User.name,
        review.title,
        review.comment,
        reason,
      );
    }
    await review.save();
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /administator/review/{reviewId}:
 *   patch:
 *     summary: Verifica una reseña existente.
 *     description: Este endpoint verifica una reseña existente. Para acceder a él es necesario estar autenticado como admin y enviar un JWT en el header de la solicitud que contenga un payload con una propiedad "role" cuyo valor sea "admin".
 *     tags: [Administrador]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autenticación JWT.
 *       - in: path
 *         name: reviewId
 *         description: ID de la reseña a verificar.
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: verified
 *         description: Indica si la reseña está verificada o no. Si no se proporciona, se considera que la reseña está verificada.
 *         required: false
 *         schema:
 *           type: string
 *           enum: [verified, unverified, archived]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '201':
 *         description: Respuesta exitosa. Retorna un objeto indicando que la operación se realizó con éxito y la reseña actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                 review:
 *                   type: object
 *                   description: Objeto que representa la reseña actualizada.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la reseña.
 *                     title:
 *                       type: string
 *                       description: Título de la reseña.
 *                     comment:
 *                       type: string
 *                       description: Comentario de la reseña.
 *                     verified:
 *                       type: string
 *                       description: Indica si la reseña está verificada o no.
 *                     food:
 *                       type: integer
 *                       description: Puntuación de la comida de la reseña.
 *                     service:
 *                       type: integer
 *                       description: Puntuación del servicio de la reseña.
 *                     environment:
 *                       type: integer
 *                       description: Puntuación del ambiente de la reseña.
 *                     qaPrice:
 *                       type: integer
 *                       description: Puntuación de la relación calidad-precio de la reseña.
 *                     rating:
 *                       type: number
 *                       description: Puntuación promedio de la reseña.
 *                     toxicity:
 *                       type: number
 *                       description: Nivel de toxicidad de la reseña.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación de la reseña.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de actualización de la reseña.
 *                     LocalId:
 *                       type: integer
 *                       description: ID del local al que se refiere la reseña.
 *                     UserId:
 *                       type: integer
 *                       description: ID del usuario que realizó la reseña.
 *                   example:
 *                     success: true
 *                     id: 86
 *                     title: se puede comer
 *                     comment: hijo de puta
 *                     verified: verified
 *                     food: 5
 *                     service: 2
 *                     environment: 5
 *                     qaPrice: 4
 *                     rating: 4
 *                     toxicity: 0.9209984
 *                     createdAt: "2023-04-26T16:41:56.308Z"
 *                     updatedAt: "2023-04-26T23:08:48.348Z"
 *                     LocalId: 1
 *                     UserId: 1
 */
