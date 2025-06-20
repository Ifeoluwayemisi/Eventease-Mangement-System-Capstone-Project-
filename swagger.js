/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management and analytics
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - eventType
 *         - clientName
 *         - description
 *         - date
 *         - time
 *         - location
 *         -guestLimit
 *         -image
 *         - organizerId
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         eventType:
 *           type: string
 *         clientName:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *           format: time
 *         location:
 *           type: string
 *         guestLimit:
 *           type: integer
 *         image:
 *           type: string
 *         organizerId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created 
 *       500:
 *         description:  Server error, try again.
 *       400:
 *         description: Could not create the event
 */

/**
 * @swagger
 * /events/analytics/total:
 *   get:
 *     summary: Get the total number of events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Number of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *       500:
 *         description: Error message
 */

/**
 * @swagger
 * /events/analytics/upcoming:
 *   get:
 *     summary: Get upcoming events (future date)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of upcoming events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Error counting upcoming events
 */

/**
 * @swagger
 * /events/:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error while fetching events.
 */

/**
 * @swagger
 * /events//:eventId:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */

/**
 * @swagger
 * /events/:eventId:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error while updating events.
 */

/**
 * @swagger
 * /events/:eventId:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Event ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
  *       500:
 *         description: Server error while deleting events.
 */


 /**
 * @swagger
 * tags:
 *   name: Guests
 *   description: Guest management for events
 */

/**
 * @swagger
 * /api/guests/create:
 *   post:
 *     summary: Create a guest
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phoneNumber
 *               - guestType
 *               - eventId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               guestType:
 *                 type: string
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Guest created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/guests/:
 *   get:
 *     summary: Get all guests
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all guests
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/guests/:guestId:
 *   get:
 *     summary: Get a guest by ID
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Guest data
 *       404:
 *         description: Guest not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/guests/:guestId:
 *   put:
 *     summary: Update a guest by ID
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
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
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               guestType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Guest updated
 *       404:
 *         description: Guest not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/guests/:guestId:
 *   delete:
 *     summary: Delete a guest by ID
 *     tags: [Guests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Guest deleted
 *       404:
 *         description: Guest not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */