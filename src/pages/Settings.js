// src/components/Settings.js
import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/firestore'; // Make sure to add the corresponding Firestore methods
import { TextField, Button, Box, Typography } from '@mui/material';

const Settings = () => {
  const [settings, setSettings] = useState({
    appName: '',
    appVersion: '',
    userName: '',
    userEmail: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    try {
      await updateSettings(settings); // Update both app settings and user profile/password
      setSuccessMessage('Settings updated successfully!');
      setErrorMessage('');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      setErrorMessage('Error updating settings. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Settings</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box>
          {/* Update profile fields */}
          <TextField
            label="User Name"
            name="userName"
            value={settings.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User Email"
            name="userEmail"
            value={settings.userEmail}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            name="password"
            value={settings.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Update app settings fields */}
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

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Settings
          </Button>

          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
          {errorMessage && <Typography color="error.main">{errorMessage}</Typography>}
        </Box>
      )}
    </Box>
  );
};

export default Settings;
