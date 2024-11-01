// src/WorkerManagement.js
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { fetchWorkers, addWorker, editWorker } from '../services/Firebase'; // Import your Firebase functions
import { useLanguage } from '../LanguageContext'; // Import your Language Context

const WorkerManagement = () => {
  const { language, translations } = useLanguage(); // Access language and translations
  const [workers, setWorkers] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [newWorker, setNewWorker] = useState({
    name: '',
    nationality: '',
    arrivalDate: '',
    financialDetails: '',
    additionalInfo: '',
  });
  const [editingWorker, setEditingWorker] = useState(null);
  const [open, setOpen] = useState(false); // State for dialog open/close
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const loadWorkers = async () => {
      const workersData = await fetchWorkers();
      setWorkers(workersData);
    };
    loadWorkers();
  }, []);

  const handleAddWorker = async () => {
    await addWorker(newWorker);
    setNewWorker({
      name: '',
      nationality: '',
      arrivalDate: '',
      financialDetails: '',
      additionalInfo: '',
    }); // Reset the form
    const updatedWorkers = await fetchWorkers();
    setWorkers(updatedWorkers);
  };

  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    setOpen(true); // Open the dialog
  };

  const handleUpdateWorker = async () => {
    await editWorker(editingWorker.id, editingWorker);
    setEditingWorker(null);
    setOpen(false); // Close the dialog
    const updatedWorkers = await fetchWorkers();
    setWorkers(updatedWorkers);
  };

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const filteredWorkers = countryFilter
    ? workers.filter(worker => worker.nationality === countryFilter)
    : workers;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {translations[language].workerManagement.title}
      </Typography>

      {/* Add Worker Form */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">{translations[language].workerManagement.addWorker}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].workerManagement.workerName}
              value={newWorker.name}
              onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].workerManagement.nationality}
              value={newWorker.nationality}
              onChange={(e) => setNewWorker({ ...newWorker, nationality: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].workerManagement.arrivalDate}
              type="date"
              value={newWorker.arrivalDate}
              onChange={(e) => setNewWorker({ ...newWorker, arrivalDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].workerManagement.financialDetails}
              value={newWorker.financialDetails}
              onChange={(e) => setNewWorker({ ...newWorker, financialDetails: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].workerManagement.additionalInfo}
              value={newWorker.additionalInfo}
              onChange={(e) => setNewWorker({ ...newWorker, additionalInfo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddWorker}>
              {translations[language].workerManagement.addWorker}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Worker Table */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Select
            fullWidth
            value={countryFilter}
            onChange={handleFilterChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>{translations[language].workerManagement.allNationalities}</em>
            </MenuItem>
            <MenuItem value="Nationality1">Nationality1</MenuItem>
            <MenuItem value="Nationality2">Nationality2</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translations[language].workerManagement.workerName}</TableCell>
              <TableCell>{translations[language].workerManagement.nationality}</TableCell>
              <TableCell>{translations[language].workerManagement.arrivalDate}</TableCell>
              <TableCell>{translations[language].workerManagement.financialDetails}</TableCell>
              <TableCell>{translations[language].workerManagement.additionalInfo}</TableCell>
              <TableCell>{translations[language].workerManagement.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWorkers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.nationality}</TableCell>
                <TableCell>{worker.arrivalDate}</TableCell>
                <TableCell>{worker.financialDetails}</TableCell>
                <TableCell>{worker.additionalInfo}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditWorker(worker)}>
                    {translations[language].workerManagement.editWorker}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredWorkers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Worker Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{translations[language].workerManagement.editWorker}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label={translations[language].workerManagement.workerName}
            value={editingWorker?.name || ''}
            onChange={(e) => setEditingWorker({ ...editingWorker, name: e.target.value })}
          />
          <TextField
            fullWidth
            label={translations[language].workerManagement.nationality}
            value={editingWorker?.nationality || ''}
            onChange={(e) => setEditingWorker({ ...editingWorker, nationality: e.target.value })}
          />
          <TextField
            fullWidth
            label={translations[language].workerManagement.arrivalDate}
            type="date"
            value={editingWorker?.arrivalDate || ''}
            onChange={(e) => setEditingWorker({ ...editingWorker, arrivalDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label={translations[language].workerManagement.financialDetails}
            value={editingWorker?.financialDetails || ''}
            onChange={(e) => setEditingWorker({ ...editingWorker, financialDetails: e.target.value })}
          />
          <TextField
            fullWidth
            label={translations[language].workerManagement.additionalInfo}
            value={editingWorker?.additionalInfo || ''}
            onChange={(e) => setEditingWorker({ ...editingWorker, additionalInfo: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{translations[language].workerManagement.cancel}</Button>
          <Button onClick={handleUpdateWorker} variant="contained">{translations[language].workerManagement.submitChanges}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkerManagement;
