const cloudinary = require('../../config/cloudinary');
const { Image } = require('../../db');

module.exports = async (req, res) => {
  try {
    const responseImage = await cloudinary.uploader.upload(req.body.image);
    const newImage = await Image.create({ url: responseImage.secure_url });
    res.status(201).json({ image: newImage, success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, error });
  }
};
/**
 * @swagger
 * /images:
 *   post:
 *     summary: Subir imagen a Cloudinary.
 *     tags: [Images]
 *     requestBody:
 *       description: Objeto con una propiedad `image` que es un string de una imagen en base64.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: base64
 *     responses:
 *       '200':
 *         description: Imagen subida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
