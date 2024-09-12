const express = require('express');
const router = express.Router();
const RETURN_CONTROLLER = require('../../../controller/return.controller');

/**
 * @swagger
 * tags:
 *   name: Return
 *   description: API to manage book returns
 */

/**
 * @swagger
 * /api/v1/return:
 *   post:
 *     summary: Return a book
 *     tags: [Return]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberid:
 *                 type: integer
 *                 example: 1
 *               bookid:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book returned successfully
 *                 penalty:
 *                   type: string
 *                   example: No penalty
 *       500:
 *         description: Error returning the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error return
 *                 error:
 *                   type: string
 *                   example: Failed to return the book
 */

router.post('/', RETURN_CONTROLLER.returnBook);

module.exports = router;
