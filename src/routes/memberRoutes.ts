// src/routes/memberRoutes.ts
import { Hono } from 'hono';
import { MemberController } from '../controllers/MemberController';

const router = new Hono();
const memberController = new MemberController();

/**
 * @swagger
 * /api/members/create_member:
 *   post:
 *     summary: Crear un nuevo socio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Socio creado exitosamente.
 *       400:
 *         description: Error en la solicitud.
 */
router.post('/create_member', memberController.createMember);

/**
 * @swagger
 * /api/members/get_member_by_id/{id}:
 *   get:
 *     summary: Obtener un socio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Socio encontrado.
 *       404:
 *         description: Socio no encontrado.
 */
router.get('/get_member_by_id/:id', memberController.getMember);

/**
 * @swagger
 * /api/members/all_members:
 *   get:
 *     summary: Obtener todos los socios
 *     responses:
 *       200:
 *         description: Lista de socios.
 */
router.get('/all_members', memberController.getAllMembers);

/**
 * @swagger
 * /api/members/update_member/{id}:
 *   put:
 *     summary: Actualizar un socio por ID
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
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Socio actualizado exitosamente.
 *       404:
 *         description: Socio no encontrado.
 */
router.put('/update_member/:id', memberController.updateMember);

/**
 * @swagger
 * /api/members/delete_members/{id}:
 *   delete:
 *     summary: Eliminar un socio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Socio eliminado exitosamente.
 *       404:
 *         description: Socio no encontrado.
 */
router.delete('/delete_members/:id', memberController.deleteMember);

export default router;
