const { Menu, Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { type } = req.body;
    const { localId } = req.params;
    const local = await Local.findByPk(localId);
    const newMenu = await Menu.create({ type });
    await local.addMenu(newMenu.id);
    res.status(201).json({ success: true, menu: newMenu });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
};

/**
 * @swagger
 * /locals/{localId}/menu:
 *   post:
 *     summary: Crea un nuevo menú para un local específico.
 *     description: Crea un nuevo menú con el tipo que llega en el body y lo asocia con el local con el ID que llega en los parámetros. Se requiere un token de autenticación con la propiedad "role" establecida en "owner", "admin" o "superAdmin" en la cabecera de autorización.
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: localId
 *         required: true
 *         description: ID del local al que se le asignará el menú.
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Token de autenticación con la propiedad "role" establecida en "owner", "admin" o "superAdmin".
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Tipo del menú a crear.
 *         schema:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *     responses:
 *       '201':
 *         description: Menú creado con éxito y asignado al local.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la solicitud fue exitosa o no.
 *                   example: true
 *                 local:
 *                   $ref: '#/components/schemas/Local'
 *                 menu:
 *                   $ref: '#/components/schemas/Menu'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '401':
 *         $ref: '#/components/responses/Unauthorized'
 */
