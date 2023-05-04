const { Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { dishId } = req.params;
    const deleteDish = await Dish.findByPk(dishId);
    if (!deleteDish) throw new Error('El plato no se encontró');
    deleteDish.destroy();
    res.status(201).json({ success: true, dish: deleteDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /dishes/{dishId}:
 *   delete:
 *     summary: Eliminar un plato por su ID
 *     description: Elimina un plato en la base de datos por su ID y retorna el plato eliminado.
 *     tags:
 *       - Dishes
 *     parameters:
 *       - in: path
 *         name: dishId
 *         description: ID del plato a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retorna el plato eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 dish:
 *                  $ref: '#/components/schemas/Dish'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
*/
