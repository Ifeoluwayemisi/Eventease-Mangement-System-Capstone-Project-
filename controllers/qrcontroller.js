import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {v4 as uuidv4} from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//load secret key from environment variable
const SECRET = process.env.JWT_SECRET || 'default_secret';

//HMAC helper function
const generateHMAC = (guestId, eventId) => {
    const timestamp = Date.now();
    const payload = `${guestId}:${eventId}:${timestamp}`;
    return crypto.createHmac('sha256',SECRET).update(payload).digest('hex');
};

export const generateQRCode = async (req, res) => {
    try {
        const {guestID, eventID} = req.body;
        if (!guestID || !eventID) {
            return res.status(400).json({error: 'Guest ID and Event ID are required'});
        }
        const hmac = generateHMAC(guestID, eventID);
        const qrPayload = Json.stringify({
            guestID,
            eventID,
            hmac,
            timestamp: Date.now()
        });

        const fileName = `${uuidv4()}.png`;
        const filePath = path.join(__dirname, '..qrcodes', fileName);

        await QRCode.toFile(filePath, qrPayload);

        return res.status(201).json({
            message: 'QR Code generated successfully',
            file: `/qrcodes/${fileName}`,
            data: {
                guestID,
                eventID,
                hmac,
                timestamp: Date.now()
            }
        });
    } catch (error) {
        console.error('Error generating QR Code:', error);
        return res.status(500).json({error: 'Internal Server Error'});
    }
};

export const validateQRCode = async (req, res) => {
    try {
    const {guestID, eventID, hmac, timestamp} = req.body;
        if (!guestId || !eventId || !hmac || !timestamp) {
      return res.status(400).json({ error: 'Missing QR code data' });
        }

        // Recreate HMAC
        const expectedHMAC = crypto
        .createHMAC('sha256', SECRET)
        .update(`${guestID}:${eventID}:${timestamp}`)
        .digest('hex');

        if (hmac !== expectedHMAC) {
            return res.status(400).json({ error: 'Invalid QR code (tampered data)' });
        }

        // Check if the timestamp is within a reasonable range (e.g., 10 minutes)
        const qrTimestamp = new Date(timestamp);
        const currentTime = new Date();
        const timeDifference = currentTime - qrTimestamp;
        const differenceInMinutes = Math.floor(timeDifference / 60000);

        // If the QR code timestamp is in the future, return an error
        if (differenceInMinutes < 0) {
            return res.status(400).json({ error: 'QR code timestamp is in the future' });
        }
        // If the QR code is older than 10 minutes, consider it expired
        if (differenceInMinutes > 10) {
            return res.status(400).json({ error: 'QR code expired' });
        }

        // if guest has already checked in, return error
        if (alreadyCheckedIn(guestID, eventID)) {
            return res.status(400).json({ error: 'Guest has already checked in' });
        }

        return res.status(200).json({
             message: 'QR code is valid',
             guestId,
             eventId,
             timestamp,
             validatedat: new Date().toISOString() 
            });
    
    } catch (err) {
        console.error('Error validating QR Code:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

        