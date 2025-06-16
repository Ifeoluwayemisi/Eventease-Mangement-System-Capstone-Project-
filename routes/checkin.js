import express from 'express';
import {
  generateQRCode,
  validateQRCode,
  viewAllCheckins,
   getEventCheckins,
} from '../controllers/qrcontroller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Checkin
 *   description: QRCode check-in Operations
 */

/**
 * @swagger
 * /api/checkin:
 *   post:
 *     summary: Generate a QR Code for guest/event
 *     tags: [Checkin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guestId
 *               - eventId
 *             properties:
 *               guestId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: QR code generated successfully
 */
router.post('/', generateQRCode);

/**
 * @swagger
 * /api/checkin/validate:
 *   post:
 *     summary: Validate QR Code and check-in guest
 *     tags: [Checkin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guestId
 *               - eventId
 *               - timestamp
 *               - hmac
 *             properties:
 *               guestId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *               timestamp:
 *                 type: integer
 *               hmac:
 *                 type: string
 *     responses:
 *       200:
 *         description: QR Code validated, check-in recorded
 *       400:
 *         description: Invalid or expired QR code
 */
router.post('/validate', validateQRCode);

/**
 * @swagger
 * /api/checkin:
 *   get:
 *     summary: View all guest check-ins
 *     tags: [Checkin]
 *     responses:
 *       200:
 *         description: List of check-ins
 */
router.get('/', viewAllCheckins);

/**
 * @swagger
 * /api/checkin/event/{eventId}/checkins:
 *   get:
 *     summary: View check-ins for a specific event
 *     tags: [Checkin]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of check-ins for the event
 */
router.get('/event/:eventId/checkins', getEventCheckins);


export default router;
