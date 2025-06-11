import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {v4 as uuidv4} from 'uuid';
import AWS from 'aws-sdk'


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

export const QRCode = async (req, res) => {
    try {
        const {guestID, eventID} = req.body;

        // Ensures IDs are present
        if (!guestID || !eventID) {
            return res.status(400).json({error: 'Guest ID and Event ID are required'});
        }

        // Generate HMAC
        const payload = `${guestId} : ${eventID}`;
        const hmac = crypto.createHmac('sha256', secret). update(payload).digest(`hex`);

        //Encode the QR code data

        const qrData = Json.stringify({
            guestID,
            eventID,
            hmac,
            timestamp: Date.now()
        });
        const qrImage = await QRCode.toDataURL(qrData);

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

        // AWS setup
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        const secret = process.env.JWT_SECRET;

        export const generateQRCode = async (req, res) => {
    try {
        const { guestId, eventId } = req.body;
        const timestamp = Date.now();
        const data = `${guestId}:${eventId}`;
        const hmac = crypto.createHmac('sha256', secret)
            .update(data)
            .digest('hex');
            const payload = JSON.stringify({
                guestId,
                eventId,
                hmac,
                timestamp: Date.now()
            });

            // generate qrcode buffer
            const qrBuffer = await QRCode.toBuffer(payload);

            // upload to AWS S3
            const fileName = `qrcodes/guest${guestId}_event${eventId}_created${Date.now()}.png`;

            const uploadParams = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: fileName,
                Body: qrBuffer,
                ContentType: 'image/png',
                ACL: 'public-read' // Make the file publicly readable
            };

            const result = await s3.upload(uploadParams).promise();

            res.status(201).json({
                message: 'QR Code generated successfully',
                qrCodeUrl: result.Location, // URL of the uploaded QR code
                data: {
                    guestId,
                    eventId,
                    hmac,
                    timestamp: Date.now()
                }
            });
        } catch (err) {
            console.error('Error generating QR Code:', err);
            res.status(500).json({ message: 'QRCode generation failed', error: err.message });
        }
    };
export const alreadyCheckedIn = (guestId, eventId) => {
    // This function should check if the guest has already checked in for the event.
    // For now, we will return false to indicate that the guest has not checked in.
    // In a real application, you would query your database to check the check-in status.
    return false; // Placeholder implementation
}