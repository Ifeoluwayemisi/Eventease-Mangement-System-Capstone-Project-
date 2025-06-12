export const validateQRCodeInput = (req, res, next) => {
    const { guestId, eventId, hmac, timestamp } = req.body;

    if (!guestId || !eventId || !hmac || !timestamp) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate that guestId and eventId are valid UUIDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(guestId) || !uuidRegex.test(eventId)) {
        return res.status(400).json({ message: 'Invalid guestId or eventId format' });
    }

    // Validate timestamp is a valid number
    if (isNaN(Date.parse(timestamp))) {
        return res.status(400).json({ message: 'Invalid timestamp format' });
    }

    next();
}