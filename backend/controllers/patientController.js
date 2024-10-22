import Patient from '../models/patient.js';

export const createPatient = async (req, res) => {
  try {
    const { no, name, assignedDoctor, dateOfAdmit, diseases, roomNo } = req.body;
    const patient = new Patient({ no, name, assignedDoctor, dateOfAdmit, diseases, roomNo });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPatientCount = async (req, res) => {
  try {
      const count = await Patient.countDocuments();
      res.json({ count });
  } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ message: 'Error fetching user count' });
  }
};
// have to add more CRUD operations
