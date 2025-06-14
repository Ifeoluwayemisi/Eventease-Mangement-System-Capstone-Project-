import express from 'express';
import {Router} from 'express';
import {validateQRCode, generateAndStoreQRCode} from '../controllers/qrcontroller.js';
import { authenticate } from '../middleware/auth.js';
import { validateEventId } from '../middleware/validateEvent.js';

const router = express.Router();

router.post('/generate', generateAndStoreQRCode);
router.post('/validate', validateQRCode);
router.post('/authenticate', authenticate, generateAndStoreQRCode);

export default router;