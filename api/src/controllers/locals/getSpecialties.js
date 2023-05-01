const { fn, col } = require('sequelize');
const { Local } = require('../../db');

module.exports = async (req, res) => {
  try {
    const allSpecialties = await Local.findAll({
      attributes: [[fn('DISTINCT', col('specialty')), 'specialty']],
    });
    res.status(200).json({ suceess: true, allSpecialties });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};
/**
 * @swagger
 * /locals/specialties:
 *   get:
 *     summary: Obtiene todas las especialidades de los locales.
 *     description: Este endpoint devuelve todas las especialidades de los locales en la base de datos.
 *     tags: [Local]
 *     responses:
 *       200:
 *         description: Petición exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la petición se realizó correctamente.
 *                   example: true
 *                 allSpecialties:
 *                   type: array
 *                   description: Lista de todas las especialidades de los locales.
 *                   items:
 *                     type: object
 *                     properties:
 *                       specialty:
 *                         type: string
 *                         description: Especialidad de un local.
 *                         example: pan
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
