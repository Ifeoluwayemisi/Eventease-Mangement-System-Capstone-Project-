import QRcode from 'qrcode';
import crypto from 'crypto';
import Guest from '../models/guest.js';
import Event from '../models/event.js';

export const registerGuest = async (req, res) => {
    const { name, email} = req.body;
    const {id: eventId} = req.params;

    try {
        const guest = await Guest.create({
            name,
            email
         });

         //To generate HMAC 
         const hmac = crypto.createhmac('sha256', process.env.HMAC_SECRET);
         const hash = hmac.update(`${guest.id}-${eventId}`).digest('hex');

            // Generate QR code with the hash
        const qrPayload = { guestId: guest.id, eventId, hash };
        const qrstring = JSON.stringify(qrPayload);
        const qrimage = await QRcode.toDataURL(qrstring);

        res.status(201).json({ qrCode: qrimage, guest });
    } catch (err) {
        res.status(500).json({error: 'Failed to register guest.'});
    }
};