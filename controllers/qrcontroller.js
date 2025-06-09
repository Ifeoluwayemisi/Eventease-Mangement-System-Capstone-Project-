import crypto from 'crypto';
import QRCode from 'qrcode';

export const generateQRCode = async (guestId, eventId) => {
    const timestamp = Date.now();
    const secret = process.env.JWT_SECRET;

    const payload = `${guestId}:${eventId}:${timestamp}`;
    const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    const dataToEncode = JSON.stringify({guestId, eventId, timestamp, hmac });
    const qrCodeDataURL = await QRCode.toDataURL(qrPayLoad);

    res.status(200).json({qrCode: qrCodeDataURL });
} catch (error) {
    res.status(500).json({message: 'QRcode generation failed', error});
}
