import crypto from 'crypto'
import Guest from '..models/Guest.js';

export const checkInGuest = async (req, res) => {
    const { guestId, eventId hash} = req.body;

    const hmac = crypto.createHmac('sha256', process.env.JWT_SECRET);
    const validHash = hmac.update(`${guestId}${eventId}`).digest('hex');

    if (hash !== validHash) {
        return res.status(400).json({error: 'Invalid QR code'});
    }
    const guest = await Guest.findByPk(guestId);
    if (!guest) return res.status(404).json({eror: 'Guest not found'});

    if (guest.checkedIn) {
        return res.status(400).json({error: 'Guest already checked in'});
    }

    guest.checkedIn = true;
    await guest.save();

    res.json({message: 'Check-in successfull'})
};