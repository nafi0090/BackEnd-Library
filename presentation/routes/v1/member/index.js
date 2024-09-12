const express = require('express');
const router = express.Router();
const MEMBER_CONTROLLER = require('../../../controller/member.controller');

/**
 * @swagger
 * tags:
 *   name: Member
 *   description: API to manage members
 */

/**
 * @swagger
 * /api/v1/member:
 *   get:
 *     summary: Get all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: Members fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Members fetched successfully
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
 *                         example: pwr12230
 *                       name:
 *                         type: string
 *                         example: Ali
 *                       penaltyEndDate:
 *                         type: string
 *                         format: date-time
 *                         example: null
 *                       borrowedbook:
 *                         type: int
 *                         example: 1
 *       500:
 *         description: Server error
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
 *                   example: Failed to fetch members from repository
 */
router.get('/', MEMBER_CONTROLLER.index);

/**
 * @swagger
 * /api/v1/member/create:
 *   post:
 *     summary: Create a new member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: asd12300
 *               name:
 *                 type: string
 *                 example: John
 *     responses:
 *       200:
 *         description: Members created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Members created successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       code:
 *                         type: string
 *                         example: asd12300
 *                       name:
 *                         type: string
 *                         example: John
 *                       penaltyEndDate:
 *                         type: string
 *                         format: date-time
 *                         example: null
 *       500:
 *         description: Server error when creating member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating data member
 *                 error:
 *                   type: string
 *                   example: Failed to create Members from repository
 */
router.post('/create', MEMBER_CONTROLLER.create);

/**
 * @swagger
 * /api/v1/member/{id}/update:
 *   put:
 *     summary: Update member details
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: pwr12230
 *               name:
 *                 type: string
 *                 example: Ali
 *     responses:
 *       200:
 *         description: Members updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Members updated successfully
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
 *                         example: pwr12230
 *                       name:
 *                         type: string
 *                         example: Ali
 *                       penaltyEndDate:
 *                         type: string
 *                         format: date-time
 *                         example: null
 *       500:
 *         description: Server error when updating member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating data member
 *                 error:
 *                   type: string
 *                   example: Failed to update Members from repository
 */
router.put('/:id/update', MEMBER_CONTROLLER.updateData);

/**
 * @swagger
 * /api/v1/member/{id}/delete:
 *   delete:
 *     summary: Delete a member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Members deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Members deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *       500:
 *         description: Server error when deleting member
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting data member
 *                 error:
 *                   type: string
 *                   example: Failed to delete Members from repository
 */
router.delete('/:id/delete', MEMBER_CONTROLLER.deleteData);

module.exports = router;