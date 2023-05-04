const { Review } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByPk(reviewId);
    if (!deletedReview) throw new Error('No se encontró la reseña');
    if (req.userId !== deletedReview.UserId) {
      throw new Error(
        'Sólo el usuario que hizo la reseña o un administrador puede eliminar reseñas',
      );
    }
    if (deletedReview.verified === 'archived') throw new Error('No se puede eliminar una reseña archivada');

    deletedReview.destroy();
    await deletedReview.save();
    return res.status(201).json({ success: true, deletedReview });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: Elimina una reseña.
 *     description: Elimina una reseña en base a su ID, siempre y cuando el usuario que la creó sea quien la está eliminando y la reseña no esté archivada.
 *     tags:
 *       - Review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autorización JWT del cual se obtiene el id del usuario.
 *       - in: path
 *         name: reviewId
 *         description: ID de la reseña a eliminar.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: Reseña eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la reseña fue eliminada correctamente.
 *                 deletedReview:
 *                   $ref: '#/components/schemas/Review'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
