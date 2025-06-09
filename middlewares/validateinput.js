// eventRoutes.js
import express from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { createEvent } from '../controllers/eventController.js';


export const createEventValidator = [
  body('title')
  .notEmpty()
  .withMessage('Title is required')
  .isLength({min:10}).withMessage('Event title must be at least 10 characters long'),
 
  body('startsAt').isISO8601().notEmpty().withMessage('Start date is required').custom((value, { req }) => {
      if (dayjs(value).isBefore(dayjs())) {
        throw new Error('Start time cannot be in the past');
      }
      return true;
    }),
,
   body('endAt')
    .isISO8601()
    .withMessage('End time must be a valid date')
    .custom((value, { req }) => {
      if (dayjs(value).isBefore(dayjs(req.body.startTime))) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),


  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('The decription is required')

]


export const createGuestValidator = [
    body('name').notEmpty().withMessage('Guest name is required'),
    body('email').isEmail().withMessage('Provide a vaild Email').normalizeEmail(),
    param('eventId').isInt().withMessage('A valid event id is required'),
]


export const validationInputMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       

        return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
}