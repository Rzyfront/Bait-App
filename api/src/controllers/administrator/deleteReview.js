const { sendReviewRejected } = require('../../config/nodemailer/nodemailer-config');
const { Review, User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reason } = req.query;
    const { reviewId } = req.params;
    const deletedReview = await Review.findByPk(reviewId, {
      attributes: ['title', 'comment', 'id'],
      include: [{ model: User, attributes: ['name', 'email', 'id'] }],
    });
    if (!deletedReview) throw new Error('No se encotró la reseña');
    deletedReview.verified = 'archived';
    await deletedReview.save();
    await sendReviewRejected(
      deletedReview.User.email,
      deletedReview.User.name,
      deletedReview.title,
      deletedReview.comment,
      reason,
    );
    return res.status(201).json({ success: true, review: deletedReview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * @swagger
 * /administator/review/{reviewId}:
 *   delete:
 *     summary: Archiva una reseña y envía un email al usuario que la escribió indicando la razón por la que fue eliminada
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
 *         required: true
 *         description: ID de la reseña a archivar
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: reason
 *         required: true
 *         description: Razón por la que se está archivando la reseña
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Se ha archivado correctamente la reseña y se ha enviado un email al usuario que la escribió
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 85
 *                     title:
 *                       type: string
 *                       example: "se puede comer"
 *                     comment:
 *                       type: string
 *                       example: "hijo de puta"
 *                     verified:
 *                       type: string
 *                       example: "archived"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-04-27T00:49:01.539Z"
 *                     User:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Franco"
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: "francoegi01@gmail.com"
 *                     Image:
 *                       type: object
 *                       properties:
 *                         url:
 *                           type: string
 *                           example: "https://example.com/image.jpg"
 *                           nullable: true
 *       400:
 *         description: No se ha podido archivar la reseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Review not found"
 */
