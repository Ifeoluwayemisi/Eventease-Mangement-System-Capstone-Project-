import express from 'express';
import {
  generateQRCode,
  validateQRCode,
  viewAllCheckins,
} from '../controllers/qrcontroller.js';

const router = express.Router();

router.post('/', generateQRCode);         // POST /api/checkins/
router.post('/validate', validateQRCode);         // POST /api/checkins/validate
router.get('/', viewAllCheckins);                 // GET  /api/checkins/

export default router;
