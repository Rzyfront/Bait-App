const { Dish, Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findByPk(dishId, {
      include: [
        { model: Image, attributes: ['url', 'id'] },
      ],
    });

    res.status(201).json({ success: true, dish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /dishes/{dishId}:
 *   get:
 *     summary: Obtener un plato por su ID.
 *     description: Devuelve la información de un plato en particular a través de su ID.
 *     tags:
 *       - Dishes
 *     parameters:
 *       - in: path
 *         name: dishId
 *         required: true
 *         description: ID del plato a obtener.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 dish:
 *                  allOf:
 *                   - $ref: '#/components/schemas/Dish'
 *                   - properties:
 *                       Image:
 *                         $ref: '#/components/schemas/Image'
 *                       Menu:
 *                         $ref: '#/components/schemas/Menu'
 */
