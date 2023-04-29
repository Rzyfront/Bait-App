const { Menu, Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { image, ...dish } = req.dish;
    const { menuId } = req.params;

    const menu = await Menu.findByPk(menuId);
    const newDish = await Dish.create(dish);

    await menu.addDish(newDish.id);
    await newDish.setImage(image.id);
    await newDish.save();
    res.status(201).json({ success: true, dish: newDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /dishes/{menuId}:
 *   post:
 *     summary: Añadir un nuevo plato a un menú.
 *     description: Añade un nuevo plato a un menú específico.
 *     tags: [Dishes]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         description: ID del menú al que se va a añadir el plato.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Objeto que representa el plato a añadir.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del plato.
 *                 example: Milanesa a la napo extra
 *               type:
 *                 type: string
 *                 description: Tipo de plato.
 *                 example: milanesa
 *               price:
 *                 type: number
 *                 description: Precio del plato.
 *                 example: 300
 *               description:
 *                 type: string
 *                 description: Descripción del plato.
 *                 example: Una milanesa hno
 *               image:
 *                 type: object
 *                 description: Imagen del plato.
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la imagen.
 *                     example: 2
 *                   url:
 *                     type: string
 *                     description: URL de la imagen.
 *                     example: https://asdasd
 *     responses:
 *       201:
 *         description: Plato añadido con éxito al menú.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 dish:
 *                   type: object
 *                   description: Objeto que representa el plato añadido.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del plato.
 *                       example: 6
 *                     name:
 *                       type: string
 *                       description: Nombre del plato.
 *                       example: Milanesa a la napo extra
 *                     type:
 *                       type: string
 *                       description: Tipo de plato.
 *                       example: milanesa
 *                     price:
 *                       type: number
 *                       description: Precio del plato.
 *                       example: 300
 *                     description:
 *                       type: string
 *                       description: Descripción del plato.
 *                       example: Una milanesa hno
 *                     MenuId:
 *                       type: integer
 *                       description: ID del menú al que se añadió el plato.
 *                       example: 1
 *       400:
 *         description: No se pudo añadir el plato al menú.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Name is required
 *       404:
 *         description: No se encontró el menú especificado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: No se encontró el menú especificado. Verifique que el ID del menú sea correcto.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: Error interno del servidor. Por favor, inténtelo de nuevo más tarde.
 */
