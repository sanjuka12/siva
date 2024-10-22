// routes/reportRoutes.js
import express from 'express';
import { createReport, getReports, getReportCount, getReportByEmail, } from '../controllers/reportController.js';

const router = express.Router();

router.post('/reports', createReport);
router.get('/reports', getReports);
router.get('/reports/count',getReportCount);
router.get('/report', getReportByEmail); // new for mobile app 

router.get('/download/:id', async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
  
      if (!report || !report.attachedPdf) {
        return res.status(404).json({ error: 'Report or PDF not found' });
      }
  
      // Ensure the PDF path is correct and safe
      const pdfPath = path.join(__dirname, '../uploads', report.attachedPdf);
      
      res.download(pdfPath); // Download the file
    } catch (error) {
      res.status(500).json({ error: 'Error downloading the PDF' });
    }
  });

export default router;
