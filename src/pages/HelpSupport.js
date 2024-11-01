// src/components/HelpSupport.js
import React, { useState, useEffect } from 'react';
import { addSupportRequest, fetchSupportRequests } from '../services/firestore'; // Ensure Firestore methods are implemented
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const HelpSupport = () => {
  const [supportData, setSupportData] = useState({
    subject: '',
    message: '',
  });
  const [supportRequests, setSupportRequests] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const getSupportRequests = async () => {
      const requests = await fetchSupportRequests();
      setSupportRequests(requests);
    };
    getSupportRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await addSupportRequest(supportData);
    setSuccessMessage('Support request submitted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    setSupportData({ subject: '', message: '' }); // Clear form after submission
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Help & Support</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>Submit a Request</Typography>
      <TextField
        label="Subject"
        name="subject"
        value={supportData.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Message"
        name="message"
        value={supportData.message}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {successMessage && <Typography color="success.main">{successMessage}</Typography>}

      <Typography variant="h6" sx={{ mt: 4 }}>Support Requests</Typography>
      <List>
        {supportRequests.map((request) => (
          <ListItem key={request.id}>
            <ListItemText
              primary={request.subject}
              secondary={request.message}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HelpSupport;
