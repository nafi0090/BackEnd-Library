// routes/api/v1/book.routes.js
const express = require('express');
const router = express.Router();
const BOOK_CONTROLLER = require('../../../controller/book.controller');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management API
 */

/**
 * @swagger
 * /api/v1/book:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Books fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       code:
 *                         type: string
 *                         example: TRLY00012
 *                       title:
 *                         type: string
 *                         example: Pulang Pergi
 *                       author:
 *                         type: string
 *                         example: Tere Liye
 *                       stock:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Internal Server Error
 */
router.get('/', BOOK_CONTROLLER.index);

/**
 * @swagger
 * /api/v1/book/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: TRLY0001210
 *               title:
 *                 type: string
 *                 example: Pulang Pergi
 *               author:
 *                 type: string
 *                 example: Tere Liye
 *               stock:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Books created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books created successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       code:
 *                         type: string
 *                         example: TRLY0001210
 *                       title:
 *                         type: string
 *                         example: Pulang Pergi
 *                       author:
 *                         type: string
 *                         example: Tere Liye
 *                       stock:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Server error when creating Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating data Book
 *                 error:
 *                   type: string
 *                   example: Failed to create Books from repository
 */
router.post('/create', BOOK_CONTROLLER.create);

/**
 * @swagger
 * /api/v1/book/{id}/update:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: TRLY000090909
 *               title:
 *                 type: string
 *                 example: Pulang Pergi
 *               author:
 *                 type: string
 *                 example: Tere Liye
 *               stock:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Books updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books updated successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       code:
 *                         type: string
 *                         example: TRLY0000909209
 *                       title:
 *                         type: string
 *                         example: Pulang Pergi
 *                       author:
 *                         type: string
 *                         example: Tere Liye
 *                       stock:
 *                         type: integer
 *                         example: 1
 *       500:
 *         description: Server error when updating Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating data Book
 *                 error:
 *                   type: string
 *                   example: Failed to update Books from repository
 */
router.put('/:id/update', BOOK_CONTROLLER.updateData);

/**
 * @swagger
 * /api/v1/book/{id}/delete:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: Books deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Books deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Server error when deleting Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting data Book
 *                 error:
 *                   type: string
 *                   example: Failed to delete Books from repository
 */
router.delete('/:id/delete', BOOK_CONTROLLER.deleteData);

module.exports = router;