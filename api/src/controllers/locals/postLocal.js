const { Local, User } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics, images, specialty, lat, lng, document,
  } = req.body;
  try {
    const user = await User.findByPk(req.userId);
    const newLocal = await Local.create({
      name, location, schedule, email, specialty, lat, lng,
    });
    await newLocal.createCharacteristic(characteristics);
    await newLocal.addImages(images.map((image) => image.id));
    await user.addLocal(newLocal);
    if (document) await newLocal.setDocument(document.id);
    const local = {
      id: newLocal.id,
      name: newLocal.name,
      location: newLocal.location,
      specialty: newLocal.specialty,
    };
    return res.status(201).json({ success: true, local });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

/**
 * @swagger
 * /locals:
 *   post:
 *     summary: Crea un nuevo local.
 *     description: Crea un local con los datos recibidos por body,lo añade a los locales del usuario obtenido del token y le asigna imágenes y un documento en caso de ser enviados.
 *     tags: [Local]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autorización JWT del cual se obtiene el id del usuario.
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del local.
 *               location:
 *                 type: string
 *                 description: Ubicación del local.
 *               schedule:
 *                 type: string
 *                 description: Horario de atención del local.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del local.
 *               characteristics:
 *                 type: string
 *                 description: Características del local.
 *               images:
 *                 type: array
 *                 description: Arreglo de objetos con los IDs de las imágenes del local.
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la imagen del local.
 *               specialty:
 *                 type: string
 *                 description: Especialidad del local.
 *               lat:
 *                 type: number
 *                 description: Latitud de la ubicación del local.
 *               lng:
 *                 type: number
 *                 description: Longitud de la ubicación del local.
 *               document:
 *                 type: object
 *                 nullable: true
 *                 description: Objeto con el ID del documento del local, en caso de tener uno.
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del documento del local.
 *     responses:
 *       '201':
 *         description: Local creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indica si la operación fue exitosa.
 *                   example: true
 *                 local:
 *                   type: object
 *                   description: Objeto que representa el local creado.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del local.
 *                     name:
 *                       type: string
 *                       description: Nombre del local.
 *                     location:
 *                       type: string
 *                       description: Ubicación del local.
 *                     specialty:
 *                       type: string
 *                       description: Especialidad del local.
 *                   example:
 *                     id: 1
 *                     name: Mac Donals
 *                     location: Buenos Aires
 *                     specialty: pato
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */
