import express from 'express';
import { createPatient, getPatients,getPatientCount } from '../controllers/patientController.js';

const router = express.Router();

router.post('/patients', createPatient);
router.get('/patients', getPatients);
router.get('/patients/count',getPatientCount);

// need to add more routes

export default router;
