import express from 'express';
import { registerPatient, getPatients } from '../controllers/patientController.js';

const router = express.Router();

// Route to register a patient
router.post('/', registerPatient);

// Route to get all patients
router.get('/', getPatients);

export default router;
