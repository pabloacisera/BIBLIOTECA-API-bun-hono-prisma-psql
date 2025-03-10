import { Hono } from 'hono';
import LoanController from '../controllers/LoanController';

const loanRoutes = new Hono();

/**
 * @swagger
 * /api/loans/create_loan:
 *   post:
 *     summary: Crear un nuevo préstamo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               memberId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Préstamo creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
loanRoutes.post('/create_loan', LoanController.createLoan);

/**
 * @swagger
 * /api/loans/all_loans:
 *   get:
 *     summary: Obtener todos los préstamos
 *     responses:
 *       200:
 *         description: Lista de préstamos.
 */
loanRoutes.get('/all_loans', LoanController.getAllLoans);

/**
 * @swagger
 * /api/loans/get_loan_by_id/{id}:
 *   get:
 *     summary: Obtener un préstamo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Préstamo encontrado.
 *       404:
 *         description: Préstamo no encontrado.
 */
loanRoutes.get('/get_loan_by_id/:id', LoanController.getLoanById);

/**
 * @swagger
 * /api/loans/update_loan/{id}:
 *   put:
 *     summary: Actualizar un préstamo por ID
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
 *               bookId:
 *                 type: integer
 *                 example: 1
 *               memberId:
 *                 type: integer
 *                 example: 2
 *               loanDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-10T14:30:00Z"
 *     responses:
 *       200:
 *         description: Préstamo actualizado exitosamente.
 *       404:
 *         description: Préstamo no encontrado.
 */
loanRoutes.put('/update_loan/:id', LoanController.updateLoan);

/**
 * @swagger
 * /api/loans/delete_loan/{id}:
 *   delete:
 *     summary: Eliminar un préstamo por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Préstamo eliminado exitosamente.
 *       404:
 *         description: Préstamo no encontrado.
 */
loanRoutes.delete('/delete_loan/{id}', LoanController.deleteLoan)

export default loanRoutes