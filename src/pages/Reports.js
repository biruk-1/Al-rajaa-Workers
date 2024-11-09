import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import jsPDF from 'jspdf';

const Reports = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [workers, setWorkers] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  // Fetch worker and sponsor data (assuming you have this from an API or Firebase)
  useEffect(() => {
    // Replace with your actual data fetching logic (e.g., Firebase, API call)
    setWorkers([
      { id: 1, name: 'John Doe', sponsorId: 1, amountPaid: 1000 },
      { id: 2, name: 'Jane Smith', sponsorId: 2, amountPaid: 1200 },
    ]);
    setSponsors([
      { id: 1, name: 'Sponsor A' },
      { id: 2, name: 'Sponsor B' },
    ]);
  }, []);

  // Function to generate the PDF report
  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(16);
    doc.text('Receipt Report', 20, 20);

    // Add start and end dates
    doc.setFontSize(12);
    doc.text(`Start Date: ${startDate.toLocaleDateString()}`, 20, 30);
    doc.text(`End Date: ${endDate.toLocaleDateString()}`, 20, 40);

    // Add a line for separation
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Add worker and sponsor details
    doc.setFontSize(12);
    let yPosition = 55; // Start y-position for the worker rows

    workers.forEach(worker => {
      const sponsor = sponsors.find(s => s.id === worker.sponsorId);
      const sponsorName = sponsor ? sponsor.name : 'Unknown';
      const amountPaid = worker.amountPaid;

      // Adding worker's information in a receipt format
      doc.text(`Worker: ${worker.name}`, 20, yPosition);
      doc.text(`Sponsor: ${sponsorName}`, 20, yPosition + 10);
      doc.text(`Amount Paid: $${amountPaid}`, 20, yPosition + 20);
      yPosition += 30; // Move to the next line

      // Add a line between entries for better visual separation
      doc.setLineWidth(0.5);
      doc.line(20, yPosition, 190, yPosition);
      yPosition += 5; // Move down after the line
    });

    // Save the PDF
    doc.save('receipt_report.pdf');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3 }}>
        <h1>Generate Receipt Report</h1>

        {/* Start and End Date Pickers */}
        <DesktopDatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
        />

        <DesktopDatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ marginBottom: 2 }} />}
        />

        {/* Button to generate PDF */}
        <Button variant="contained" onClick={generatePDF} sx={{ backgroundColor: '#1a73e8', '&:hover': { backgroundColor: '#0059b3' } }}>
          Generate Report
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;
