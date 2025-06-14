import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import Guest from '../models/guest.js';
import Event from '../models/event.js';
import checkin from '../models/checkin.js';
import Checkin from '../models/checkin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SECRET = process.env.JWT_SECRET || 'default_secret';

// Utility: generate HMAC from guest, event, timestamp
function generateHMAC(guestId, eventId, timestamp) {
  const payload = `${guestId}:${eventId}:${timestamp}`;
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
}

// Generate QR Code and save to disk
export const generateQRCode = async (req, res) => {
  try {
    const { guestId, eventId } = req.body;

    if (!guestId || !eventId) {
      return res.status(400).json({ error: 'Guest ID and Event ID are required' });
    }

    const timestamp = Date.now();
    const hmac = generateHMAC(guestId, eventId, timestamp);
    const qrPayload = JSON.stringify({ guestId, eventId, timestamp, hmac });

    const qrDir = path.join(__dirname, '..', 'qrcodes');
    fs.mkdirSync(qrDir, { recursive: true });

    const fileName = `qr-${guestId}-${eventId}.png`;
    const qrImagePath = path.join(qrDir, fileName);

    await QRCode.toFile(qrImagePath, qrPayload);

    return res.status(201).json({
      message: 'QR Code generated successfully',
      filePath: `/qrcodes/${fileName}`,
      data: { guestId, eventId, hmac, timestamp }
    });
  } catch (error) {
    console.error('Error generating QR Code:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Validate QR Code contents
export const validateQRCode = async (req, res) => {
  try {
    const { guestId, eventId, hmac, timestamp } = req.body;

    if (!guestId || !eventId || !hmac || !timestamp) {
      return res.status(400).json({ error: 'Missing QR code data' });
    }

    const expectedHMAC = generateHMAC(guestId, eventId, timestamp);
    if (hmac !== expectedHMAC) {
      return res.status(400).json({ error: 'Invalid QR code (tampered data)' });
    }

    await Checkin.create({
      guestId,
      eventId,
      checkedInAt: new Date(Number(timestamp))
    });

    const qrTimestamp = new Date(Number(timestamp));
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - qrTimestamp) / 60000);
  

    if (timeDiff < 0) {
      return res.status(400).json({ error: 'QR code timestamp is in the future' });
    }

    if (timeDiff > 10) {
      return res.status(400).json({ error: 'QR code expired' });
    }

    return res.status(200).json({
      message: 'QR code is valid',
      guestId,
      eventId,
      timestamp,
      validatedAt: currentTime.toISOString()
    });
  } catch (err) {
    console.error('Error validating QR Code:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Generate and store QR code, mark guest as checked in
export const generateAndStoreQRCode = async (req, res) => {
  try {
    const { guestId, eventId, timestamp } = req.body;

    if (!guestId || !eventId || !timestamp) {
      return res.status(400).json({ error: 'Guest ID, Event ID, and timestamp are required' });
    }

    const guest = await Guest.findByPk(guestId);
    const event = await Event.findByPk(eventId);

    if (!guest || !event) {
      return res.status(404).json({ error: 'Guest or Event not found' });
    }

    guest.checkedIn = true;
    await guest.save();

    const hmac = generateHMAC(guestId, eventId, timestamp);
    const qrData = JSON.stringify({ guestId, eventId, hmac, timestamp });

    const fileName = `${uuidv4()}.png`;
    const filePath = path.join(__dirname, '..', 'qrcodes', fileName);

    await QRCode.toFile(filePath, qrData);

    return res.status(200).json({
      message: 'QR Code generated and stored successfully',
      qrPath: `/qrcodes/${fileName}`,
      data: { guestId, eventId, hmac, timestamp }
    });
  } catch (error) {
    console.error('Error generating and storing QR Code:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
