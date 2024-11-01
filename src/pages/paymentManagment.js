// src/components/Payment.js
import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Paper, Button, TextField } from '@mui/material';
import { fetchPayments, addPayment } from '../services/Firebase'; // Import payment functions

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all payments when the component mounts
    const loadPayments = async () => {
      const paymentData = await fetchPayments();
      setPayments(paymentData);
    };
    loadPayments();
  }, []);

  const handleAddPayment = async () => {
    if (!amount || !description) {
      setError('Please provide both amount and description.');
      return;
    }

    // Prepare payment data
    const paymentData = {
      amount: parseFloat(amount),
      description,
      date: new Date().toISOString(),
    };

    await addPayment(paymentData);
    setAmount('');
    setDescription('');
    setError('');
    
    // Reload payments after adding a new payment
    const paymentDataList = await fetchPayments();
    setPayments(paymentDataList);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment Management
      </Typography>
      
      {/* Form to add new payment */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add New Payment</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPayment}
          sx={{ mt: 2 }}
        >
          Add Payment
        </Button>
      </Paper>

      {/* Display list of payments */}
      <Typography variant="h6" gutterBottom>
        Payments List
      </Typography>
      <Grid container spacing={2}>
        {payments.map((payment) => (
          <Grid item xs={12} sm={6} md={4} key={payment.id}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="body1">Amount: ${payment.amount.toFixed(2)}</Typography>
              <Typography variant="body2">Description: {payment.description}</Typography>
              <Typography variant="body2">Date: {new Date(payment.date).toLocaleDateString()}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PaymentManagement;
