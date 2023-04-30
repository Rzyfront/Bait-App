const { Menu, Dish, Image } = require('../../db');

module.exports = async (req, res) => {
  const { localId } = req.params;
  try {
    const menu = await Menu.findAll({
      where: { LocalId: localId },
      include: [
        {
          model: Dish,
          include: [{ model: Image, attributes: ['url'] }],
        }],
    });
    // if (!menu) throw new Error('Menu not found');
    res.status(200).json({ success: true, menu });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
/**
 * @swagger
 * /locals/{localId}/menu:
 *   get:
 *     summary: Retorna todos los menus que están vinculados al local con el id recibido por parámetros.
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: localId
 *         required: true
 *         description: ID del local del que se quiere obtener el menú.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menús encontrados para el local especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación se realizó exitosamente.
 *                 menu:
 *                   type: array
 *                   description: Array de objetos que representan los menús encontrados.
 *                   items:
 *                     allOf:
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
