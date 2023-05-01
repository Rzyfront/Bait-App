const { fn, col } = require('sequelize');
const {
  Local, Characteristic, Image, Review, Menu,
} = require('../../db');
const { allCharacteristics } = require('../../helpers/allCharacteristics');

module.exports = async (req, res) => {
  const { numPage } = req.params;
  const page = numPage || 1;
  try {
    const { count, rows } = await Local.findAndCountAll({
      where: req.where,
      include: [
        {
          model: Characteristic,
          attributes: allCharacteristics,
          where: req.characteristics,
        },
        {
          model: Image,
          attributes: ['url'],
        },
        {
          model: Review,
          attributes: [],
          where: { verified: 'verified' },
          required: false,
        },
        {
          model: Menu,
          attributes: [],
          where: req.menu,
          required: !!req.menu.type,
        },
      ],
      attributes: ['id', [fn('AVG', col('Reviews.rating')), 'rating'], 'name', 'location', 'specialty', 'verified', 'schedule', 'UserId', 'lat', 'lng'],
      order: req.order,
      limit: 10,
      offset: (page - 1) * 10,
      group: ['Local.id', 'Images.id', 'Characteristic.id'],
      subQuery: false,
    });
    const totalPages = Math.ceil((count.length - 1) / 10);
    res.status(200).json({
      success: true, count: count.length - 1, totalPages, locals: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /locals/page/{numPage}:
 *   get:
 *     summary: Retorna los locales paginados de a 10 con sus imágenes y características
 *     description: Este endpoint devuelve una lista paginada de los locales que cumplen con los filtros especificados. Los locales se ordenan según el valor del parámetro "order" (si se especifica).
 *     tags: [Local]
 *     parameters:
 *       - in: path
 *         name: numPage
 *         description: Número de página que se quiere obtener. Cada página contiene 10 locales.
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: name
 *         description: Nombre del local.
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         description: Ubicación del local.
 *         schema:
 *           type: string
 *       - in: query
 *         name: verified
 *         description: Estado de verificación del local (verified, unVerified, archived).
 *         schema:
 *           type: string
 *           enum: [verified, unVerified, archived]
 *       - in: query
 *         name: specialty
 *         description: Especialidad del local.
 *         schema:
 *           type: string
 *       - in: query
 *         name: menu
 *         description: Tipo de menú que ofrece el local.
 *         schema:
 *           type: string
 *       - in: query
 *         name: characteristics
 *         description: Características que tiene el local (wifi, parking_lot, outdoor_seating, live_music, table_service, family_style, romantic, big_group, work_friendly, pet_friendly). Si el valor es true, se buscan los locales que tengan la característica. Si el valor es false, se buscan los locales que no tengan la característica. Si no se especifica, no se filtra por esta propiedad. O filtra por el type.
 *         schema:
 *           $ref: '#/components/schemas/Characteristic'
 *       - in: query
 *         name: order
 *         description: Criterio de ordenamiento de los locales (ratingASC, ratingDESC). Si no se especifica, no se ordena la lista.
 *         schema:
 *           type: string
 *           enum: [ratingASC, ratingDESC]
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Retorna todas los locales de la DB paginadas de a 10.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 count:
 *                   type: integer
 *                   description: Cantidad de locales que se están retornando en esta respuesta.
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: Cantidad total de páginas que se pueden obtener para estos locales.
 *                   example: 1
 *                 locals:
 *                   type: array
 *                   description: Lista de reviews que coinciden con la consulta.
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Local'
 *                       - type: object
 *                         properties:
 *                           Characteristic:
 *                             $ref: '#/components/schemas/Characteristic'
 *                           Images:
 *                             type: array
 *                             description: Lista de reviews que coinciden con la consulta.
 *                             items:
 *                               $ref: '#/components/schemas/Image'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
*/
