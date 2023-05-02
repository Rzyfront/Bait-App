const { Document, Local, User } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { page } = req.query;
    const numPage = page || 1;
    const { count, rows } = await Local.findAndCountAll({
      where: {
        verified: 'unVerified',
      },
      include: [
        {
          model: Document,
          attributes: ['id', 'archive'],
          required: true,
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
      limit: 10,
      offset: (numPage - 1) * 10,
    });
    const totalPages = Math.ceil(count / 10);
    res.status(200).json({
      success: true, count, totalPages, locals: rows,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /administrator/toVerified:
 *   get:
 *     summary: Obtener locales no verificados con documento para revisar
 *     description: Retorna una lista de locales que no han sido verificados y tienen documento para revisar, paginados de a 10.
 *     tags: [Administrador]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página a obtener (por defecto es 1).
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Token JWT con role de admin o superAdmin.
 *     responses:
 *       200:
 *         description: Lista de locales no verificados con documento para revisar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Cantidad total de locales no verificados con documento para revisar.
 *                   example: 2
 *                 totalPages:
 *                   type: integer
 *                   description: Cantidad total de páginas de la lista.
 *                   example: 1
 *                 locals:
 *                   type: array
 *                   description: Lista de locales no verificados con documento para revisar.
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Local'
 *                       - type: object
 *                         properties:
 *                           Document:
 *                             $ref: '#/components/schemas/Document'
 *                           User:
 *                             $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
*/
