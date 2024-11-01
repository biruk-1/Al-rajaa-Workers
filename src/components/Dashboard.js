// src/components/Dashboard.js
import React from 'react';
import { Button } from '@mui/material';
import { logoutUser } from '../services/Firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
