import express from 'express';
import {generateAndStoreQRCode} from '../controllers/qrcontroller.js';
import { authenticate } from '../middleware/auth.js';
import { validateEventId } from '../middleware/validateEvent.js';

const router = express.Router();

router.post('/generate', generateAndStoreQRCode);

export default router;