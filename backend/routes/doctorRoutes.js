import express from 'express';
import { addDoctor, getDoctors, updateDoctor, deleteDoctor, getAvailableSlots, getDoctorsByDate,getDoctorNameById, getAllDoctors,updateDoctorRating} from '../controllers/doctorController.js';
import { requireSignin, isAdmin } from '../middlewares/auth.js';



const router = express.Router();

router.post('/doctors', addDoctor);
router.get('/doctors', getDoctors);
router.put('/doctors/:id', requireSignin, isAdmin, updateDoctor);
router.delete('/doctors/:id', requireSignin, isAdmin, deleteDoctor);
router.get('/doctors/:doctorId/slots', getAvailableSlots);
router.post('/doctors/by-date', getDoctorsByDate);
router.get('/doctors/:_id', getDoctorNameById);
router.get('/doctorsFind', getAllDoctors);  //new listing doctorlist page in mobile app
router.put('/rating/:doctorName', updateDoctorRating); //new api for updating the rating



export default router;
