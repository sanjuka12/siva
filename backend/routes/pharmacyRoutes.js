// routes/medicineRoutes.js
import express from 'express';
import { addMedicine, getAllMedicines, updateMedicine, deleteMedicine, getAllDrugs } from '../controllers/pharmacyContoller.js';

const router = express.Router();

router.post('/medicines', addMedicine);           // Add a new medicine
router.get('/getallmedicines', getAllMedicines);        // Get all medicines
router.put('/medicines/:id', updateMedicine);     // Update a medicine by ID
router.delete('/medicines/:id', deleteMedicine); // Delete a medicine by ID
router.get('/drugs', getAllDrugs); //new for mobile up druglist

export default router;
