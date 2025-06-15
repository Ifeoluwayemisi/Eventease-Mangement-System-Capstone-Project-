import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import Guest from '../models/guest.js';
import Event from '../models/event.js';
import Checkin from '../models/checkin.js';

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
    const minutesElapsed = (scannedAt - qrTimestamp) / (1000 * 60);

    if (minutesElapsed > 10) {
      return res.status(400).json({ error: 'QR code expired' });
    }

    const guest = await Guest.findByPk(guestId);
    const event = await Event.findByPk(eventId);
    if (!guest || !event) {
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

// ✅ GET /checkin → View all check-ins
export const viewAllCheckins = async (req, res) => {
  try {
    const all = await Checkin.findAll({ order: [['checkedInAt', 'DESC']] });
    res.status(200).json(all);
  } catch (err) {
    console.error('Check-in fetch error:', err);
    res.status(500).json({ error: 'Server error fetching check-ins' });
  }
};

