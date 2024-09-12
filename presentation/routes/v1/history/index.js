const express = require('express');
const router = express.Router();
const HISTORY_CONTROLLER = require('../../../controller/history.controller');

/**
 * @swagger
 * tags:
 *   name: History
 *   description: API to manage history records
 */

/**
 * @swagger
 * /api/v1/history:
 *   get:
 *     summary: Get all history records
 *     tags: [History]
 *     responses:
 *       200:
 *         description: Histories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Histories fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       memberid:
 *                         type: integer
 *                         example: 1
 *                       bookid:
 *                         type: integer
 *                         example: 1
 *                       borroweddate:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-12T17:40:35.719Z'
 *                       returneddate:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-09-12T19:39:36.265Z'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching histories
 *                 error:
 *                   type: string
 *                   example: Failed to fetch histories from repository
 */
router.get('/', HISTORY_CONTROLLER.index);

/**
 * @swagger
 * /api/v1/history/{id}/delete:
 *   delete:
 *     summary: Delete a history record
 *     tags: [History]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: History deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: History Deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Server error when deleting history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting history
 *                 error:
 *                   type: string
 *                   example: Failed to delete history from repository
 */
router.delete('/:id/delete', HISTORY_CONTROLLER.delete);

module.exports = router;
