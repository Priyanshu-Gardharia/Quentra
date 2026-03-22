import express from 'express';
import { generateToken, updateTokenStatus } from '../controllers/queueController.js';

const router = express.Router();

router.post('/generate', generateToken);
router.put('/:id/status', updateTokenStatus);

export default router;
