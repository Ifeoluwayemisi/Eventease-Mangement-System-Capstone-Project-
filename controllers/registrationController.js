import dotenv from 'dotenv';
import QRCode from 'qrcode';
import crypto from 'crypto';
import Guest from '../models/guest.js';
import Event from '../models/event.js';

dotenv.config();

export const registerGuest = async (req, res) => {
  const { name, email } = req.body;
  const { id: eventId } = req.params;

  try {
    // Check if event exists
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create guest
    const guest = await Guest.create({ name, email });

    // Associate guest with event (adjust if your model is many-to-many)
    await guest.setEvent(event); // works if Guest belongsTo Event

    // Generate HMAC
    const hmac = crypto.createHmac('sha256', process.env.HMAC_SECRET || 'default_secret');
    const hash = hmac.update(`${guest.id}-${eventId}`).digest('hex');

    // Create QR payload and image
    const qrPayload = { guestId: guest.id, eventId, hash };
    const qrString = JSON.stringify(qrPayload);
    const qrImage = await QRCode.toDataURL(qrString);

    // Optionally: save QR data to DB
    guest.qrCode = qrImage; // Assuming you added a 'qrCode' TEXT column in the Guest model
    await guest.save();

    return res.status(201).json({
      message: 'Guest registered successfully',
      guest,
      qrCode: qrImage
    });
  } catch (err) {
    console.error('Error registering guest:', err);
    return res.status(500).json({ error: 'Failed to register guest' });
  }
};
