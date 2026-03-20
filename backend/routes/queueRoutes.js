import express from 'express';
import { addToQueue, getQueue, updateStatus, getNextPatient } from '../controllers/queueController.js';

const router = express.Router();

router.post('/', addToQueue);
router.get('/', getQueue);
router.get('/next', getNextPatient);
router.put('/:id', updateStatus);

export default router;
