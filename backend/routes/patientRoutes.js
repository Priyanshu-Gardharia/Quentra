import express from 'express';
import { registerPatient } from '../controllers/queueController.js';

const router = express.Router();

// Route to register a patient
router.post('/register', registerPatient);

export default router;
