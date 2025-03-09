import { Hono } from 'hono';
import BookController from '../controllers/BookController';

const router = new Hono();

/**
 * @swagger
 * /api/books/all_books:
 *   get:
 *     summary: Obtener todos los libros
 *     description: Retorna una lista de todos los libros disponibles.
 *     responses:
 *       200:
 *         description: Lista de libros obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "El Principito"
 *                   author:
 *                     type: string
 *                     example: "Antoine de Saint-Exupéry"
 *                   year:
 *                     type: number
 *                     example: 1943
 */
router.get('/all_books', BookController.getAllBooks);

/**
 * @swagger
 * /api/books/get_book_by_id/{id}:
 *   get:
 *     summary: Obtener un libro por su ID
 *     description: Retorna un libro específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del libro a obtener.
 *     responses:
 *       200:
 *         description: Libro obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "El Principito"
 *                 author:
 *                   type: string
 *                   example: "Antoine de Saint-Exupéry"
 *                 year:
 *                   type: number
 *                   example: 1943
 *       404:
 *         description: Libro no encontrado.
 */
router.get('get_book_by_id/:id', BookController.getBookById);

/**
 * @swagger
 * /api/books/create_book:
 *   post:
 *     summary: Crear un nuevo libro
 *     description: Crea un nuevo libro con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cien años de soledad"
 *               author:
 *                 type: string
 *                 example: "Gabriel García Márquez"
 *               year:
 *                 type: number
 *                 example: 1967
 *     responses:
 *       201:
 *         description: Libro creado exitosamente.
 *       400:
 *         description: Datos del libro inválidos.
 */
router.post('/create_book', BookController.createBook);

/**
 * @swagger
 * /api/books/update_book/{id}:
 *   put:
 *     summary: Actualizar un libro existente
 *     description: Actualiza un libro existente basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del libro a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cien años de soledad"
 *               author:
 *                 type: string
 *                 example: "Gabriel García Márquez"
 *               year:
 *                 type: number
 *                 example: 1967
 *     responses:
 *       200:
 *         description: Libro actualizado correctamente.
 *       404:
 *         description: Libro no encontrado.
 *       400:
 *         description: Datos del libro inválidos.
 */
router.put('update_book/:id', BookController.updateBook);

/**
 * @swagger
 * /api/books/delete_book/{id}:
 *   delete:
 *     summary: Eliminar un libro por su ID
 *     description: Elimina un libro específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del libro a eliminar.
 *     responses:
 *       200:
 *         description: Libro eliminado correctamente.
 *       404:
 *         description: Libro no encontrado.
 */
router.delete('book/:id', BookController.deleteBook);

export default router;
