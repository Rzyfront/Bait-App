const { Dish } = require('../../db');

module.exports = async (req, res) => {
  try {
    const {
      name, type, price, description, image,
    } = req.dish;
    const { dishId } = req.params;
    const updateDish = await Dish.findByPk(dishId);
    updateDish.price = price;
    updateDish.name = name;
    updateDish.type = type;
    updateDish.description = description;
    updateDish.setImage(image.id);
    await updateDish.save();
    res.status(201).json({ success: true, dish: updateDish });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @swagger
 * /dishes/{dishId}:
 *  put:
 *    summary: Actualiza un plato existente
 *    description: Actualiza la información de un plato en particular a través de su ID.
 *    tags: [Dishes]
 *    parameters:
 *      - in: path
 *        name: dishId
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID del plato a actualizar
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Nombre del plato
 *            type:
 *              type: string
 *              description: Tipo de plato
 *            price:
 *              type: number
 *              format: float
 *              minimum: 0
 *              description: Precio del plato
 *            description:
 *              type: string
 *              description: Descripción del plato
 *            image:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: ID de la imagen asociada al plato
 *                url:
 *                  type: string
 *                  format: uri
 *                  description: URL de la imagen asociada al plato
 *        example:
 *          name: Milanguche de sangüinesa
 *          type: milan
 *          price: 400
 *          description: Alto milanguche de sangüinesa con exprimon limido
 *          image:
 *            id: 3
 *            url: https://asdasdasdasd
 *    responses:
 *      '200':
 *        description: Plato actualizado exitosamente
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la operación se realizó con éxito
 *                  example: true
 *                dish:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: ID del plato actualizado
 *                    name:
 *                      type: string
 *                      description: Nombre del plato actualizado
 *                    type:
 *                      type: string
 *                      description: Tipo de plato actualizado
 *                    ingredients:
 *                      type: string
 *                      description: Ingredientes del plato actualizado
 *                    price:
 *                      type: number
 *                      format: float
 *                      minimum: 0
 *                      description: Precio del plato actualizado
 *                    description:
 *                      type: string
 *                      description: Descripción del plato actualizado
 *                    MenuId:
 *                      type: integer
 *                      description: ID del menú al que pertenece el plato actualizado
 *                  example:
 *                    id: 1
 *                    name: Milanesa
 *                    type: milaverga
 *                    ingredients: carne, queso, salsa de tomate
 *                    price: 200
 *                    description: Alta milaverga
 *                    MenuId: 1
 *      '400':
 *        description: Error al actualizar el plato
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la operación se realizó con éxito
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Mensaje de error
 *                  example: No se encontró el plato con el ID especificado
 *      '401':
 *        description: No autorizado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                  description: Indica si la operación se realizó con éxito
 *                  example: false
 *                message:
 *                  type: string
 *                  description: Mensaje de error
 *                  example: Solo los administradores
 *
 */
