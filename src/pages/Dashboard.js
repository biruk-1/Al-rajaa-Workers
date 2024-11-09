import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { fetchSponsors, fetchWorkers, updateWorker } from '../services/Firebase'; // Import the fetch and update functions from Firebase
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook

const Dashboard = () => {
  const [sponsorCount, setSponsorCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [workerData, setWorkerData] = useState([]); // To store worker data with sponsor and payment info
  const [loading, setLoading] = useState(true); // Loading state
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State for the edit dialog
  const [currentWorker, setCurrentWorker] = useState(null); // State for the worker being edited

  const { translations, language } = useLanguage(); // Get translations and current language

  const [pendingVisas, setPendingVisas] = useState(0);
  const [paymentsDue, setPaymentsDue] = useState(0);
  // Fetch data from Firestore
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const sponsors = await fetchSponsors();
        const totalWorkers = await fetchWorkers(); // Fetch workers as well

        setSponsorCount(sponsors.length);
        setWorkerCount(totalWorkers.length);

        // Assuming you have logic in Firebase to combine workers and sponsors
        const combinedData = totalWorkers.map(worker => {
          const sponsor = sponsors.find(s => s.id === worker.sponsorId); // Assuming `sponsorId` is used in Worker data
          return {
            id: worker.id, // Store worker ID for editing
            workerName: worker.name,
            sponsorName: sponsor ? sponsor.name : 'Unknown', // If sponsor exists, show their name
            country: worker.country,
            amountPaid: worker.amountPaid, // Assuming amountPaid exists in Worker data
            admin: worker.admin, // Assuming admin saved this
          };
        });
        setWorkerData(combinedData);
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Open the edit dialog with the selected worker's data
  const handleEditClick = (worker) => {
    setCurrentWorker(worker);
    setEditDialogOpen(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = async () => {
    if (currentWorker) {
      await updateWorker(currentWorker.id, currentWorker); // Update the worker in Firestore
      setEditDialogOpen(false); // Close the dialog
      // Optionally, refresh the data or update the state to reflect changes
      setWorkerData(prevData => prevData.map(worker => (worker.id === currentWorker.id ? currentWorker : worker)));
    }
  };

  // Handle input changes in the edit dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorker(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f6f9' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ fontWeight: 'bold', color: '#333', marginBottom: '20px' }}
      >
        {/* Use translation with fallback */}
        {translations?.[language]?.dashboard?.title || 'App Title'}
      </Typography>

      {/* Summary Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff', boxShadow: 5, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
              {/* Use translation with fallback */}
              {translations?.[language]?.dashboard?.totalSponsors || 'Total Sponsors'}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
              {sponsorCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff', boxShadow: 5, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
              {/* Use translation with fallback */}
              {translations?.[language]?.dashboard?.totalWorkers || 'Total Workers'}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
              {workerCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff', boxShadow: 5, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
              {/* Use translation with fallback */}
              {translations?.[language]?.dashboard?.pendingVisas || 'Pending Visas'}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
              {pendingVisas}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#fff', boxShadow: 5, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555' }}>
              {/* Use translation with fallback */}
              {translations?.[language]?.dashboard?.paymentsDue || 'Payments Due'}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
              ${paymentsDue}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, fontWeight: 'bold', color: '#333' }}>
        {/* Use translation with fallback */}
        {translations?.[language]?.dashboard?.workerSponsorData || 'Worker & Sponsor Data'}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        This table indicates the pairing of sponsors and workers, including payment details and the admin responsible for saving the data.
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 5 }}>
        <Table aria-label="worker-sponsor-table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1a73e8' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                {/* Use translation with fallback */}
                {translations?.[language]?.dashboard?.sponsorName || 'Sponsor Name'}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                {/* Use translation with fallback */}
                {translations?.[language]?.dashboard?.workerName || 'Worker Name'}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                {/* Use translation with fallback */}
                {translations?.[language]?.dashboard?.country || 'Country'}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                {/* Use translation with fallback */}
                {translations?.[language]?.dashboard?.amountPaid || 'Amount Paid'}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                {/* Use translation with fallback */}
                {translations?.[language]?.dashboard?.admin || 'Admin'}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>
                {/* Use translation with fallback */}
                {translations?.[language]?.dashboard?.edit || 'Edit'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workerData.map((row, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f4f6f9' } }}>
                <TableCell>{row.sponsorName}</TableCell>
                <TableCell>
                  <TextField
                    value={row.workerName}
                    onChange={(e) => {
                      const updatedData = [...workerData];
                      updatedData[index].workerName = e.target.value;
                      setWorkerData(updatedData);
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.country}
                    onChange={(e) => {
                      const updatedData = [...workerData];
                      updatedData[index].country = e.target.value;
                      setWorkerData(updatedData);
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.amountPaid}
                    onChange={(e) => {
                      const updatedData = [...workerData];
                      updatedData[index].amountPaid = e.target.value;
                      setWorkerData(updatedData);
                    }}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </TableCell>
                <TableCell>{row.admin}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ textTransform: 'none', borderColor: '#1a73e8', color: '#1a73e8' }} onClick={() => handleEditClick(row)}>
                    {/* Use translation with fallback */}
                    {translations?.[language]?.dashboard?.edit || 'Edit'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Worker</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Worker Name"
                fullWidth
                name="workerName"
                value={currentWorker?.workerName || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Sponsor Name"
                fullWidth
                name="sponsorName"
                value={currentWorker?.sponsorName || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Country"
                fullWidth
                name="country"
                value={currentWorker?.country || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount Paid"
                fullWidth
                name="amountPaid"
                value={currentWorker?.amountPaid || ''}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Admin"
                fullWidth
                name="admin"
                value={currentWorker?.admin || ''}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;