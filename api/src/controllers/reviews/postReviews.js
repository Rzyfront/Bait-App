const { Review, Local } = require('../../db');

module.exports = async (req, res) => {
  const {
    title, comment, food, image, environment, service, qaPrice, ticket,
  } = req.body;
  const { localId } = req.params;
  const { userId, toxicity } = req;
  try {
    const local = await Local.findByPk(localId);
    if (!local) throw new Error('Local not found');

    const rating = (food + environment + service + qaPrice) / 4;
    const newReview = await Review.create({
      title, comment, food, environment, service, qaPrice, rating, verified: 'unVerified', toxicity,
    });
    await local.addReview(newReview.id);
    await newReview.setUser(userId);
    await newReview.setImage(image.id);
    await newReview.setTicket(ticket.id);
    await newReview.save();
    return res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
/**
 * @swagger
 * /reviews/{localId}:
 *   post:
 *     summary: Crea una nueva reseña y la asigna a un local específico.
 *     description: Se crea una nueva reseña y se la asigna a un local específico a través del ID proporcionado en los parámetros de la solicitud. La API de Perspective se utiliza para analizar el comentario y se agrega el nivel de toxicidad al campo "toxicity" de la reseña.
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
 *         name: localId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del local al que se le asignará la reseña.
 *       - in: body
 *         name: body
 *         description: Campos necesarios para crear una nueva reseña.
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
 *       201:
 *         description: Se crea la nueva reseña y se devuelve en la respuesta.
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
 *        $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
*/
