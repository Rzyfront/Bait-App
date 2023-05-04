const { Menu, Dish, Image } = require('../../db');

module.exports = async (req, res) => {
  console.log('aquí');
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId, {
      include: [
        {
          model: Dish,
          include: Image,
        },
      ],
    });
    if (!menu) throw new Error('No se encontró el menu');
    res.status(200).json({ success: true, menu });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
/**
 * @swagger
 * /locals/menu/{menuId}:
 *   get:
 *     summary: Obtiene el menú con el ID especificado y sus respectivos platos.
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del menú a obtener.
 *     responses:
 *       200:
 *         description: Menú y sus platos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación se realizó correctamente.
 *                   example: true
 *                 menu:
 *                   allOf:
 *                       - $ref: '#/components/schemas/Menu'
 *                       - type: object
 *                         properties:
 *                           Dishes:
 *                             type: array
 *                             description: Array de objetos que representan los platos del menú.
 *                             items:
 *                               allOf:
 *                                 - $ref: '#/components/schemas/Dish'
 *                                 - type: object
 *                                   properties:
 *                                     Image:
 *                                       $ref: '#/components/schemas/Image'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
