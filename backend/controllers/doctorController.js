// controllers/doctorController.js
import Doctor from '../models/doctor.js';
import mongoose from 'mongoose';

export const addDoctor = async (req, res) => {   //changed
  try {
    const { name, department, availableDate, availableTime, city, description, consultantFee, experience, rating, visingHours} = req.body;
    const doctor = new Doctor({ name, department, availableDate, availableTime, city, description, consultantFee, experience, rating, visingHours });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const { department } = req.query;
    const doctors = await Doctor.find({ department });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const doctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAvailableSlots = async (req, res) => {
    const { doctorId, date } = req.query;
  
  try {
    const doctor = await Doctor.findById(doctorId).populate('availableTime');
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const availableSlots = doctor.availableTime.filter(slot => {
      // You can add additional logic here if necessary to filter by date
      return slot.date === date;
    });

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  };

 /* export const getDoctorsByDate = async (req, res) => {
    const { department, date } = req.query;
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
  
    try {
      const doctors = await Doctor.find({
        department: department,
        availableDate: { $gte: startOfDay, $lte: endOfDay }
      });
  
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };*/

  export const getDoctorsByDate = async (req, res) => {
    try {
      const { availableDate, department } = req.body;
      const date = new Date(availableDate);
      const startOfDay = new Date(date.setUTCHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setUTCHours(23, 59, 59, 999));
  
      const doctors = await Doctor.find({
        availableDate: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
        department: department, // Filter by department
      });
  
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctors', error });
    }
  };
  
  export const getDoctorNameById = async (req, res) => {
    try {
        const { _id } = req.params;  // Getting _id from route params
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid Doctor ID' });
        }

        const doctor = await Doctor.findById(_id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json({ name: doctor.name });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor', error: error.message });
    }
};

//new listing doctorlist page in mobile app

// Controller function to get all doctors
export const getAllDoctors = async (req, res) => {
  console.log("getAllDoctors function was called");
  try {
    const doctors = await Doctor.find({}, {
      name: 1,
      department: 1,
      city: 1,
      experience: 1,
      consultantFee: 1,
      visingHours: 1,
      rating: 1,
      description: 1
    });
    res.status(200).json(doctors);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

//new controller for rating........................

export const updateDoctorRating = async (req, res) => {
  const { doctorName } = req.params;
  const { rating } = req.body;

  try {
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update the rating
    doctor.rating = rating;
    await doctor.save();

    res.status(200).json({ message: 'Rating updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



  



