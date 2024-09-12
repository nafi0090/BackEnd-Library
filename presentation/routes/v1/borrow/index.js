const express = require('express');
const router = express.Router();
const BORROW_CONTROLLER = require('../../../controller/borrow.controller');

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API to manage borrow records
 */

/**
 * @swagger
 * /api/v1/borrow:
 *   get:
 *     summary: Retrieve a list of borrowed books
 *     tags: [Borrow]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of borrowed books
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
 *                         example: 2
 *                       memberid:
 *                         type: integer
 *                         example: 4
 *                       bookId:
 *                         type: integer
 *                         example: 4
 *                       borrowedDate:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-12T13:39:38.584Z'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching data
 *                 error:
 *                   type: string
 *                   example: Failed to fetch borrow records from repository
 */
router.get('/', BORROW_CONTROLLER.index);

/**
 * @swagger
 * /api/v1/borrow/create:
 *   post:
 *     summary: Create a new borrow record
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberid:
 *                 type: integer
 *                 example: 6
 *               bookid:
 *                 type: integer
 *                 example: 11
 *               borrowedDate:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-09-12T15:34:33.306Z'
 *     responses:
 *       200:
 *         description: Successfully created a new borrow record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book borrowed successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 19
 *                       memberid:
 *                         type: integer
 *                         example: 6
 *                       bookid:
 *                         type: integer
 *                         example: 11
 *                       borrowedDate:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-12T15:34:33.306Z'
 *       500:
 *         description: Internal server error when creating borrow record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating borrow record
 *                 error:
 *                   type: string
 *                   example: Member cannot borrow more than 2 books
 */
router.post('/create', BORROW_CONTROLLER.borrow);

module.exports = router;