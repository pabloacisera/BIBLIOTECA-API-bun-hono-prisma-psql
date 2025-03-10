import { Hono } from 'hono';
import ReturnController from '../controllers/ReturnController';

const returnRoutes = new Hono();

/**
 * @swagger
 * /api/returns/create_return:
 *   post:
 *     summary: Crear una nueva devolución
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanId:
 *                 type: integer
 *                 example: 1
 *               returnedQuantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Devolución creada exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
returnRoutes.post('/create_return', ReturnController.createReturn);

/**
 * @swagger
 * /api/returns/all_returns:
 *   get:
 *     summary: Obtener todas las devoluciones
 *     responses:
 *       200:
 *         description: Lista de devoluciones.
 */
returnRoutes.get('/all_returns', ReturnController.getAllReturns);

/**
 * @swagger
 * /api/returns/get_return_by_id/{id}:
 *   get:
 *     summary: Obtener una devolución por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devolución encontrada.
 *       404:
 *         description: Devolución no encontrada.
 */
returnRoutes.get('/get_return_by_id/:id', ReturnController.getReturnById);

/**
 * @swagger
 * /api/returns/update_return/{id}:
 *   put:
 *     summary: Actualizar una devolución por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanId:
 *                 type: integer
 *                 example: 1
 *               returnedQuantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Devolución actualizada exitosamente.
 *       404:
 *         description: Devolución no encontrada.
 */
returnRoutes.put('/update_return/:id', ReturnController.updateReturn);

/**
 * @swagger
 * /api/returns/delete_return/{id}:
 *   delete:
 *     summary: Eliminar una devolución por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnedQuantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       204:
 *         description: Devolución eliminada exitosamente.
 *       404:
 *         description: Devolución no encontrada.
 */
returnRoutes.delete('/delete_return/:id', ReturnController.deleteReturn);

export default returnRoutes;

