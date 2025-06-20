import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Guest, Checkin } from '../models/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET = process.env.HMAC_SECRET || process.env.QR_SECRET || 'default_secret';

// Utility: generate HMAC
function generateHMAC(guestId, eventId, timestamp) {
  const payload = `${guestId}:${eventId}:${timestamp}`;
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
}

// ✅ POST /checkin → Generate QR code
export const generateQRCode = async (req, res) => {
  const { guestId, eventId } = req.body;
  if (!guestId || !eventId) {
    return res.status(400).json({ error: 'guestId and eventId required' });
  }

  const timestamp = Date.now();
  const hmac = generateHMAC(guestId, eventId, timestamp);
  const payload = JSON.stringify({ guestId, eventId, timestamp, hmac });

  const dir = path.join(__dirname, '..', 'qrcodes');
  fs.mkdirSync(dir, { recursive: true });

  const fileName = `qr-${guestId}-${eventId}.png`;
  const filePath = path.join(dir, fileName);
  await QRCode.toFile(filePath, payload);

  res.status(201).json({
    message: 'QR code generated',
    filePath: `/qrcodes/${fileName}`,
    payload: { guestId, eventId, timestamp, hmac }
  });
};

// ✅ POST /checkin/validate → Validate QR and check in
export const validateQRCode = async (req, res) => {
  try {
    const { guestId, eventId, timestamp, hmac } = req.body;

    if (!guestId || !eventId || !timestamp || !hmac) {
      return res.status(400).json({ error: 'Missing QR data' });
    }

    const expectedHmac = generateHMAC(guestId, eventId, timestamp);
    if (hmac !== expectedHmac) {
      return res.status(400).json({ error: 'Invalid HMAC - tampered data' });
    }

    const scannedAt = new Date();
    const qrTimestamp = new Date(Number(timestamp));
    const diffInMs = scannedAt - qrTimestamp;
    const minutesElapsed = diffInMs / (1000 * 60);
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

if (diffInMs > threeDaysInMs) {
  return res.status(400).json({ error: 'QR code expired' });
}


  

    const guest = await Guest.findByPk(guestId);
    // const event = await Event.findByPk(eventId);

       console.log("guest:", guest); // null?
    //   console.log("event:", event); // null?

    if (!guest) {
      return res.status(404).json({ error: 'Guest or Event not found' });
    }

    const checkin = await Checkin.create({
      guestId,
      eventId,
      checkedInAt: scannedAt
    });

    res.status(200).json({
      message: 'QR validated and check-in recorded',
      checkin
    });
  } catch (err) {
    console.error('Validation error:', err);
    res.status(500).json({ error: 'Server error validating QR' });
  }
};

// GET /checkin → Filtered view
export const viewAllCheckins = async (req, res) => {
  try {
    const { guestId, eventId, date } = req.query;

    const where = {};
    if (guestId) where.guestId = guestId;
    if (eventId) where.eventId = eventId;

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      where.checkedInAt = {
        [Op.gte]: start,
        [Op.lt]: end,
      };
    }

    const checkins = await Checkin.findAll({
      where,
      order: [['checkedInAt', 'DESC']],
      include: [
        { model: Guest, attributes: ['name', 'email'] },
        { model: Event, attributes: ['title', 'location'] },
      ],
    });

    res.status(200).json(checkins);
  } catch (err) {
    console.error('Check-in filter error:', err);
    res.status(500).json({ error: 'Server error filtering check-ins' });
  }
};

export const getEventCheckins = async (req, res) => {
  const { eventId } = req.params;

  try {
    console.log('Getting check-ins for event:', eventId); // Debug log

    const checkins = await Checkin.findAll({
      where: { eventId },
      include: [Guest],
      order: [['checkedInAt', 'DESC']],
    });

    res.status(200).json(checkins);
  } catch (error) {
    console.error('Error fetching check-ins by event:', error); // Detailed error log
    res.status(500).json({ error: 'Server error' });
  }
};

