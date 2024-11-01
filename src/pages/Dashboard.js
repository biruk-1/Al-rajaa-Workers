import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { fetchSponsors, fetchTotalWorkers } from '../services/Firebase'; // Service functions
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook

// Sample data for chart (replace with your actual data)
const sampleData = [
  { name: 'Jan', sponsors: 30, workers: 20 },
  { name: 'Feb', sponsors: 40, workers: 30 },
  { name: 'Mar', sponsors: 20, workers: 50 },
  { name: 'Apr', sponsors: 60, workers: 40 },
  { name: 'May', sponsors: 50, workers: 70 },
];

const Dashboard = () => {
  const [sponsorCount, setSponsorCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [pendingVisas, setPendingVisas] = useState(0); // You can implement a function to fetch this
  const [paymentsDue, setPaymentsDue] = useState(0); // You can implement a function to fetch this

  const { translations, language } = useLanguage(); // Get translations and current language

  useEffect(() => {
    // Fetch all dashboard data
    const loadDashboardData = async () => {
      try {
        const sponsors = await fetchSponsors();
        const totalWorkers = await fetchTotalWorkers();

        // Update state with fetched data
        setSponsorCount(sponsors.length);
        setWorkerCount(totalWorkers);
        
        // Fetch pending visas and payments due if you have similar functions
        // const pendingVisaCount = await fetchPendingVisas();
        // setPendingVisas(pendingVisaCount);
        
        // const paymentsDueCount = await fetchPaymentsDue();
        // setPaymentsDue(paymentsDueCount);

      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {translations[language].dashboard.title} {/* Use translation here */}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="card">
            <Typography variant="h6">{translations[language].dashboard.totalSponsors}</Typography> {/* Use translation here */}
            <Typography variant="h4">{sponsorCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="card">
            <Typography variant="h6">{translations[language].dashboard.totalWorkers}</Typography> {/* Use translation here */}
            <Typography variant="h4">{workerCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="card">
            <Typography variant="h6">{translations[language].dashboard.pendingVisas}</Typography> {/* Use translation here */}
            <Typography variant="h4">{pendingVisas}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="card">
            <Typography variant="h6">{translations[language].dashboard.paymentsDue}</Typography> {/* Use translation here */}
            <Typography variant="h4">${paymentsDue}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {translations[language].dashboard.chartTitle} {/* Use translation here */}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sponsors" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="workers" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Dashboard;
