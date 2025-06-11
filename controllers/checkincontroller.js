import crypto from 'crypto'
import { Guest, Event } from '..models/index.js';

const secret = process.env.JWT_SECRET || 'default_secret';

export const checkInGuest = async (req, res) => {
   try {
    const {guestId, eventId, hmac, timestamp} = req.body;

    const expectedHMAC = crypto.createHmac('sha256', secret)
    .update(`${guestId}: ${eventId}`)
    .digest(`hex`);

    if (expectedHMAC !== hmac) {
        return res.status(404).json({message: 'Invalid Qr code'});

        const guest = await Guest.findByPk(guestId);
        if (!event) return res.status (404).json ({message: 'Event not found'});

        if (guest.checkedIn) {
            return res.status(400).json({  message: 'Guest already checked in '})
        }
    }
        return res.ststus(200).json({message: 'Check-in successful!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Check-in failed'})
    }
    }

    guest.checkedIn = true;
    await guest.save();