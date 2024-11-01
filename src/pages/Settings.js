// src/components/Settings.js
import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/firestore'; // Make sure to add the corresponding Firestore methods
import { TextField, Button, Box, Typography } from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    appName: '',
    appVersion: '',
    // Add more settings fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const getSettings = async () => {
      const data = await fetchSettings();
      if (data) {
        setSettings(data);
      }
      setLoading(false);
    };
    getSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await updateSettings(settings);
    setSuccessMessage('Settings updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Settings</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          <TextField
            label="App Name"
            name="appName"
            value={settings.appName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="App Version"
            name="appVersion"
            value={settings.appVersion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* Add more settings fields here */}
          
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Settings
          </Button>
          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
        </Box>
      )}
    </Box>
  );
};

export default Settings;
