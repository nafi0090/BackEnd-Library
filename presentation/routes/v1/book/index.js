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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the book
 *                       code:
 *                         type: string
 *                         description: Book code
 *                       title:
 *                         type: string
 *                         description: Title of the book
 *                       author:
 *                         type: string
 *                         description: Author of the book
 *                       stock:
 *                         type: integer
 *                         description: Number of books available in stock
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
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 * 
 *     responses:
 *       200:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.post('/create', BOOK_CONTROLLER.create);

/**
 * @swagger
 * /api/v1/book/{id}/update:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.put('/:id/update', BOOK_CONTROLLER.updateData);

/**
 * @swagger
 *  /api/v1/book/{id}/delete:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
router.delete('/:id/delete', BOOK_CONTROLLER.deleteData);

module.exports = router;