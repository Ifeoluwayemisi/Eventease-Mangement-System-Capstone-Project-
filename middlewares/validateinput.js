
import { body, query, param, validationResult } from 'express-validator';
import { createEvent } from '../controllers/eventController.js';


export const createEventValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('eventType').notEmpty().withMessage('Event type is required'),
  body('clientName').notEmpty().withMessage('Client name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('date').isDate().withMessage('Date must be valid (YYYY-MM-DD)'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('guestLimit').isInt({ min: 1 }).withMessage('Guest limit must be a positive number'),
  param('organizerId').isInt().withMessage('Organizer ID must be a valid number')
];


export const createGuestValidator = [
    body('name').notEmpty().withMessage('Guest name is required'),
    body('email').isEmail().withMessage('Provide a vaild Email').normalizeEmail(),
    body('guestType').notEmpty().withMessage('Guest type is required'),
    body('phoneNumber').notEmpty().withMessage('Please input a phone number'),
    param('eventId').isInt().withMessage('A valid event id is required'),
]


export const validationInputMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       

        return res.status(422).json({
            status: false,
            message: "Validation failed. Try again",
            errors: errors.array(),
        });
    };

    next();
}