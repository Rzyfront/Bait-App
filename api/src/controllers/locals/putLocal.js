const { Characteristic } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics, lat, lng, specialty, document, images,
  } = req.body;
  try {
    await Characteristic.update(characteristics, { where: { id: req.local.id } });
    const updateLocal = await req.local.update({
      name, location, schedule, email, lat, lng, specialty,
    });
    if (document) await updateLocal.setDocument(document.id);
    if (images && images.length) await updateLocal.setImages(images.map((img) => img.id));
    const local = {
      id: updateLocal.id,
      name: updateLocal.name,
      location: updateLocal.location,
      specialty: updateLocal.specialty,
    };
    return res.status(201).json({ success: true, local });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
/**
 * @swagger
 * /locals/{localId}:
 *   put:
 *     summary: Actualiza un local existente
 *     description: Modifica el local con el id especificado en los parámetros de la ruta, utilizando los datos enviados en el cuerpo de la petición.
 *     tags: [Local]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: localId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identificador único del local
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT con propiedad 'role' igual a owner, admin o superAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del local
 *               location:
 *                 type: string
 *                 description: Ubicación del local
 *               schedule:
 *                 type: string
 *                 description: Horario de atención del local
 *               email:
 *                 type: string
 *                 description: Correo electrónico del local
 *               lat:
 *                 type: number
 *                 description: Latitud del local
 *               lng:
 *                 type: number
 *                 description: Longitud del local
 *               specialty:
 *                 type: string
 *                 description: Especialidad del local
 *               characteristics:
 *                 $ref: '#/components/schemas/Characteristic'
 *               images:
 *                 type: array
 *                 description: Características del local
 *                 items:
 *                   $ref: '#/components/schemas/Image'
 *               document:
 *                 type: object
 *                 description: Documento asociado al local
 *                 properties:
 *                   id:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Local actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la petición fue exitosa
 *                   example: true
 *                 local:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Identificador único del local
 *                       example: 8
 *                     name:
 *                       type: string
 *                       description: Nombre del local
 *                       example: "ar"
 *                     location:
 *                       type: string
 *                       description: Ubicación del local
 *                       example: "Chaco"
 *                     specialty:
 *                       type: string
 *                       description: Especialidad del local
 *                       example: "elpepe"
 *       400:
 *         description: Error en la petición
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la petición fue exitosa
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *                   example: "Error en la actualización del local"
 */
