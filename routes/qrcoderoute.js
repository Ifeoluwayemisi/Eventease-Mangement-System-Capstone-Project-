import express from 'express';
import {generateQRCode, validateQRCode} from '../controllers/qrcodecontroller.js';
import { authenticate } from '../middleware/auth.js';
import { validateEventId } from '../middleware/validateEvent.js';

const router = express.Router();

router.post('/generate', generateQRCode);

export default router;