const { Op } = require('sequelize');
const { Local } = require('../../db');

module.exports = async (req, res) => {
  const { name } = req.query;
  try {
    const allLocalsName = await Local.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      attributes: ['name'],
    });
    // const data = locals.map((el) => el.name);
    res.status(200).json({
      success: true, allLocalsName,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /locals/search-by-name:
 *   get:
 *     summary: Busca locales por nombre
 *     description: Obtiene los nombres de los locales que coinciden con el valor proporcionado en el parámetro de consulta "name".
 *     tags: [Local]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del local a buscar (puede ser una coincidencia parcial)
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve un array de objetos que contienen el nombre de los locales que coinciden con el filtro de búsqueda.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la petición fue exitosa.
 *                 allLocalsName:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Nombre del local.
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
