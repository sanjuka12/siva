import express from 'express';
import { createAppointment,getAppointments,getAppointmentCount,getAppointmentsByEmail} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/', getAppointments);
router.get('/appointments/count',getAppointmentCount)
router.get('/appointments_by_usersId', getAppointmentsByEmail) //new
export default router;