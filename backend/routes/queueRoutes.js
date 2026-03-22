import express from 'express';
import { getQueueStatus } from '../controllers/queueController.js';

const router = express.Router();

router.get('/status', getQueueStatus);

export default router;
