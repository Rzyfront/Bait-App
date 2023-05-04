const { Menu } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { menuId } = req.params;
    const menu = await Menu.findByPk(menuId);
    if (!menu) throw new Error('No se encotró el menú');
    await menu.destroy();
    res.status(201).json({ success: true, message: 'El menú ha sido eliminado con éxito' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
/**
 * @swagger
 *
 * /locals/menu/{menuId}:
 *   delete:
 *     summary: Elimina un menú por su ID
 *     description: Elimina un menú con el ID especificado en la base de datos. Para realizar esta acción, se requiere un token de autenticación JWT con una propiedad "role" establecida como "owner", "admin" o "superAdmin".
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
 *         schema:
 *           type: integer
 *           description: ID del menú a eliminar
 *         required: true
 *         description: El ID del menú que se va a eliminar
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           description: Token de autenticación JWT con propiedad "role" establecida como "owner", "admin" o "superAdmin"
 *         required: true
 *         description: Token de autenticación JWT con propiedad "role" establecida como "owner", "admin" o "superAdmin"
 *     responses:
 *       '201':
 *         description: Menú eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la eliminación del menú fue exitosa o no
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Mensaje con información adicional sobre la eliminación del menú
 *                   example: "Menú eliminado correctamente"
 *       '401':
 *         description: El usuario no está autorizado para realizar esta acción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la eliminación del menú fue exitosa o no
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica que el usuario no está autorizado para realizar esta acción
 *                   example: "No está autorizado para realizar esta acción"
 *       '404':
 *         description: No se encontró el menú especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la eliminación del menú fue exitosa o no
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica que el menú no fue encontrado
 *                   example: "Menú no encontrado"
 *       '500':
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la eliminación del menú fue exitosa o no
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error que indica un error interno del servidor
 *                   example: "Error interno del servidor"
 */
