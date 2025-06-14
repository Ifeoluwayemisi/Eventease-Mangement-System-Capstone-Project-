import crypto from 'crypto';
import Checkin from '../models/checkin.js';
import {Op} from 'sequelize';
import Guest from '../models/guest.js';
import Event from '../models/event.js';
import { start } from 'repl';

const secret = process.env.JWT_SECRET || 'default_secret';

export const checkInGuest = async (req, res) => {
  try {
    const { guestId, eventId, startDate, endDate, limit=20,offset=0, hmac, timestamp } = req.query;

    // Recreate expected HMAC with timestamp
    const expectedHMAC = crypto
      .createHmac('sha256', secret)
      .update(`${guestId}:${eventId}:${timestamp}`)
      .digest('hex');

      const whereClause = {};
      if (eventId) whereClause.eventId = eventId;
      if (guestId) whereClause.guestId = guestId;

      if (startDate || endDate) {
        whereClause.checkInTime = {};
        if (startDate) whereClause.checkInTime[Op.gte] = new Date(startDate);
        if (endDate) whereClause.checkInTime[Op.lte] = new Date(endDate);

      }

    if (expectedHMAC !== hmac) {
      return res.status(400).json({ message: 'Invalid QR code' });
    }

    // Check expiration (10-minute validity)
    const qrTime = new Date(Number(timestamp));
    const now = new Date();
    const diffMinutes = Math.floor((now - qrTime) / 60000);

    if (diffMinutes < 0) {
      return res.status(400).json({ message: 'QR code timestamp is in the future' });
    }
    if (diffMinutes > 10) {
      return res.status(400).json({ message: 'QR code has expired' });
    }

    // Fetch guest and event
    const guest = await Guest.findByPk(guestId);
    const event = await Event.findByPk(eventId);

    if (!guest || !event) {
      return res.status(404).json({ message: 'Guest or Event not found' });
    }

    if (guest.checkedIn) {
      return res.status(400).json({ message: 'Guest already checked in' });
    }

    const checkins = await Checkin.findAll({
      where: whereClause,
      include: [
        {models: Guest, attributes: ['id', 'name', 'email']},
          {models: Event, attributes: ['id', 'name', 'date']},
      ],
      order: [['checkInTime', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    return res.status(200).json({ data: checkins});

    // Mark guest as checked in
    guest.checkedIn = true;
    await guest.save();

    return res.status(200).json({ message: 'Check-in successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Check-in failed' });
  }
};
// Generate HMAC for QR code
export const generateHMAC = (guestId, eventId, timestamp) => {
  return crypto
    .createHmac('sha256', secret)
    .update(`${guestId}:${eventId}:${timestamp}`)
    .digest('hex');
};