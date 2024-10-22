// controllers/medicineController.js
import Medicine from '../models/pharmacy.js';

// Add a new medicine
export const addMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all medicines
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Update a medicine
export const updateMedicine = async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a medicine
export const deleteMedicine = async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllDrugs = async (req, res) => {
  console.log("Received request for all drugs"); // Add this line
  try {
    const medicines = await Medicine.find({}); // Fetch all medicines from the database
    if (!medicines || medicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found' });
    }
    res.status(200).json(medicines); // Send the list of medicines
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: err.message }); // Handle any errors
  }
};