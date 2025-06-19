import { Guest, Event, Checkin } from '../models/index.js';
import {generateQRCode} from '../utils/qrCodeGenerator.js';

export const registerGuestForEvent = async (req, res) => {
    const guestId = req.params.guestId;
    const eventId = req.params.eventId;

    if (!guestId || !eventId) {
        return res.status(400).json({ error: 'Guest ID and Event ID are required.' });
    }

    //checkin if already registered
    const already = await Checkin.findOne({
        where: {
            guestId,
            eventId
        }
    });
    if (already) {
        return res.status(400).json({ error: 'Guest is already registered for this event.' });
    }

    req.body.eventId = eventId;
    return generateQRCode(req, res);
};