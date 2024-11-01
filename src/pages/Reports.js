import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import jsPDF from 'jspdf';

const Reports = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Function to generate the PDF report
  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text('Report', 20, 20);
    
    // Add start and end dates
    doc.setFontSize(12);
    doc.text(`Start Date: ${startDate.toLocaleDateString()}`, 20, 40);
    doc.text(`End Date: ${endDate.toLocaleDateString()}`, 20, 50);

    // Save the PDF
    doc.save('report.pdf');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <h1>Generate Reports</h1>
        
        <DesktopDatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        
        <DesktopDatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />

        {/* Call the generatePDF function when button is clicked */}
        <Button variant="contained" onClick={generatePDF}>
          Generate Report
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;
