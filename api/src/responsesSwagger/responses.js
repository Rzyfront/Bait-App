/**
 *
 * @swagger
 * components:
 *  responses:
 *    BadRequest:
 *      description: Invalid input
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              success:
 *                type: boolean
 *                const: false
 *            required:
 *              - message
 *              - success
 *            example:
 *              message: Error Invalid input
 *              success: false
 */

/**
 *
 * @swagger
 * components:
 *  responses:
 *    Unauthorized:
 *      description: Error de autenticación.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                enum: ["Unauthorized"]
 *                description: Mensaje de error.
 *              success:
 *                type: boolean
 *                const: false
 *                description: Indicador de éxito de la petición.
 *            required:
 *              - message
 *              - success
 *            example:
 *              message: Unauthorized
 *              success: false
 */

/**
 *
 * @swagger
 * components:
 *  responses:
 *    NotFound:
 *      description: Recurso no encontrado
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                enum: ["Not found"]
 *                description: Mensaje indicando que el recurso no ha sido encontrado.
 *              success:
 *                type: boolean
 *                const: false
 *                description: Indica si la petición fue exitosa o no.
 *            required:
 *              - message
 *              - success
 *          examples:
 *            NotFound:
 *              summary: Recurso no encontrado
 *              value:
 *                message: Not found
 *                success: false
 */

/**
 *
 * @swagger
 * components:
 *  responses:
 *    InternalServerError:
 *      description: Error interno del servidor.
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                const: internal error
 *              success:
 *                type: boolean
 *                const: false
 *            required:
 *              - message
 *              - success
 *          example:
 *            message: internal error
 *            success: false
 */

/**
 * @swagger
 * components:
 *   responses:
 *     Success:
 *       description: OK
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 description: Indica si la operación se realizó con éxito.
 *                 example: true
 *             required:
 *               - success
 */
