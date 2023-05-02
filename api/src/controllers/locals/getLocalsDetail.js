const { fn, col } = require('sequelize');
const {
  Local, Characteristic, Review, Image,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  try {
    const locals = await Local.findByPk(req.local.id, {
      attributes: {
        include: [
          [fn('AVG', col('Reviews.rating')), 'rating'],
          [fn('AVG', col('Reviews.food')), 'avgFood'],
          [fn('AVG', col('Reviews.service')), 'avgService'],
          [fn('AVG', col('Reviews.environment')), 'avgEnvironment'],
          [fn('AVG', col('Reviews.qaPrice')), 'avgQaPrice'],
        ],
        exclude: ['email', 'createdAt', 'updatedAt'],
      },
      include: [{
        model: Characteristic,
        attributes: allCharacteristics,
      },
      {
        model: Review,
        attributes: [],
      },
      { model: Image, attributes: ['url'] }],
      group: ['Local.id', 'Images.id', 'Characteristic.id'],
    });
    res.status(200).json({ locals, success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /locals/{localId}:
 *   get:
 *     summary: Obtiene la información de un local con sus imágenes y características, así como un promedio de las calificaciones de las reseñas que le hicieron a dicho local.
 *     tags: [Local]
 *     parameters:
 *       - in: path
 *         name: localId
 *         description: ID del local a obtener información.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del local obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 locals:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Local'
 *                     - type: object
 *                       properties:
 *                         rating:
 *                           type: number
 *                           description: Promedio de las calificaciones de las reseñas que le hicieron a dicho local.
 *                           example: 3.49329
 *                         avgFood:
 *                           type: string
 *                           description: Promedio de la calificación de la comida del local.
 *                           example: 3.34003429
 *                         avgService:
 *                           type: string
 *                           description: Promedio de la calificación del servicio del local.
 *                           example: 4.30043
 *                         avgEnvironment:
 *                           type: string
 *                           description: Promedio de la calificación del ambiente del local.
 *                           example: 4.49329
 *                         avgQaPrice:
 *                           type: string
 *                           description: Promedio de la calificación de la relación calidad-precio del local.
 *                           example: 2.454
 *                         Characteristic:
 *                           $ref: '#/components/schemas/Characteristic'
 *                         Images:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Image'
 *       400:
 *        $ref: '#/components/responses/BadRequest'
*/
