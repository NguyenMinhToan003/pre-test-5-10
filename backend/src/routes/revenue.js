const express = require('express')
const revenueValidation = require('../validations/revenueValidation')
const revenueController = require('../controllers/revenueController')
const auth = require('../middleware/auth')

const revenueRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Revenue
 *   description: Revenue management endpoints
 */

/**
 * @swagger
 * /revenue:
 *   get:
 *     summary: Get all revenue records
 *     tags: [Revenue]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of revenue records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 revenues:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Revenue'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 *   post:
 *     summary: Create a new revenue record
 *     tags: [Revenue]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - source
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 200
 *               source:
 *                 type: string
 *                 enum: [POS, EATCLUB, LABOUR]
 *                 example: POS
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2025-10-05
 *     responses:
 *       201:
 *         description: Revenue record created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /revenue/dashboard:
 *   get:
 *     summary: Get weekly revenue dashboard (current week vs previous)
 *     tags: [Revenue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Optional date to calculate week, defaults to today
 *     responses:
 *       200:
 *         description: Weekly and previous weekly revenue
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /revenue/{id}:
 *   put:
 *     summary: Update a revenue record by ID
 *     tags: [Revenue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Revenue record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               source:
 *                 type: string
 *                 enum: [POS, EATCLUB, LABOUR]
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Revenue record updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a revenue record by ID
 *     tags: [Revenue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Revenue record ID
 *     responses:
 *       200:
 *         description: Revenue record deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Record not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Revenue:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         amount:
 *           type: number
 *         source:
 *           type: string
 *           enum: [POS, EATCLUB, LABOUR]
 *         date:
 *           type: string
 *           format: date
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

revenueRouter.route('/')
  .get(auth.authJWT, auth.admin, revenueController.getAll)
  .post(auth.authJWT, auth.admin, revenueValidation.create, revenueController.create)

revenueRouter.route('/dashboard')
  .get(auth.authJWT, auth.admin, revenueController.dashboard)

revenueRouter.route('/:id')
  .put(auth.authJWT, auth.admin, revenueValidation.update, revenueController.update)
  .delete(auth.authJWT, auth.admin, revenueController.deleteFunc)

module.exports = { revenueRouter }
