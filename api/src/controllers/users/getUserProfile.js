const {
  User, Image, Review, Local,
} = require('../../db');

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const ID = userId ?? req.userId;
    const user = await User.findByPk(ID, {
      attributes: ['id', 'name', 'lastname', 'age', 'location', 'phone_number', 'email'],
      include: [
        { model: Image, attributes: ['url'] },
        {
          model: Review,
          include: [
            { model: Image, attributes: ['url'], as: 'Image' },
            { model: Image, attributes: ['url'], as: 'ticket' },
          ],
        },
        {
          model: Local,
          where: { verified: 'verified' },
          required: false,
        },
      ],
    });
    if (!user) throw Error('User not found');
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtiene la información de perfil del usuario logueado
 *     description: Devuelve la información de perfil del usuario logueado.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         description: Token de autenticación de usuario.
 *     responses:
 *       200:
 *         description: La información de perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                   properties:
 *                     Image:
 *                       $ref: '#/components/schemas/Image'
 *                     Reviews:
 *                       type: array
 *                       description: Lista de las reviews del usuarios.
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *                     Locals:
 *                       type: array
 *                       description: Lista de los locales del usuarios.
 *                       items:
 *                         $ref: '#/components/schemas/Local'
 *               example:
 *                  success: true
 *                  user:
 *                    id: 1
 *                    name: Franco
 *                    lastname: Gutierrez
 *                    age: 21
 *                    location: Chaco
 *                    phone_number: "3624854583"
 *                    email: francoegi01@gmail.com
 *                    Image: null
 *                    Reviews:
 *                      - id: 20
 *                        title: se puede comer
 *                        comment: aceptable
 *                        verified: unVerified
 *                        food: 1
 *                        service: 1
 *                        environment: 3
 *                        qaPrice: 4
 *                        rating: 2.25
 *                        toxicity: null
 *                        createdAt: "2023-04-21T17:58:52.327Z"
 *                        updatedAt: "2023-04-21T17:58:52.351Z"
 *                        LocalId: 1
 *                        UserId: 1
 *                        Image: null
 *                        ticket: null
 *                    Locals:
 *                      - id: 21
 *                        name: Mac Donals
 *                        verified: verified
 *                        email: email@gmail.com
 *                        location: Buenos Aires
 *                        lat: 51.51760941705477
 *                        lng: -0.1064300537109375
 *                        specialty: pato
 *                        schedule: 18:00 - 00:00
 *                        createdAt: "2023-04-27T16:18:50.507Z"
 *                        updatedAt: "2023-04-27T16:21:20.038Z"
 *                        UserId: 1
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /administrator/{userId}:
 *   get:
 *     summary: Obtiene la información de perfil del usuario con el ID especificado.
 *     description: Devuelve la información de perfil del usuario con el ID especificado.
 *     tags:
 *       - Administrador
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         description: ID del usuario del que se desea obtener la información de perfil.
 *       - in: headers
 *         name: token
 *         schema:
 *           type: string
 *         description: Token de autenticación de usuario que debe tener el role de "admin" o "superAdmin"
 *     responses:
 *       200:
 *         description: La información de perfil del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                   properties:
 *                     Image:
 *                       $ref: '#/components/schemas/Image'
 *                     Reviews:
 *                       type: array
 *                       description: Lista de las reviews del usuarios.
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *                     Locals:
 *                       type: array
 *                       description: Lista de los locales del usuarios.
 *                       items:
 *                         $ref: '#/components/schemas/Local'
 *               example:
 *                  success: true
 *                  user:
 *                    id: 1
 *                    name: Franco
 *                    lastname: Gutierrez
 *                    age: 21
 *                    location: Chaco
 *                    phone_number: "3624854583"
 *                    email: francoegi01@gmail.com
 *                    Image: null
 *                    Reviews:
 *                      - id: 20
 *                        title: se puede comer
 *                        comment: aceptable
 *                        verified: unVerified
 *                        food: 1
 *                        service: 1
 *                        environment: 3
 *                        qaPrice: 4
 *                        rating: 2.25
 *                        toxicity: null
 *                        createdAt: "2023-04-21T17:58:52.327Z"
 *                        updatedAt: "2023-04-21T17:58:52.351Z"
 *                        LocalId: 1
 *                        UserId: 1
 *                        Image: null
 *                        ticket: null
 *                    Locals:
 *                      - id: 21
 *                        name: Mac Donals
 *                        verified: verified
 *                        email: email@gmail.com
 *                        location: Buenos Aires
 *                        lat: 51.51760941705477
 *                        lng: -0.1064300537109375
 *                        specialty: pato
 *                        schedule: 18:00 - 00:00
 *                        createdAt: "2023-04-27T16:18:50.507Z"
 *                        updatedAt: "2023-04-27T16:21:20.038Z"
 *                        UserId: 1
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
