// controllers/reportController.js
import Report from '../models/report.js';

export const createReport = async (req, res) => {
  try {
    const { patientName, doctorName, contactNumber, totalCharge, attachedPdf } = req.body;

    const report = new Report({
      patientName,
      doctorName,
      contactNumber,
      totalCharge,
      attachedPdf
    });

    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReportCount = async (req, res) => {
  try {
      const count = await Report.countDocuments();
      res.json({ count });
  } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ message: 'Error fetching user count' });
  }
};

//for mobile app

export const getReportByEmail = async (req, res) => {
  const { email } = req.query;
  console.log('Received email query:', req.query);  // Debugging log
  try {
    const reports = await Report.find({
      email: { $regex: new RegExp(email, "i") }  // Case-insensitive search
    }).select('doctorName attachedPdf createdAt reportTitle');
    
    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this user' });
    }

    res.status(200).json(reports);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



