const { Local, /** User, */ Specialty } = require('../../db');

module.exports = async (req, res) => {
  const {
    name, location, schedule, email, characteristics, images, specialty, lat, lng, document, address,
  } = req.body;
  try {
    // const user = await User.findByPk(req.userId);
    const newLocal = await Local.create({
      name,
      location,
      email,
      address,
      lat,
      lng,
    });
    if (specialty && specialty.length) {
      const specialties = await Promise.all(specialty.map((specialtyName) => Specialty.findOrCreate({ where: { name: specialtyName } })));
      newLocal.setSpecialties(specialties.map((spl) => spl[0].id));
    }
    if (schedule) await newLocal.createSchedule(schedule);
    await newLocal.createCharacteristic(characteristics);
    await newLocal.addImages(images.map((image) => image.id));
    if (document && document.id) {
      // await user.addLocal(newLocal);
      await newLocal.setDocument(document.id);
    }
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
 *     description: Crea un local con los datos recibidos por body, le asigna imágenes y un documento en caso de ser enviados.
 *     tags: [Local]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autorización JWT del cual se verifica que el usuario este logueado.
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
 *               address:
 *                 type: string
 *                 description: Ubicación del local.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del local.
 *               lat:
 *                 type: number
 *                 description: Latitud de la ubicación del local.
 *               lng:
 *                 type: number
 *                 description: Longitud de la ubicación del local.
 *               images:
 *                 type: array
 *                 description: Arreglo de objetos con los IDs de las imágenes del local.
 *                 items:
 *                   $ref: '#/components/schemas/Image'
 *               specialty:
 *                 type: array
 *                 description: Especialidades del local
 *                 items:
 *                   type: string
 *                   description: Especialidad del local
 *                   example: 'Parrilla'
 *               schedule:
 *                 $ref: '#/components/schemas/Schedule'
 *               characteristics:
 *                 $ref: '#/components/schemas/Characteristic'
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
 *                   example:
 *                     id: 1
 *                     name: Mac Donals
 *                     location: Buenos Aires
 *                     specialty: pato
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 */
