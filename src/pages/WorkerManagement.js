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
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { useLanguage } from '../LanguageContext';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

const WorkerManagement = () => {
  const { language, translations } = useLanguage();
  const navigate = useNavigate();

  // States for workers, adding new worker, and pagination
  const [workers, setWorkers] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [newWorker, setNewWorker] = useState({
    name: '',
    passportNumber: '',
    country: '',
    address: '',
    nationality: '',
    phoneNumber: '',
    homeNumber: '',
    workInformation: '',
    job: '',
    workerImage: '',
    status: 'hired',
  });
  const [editingWorker, setEditingWorker] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lastVisible, setLastVisible] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchWorkersFromFirestore = async () => {
      let workerQuery = query(collection(db, 'workers'), orderBy('name'), limit(rowsPerPage));

      if (lastVisible) {
        workerQuery = query(workerQuery, startAfter(lastVisible));
      }

      const workerSnapshot = await getDocs(workerQuery);
      const workerList = workerSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setWorkers((prevWorkers) => [...prevWorkers, ...workerList]);
      setLastVisible(workerSnapshot.docs[workerSnapshot.docs.length - 1]);
    };

    fetchWorkersFromFirestore();
  }, [page, rowsPerPage]);

  // Handle Image Upload for Worker
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));  // Display preview of uploaded image
      const storageRef = ref(storage, `workerImages/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setNewWorker((prevState) => ({ ...prevState, workerImage: imageUrl }));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  // Add New Worker to Firestore
  const handleAddWorker = async () => {
    const workerCollection = collection(db, 'workers');
    await addDoc(workerCollection, newWorker);
    setNewWorker({
      name: '',
      passportNumber: '',
      country: '',
      address: '',
      nationality: '',
      phoneNumber: '',
      homeNumber: '',
      workInformation: '',
      job: '',
      workerImage: '',
      status: 'hired',
    });
    setImagePreview(null);  // Clear the preview after upload
  };

  // Open Edit Dialog
  const handleEditWorker = (worker) => {
    setEditingWorker(worker);
    setOpenEditDialog(true);  // Open the edit dialog
  };

  // Update Worker in Firestore
  const handleUpdateWorker = async () => {
    const workerDocRef = doc(db, 'workers', editingWorker.id);
    await updateDoc(workerDocRef, editingWorker);
    setEditingWorker(null);
    setOpenEditDialog(false);
  };

  // Pagination Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setWorkers([]);  // Clear workers on page change
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setWorkers([]);  // Clear workers when changing rows per page
  };

  // Filtered workers based on filters (name and country)
  const filteredWorkers = workers.filter((worker) => {
    return (
      (!countryFilter || worker.country.toLowerCase().includes(countryFilter.toLowerCase())) &&
      (!nameFilter || worker.name.toLowerCase().includes(nameFilter.toLowerCase()))
    );
  });

  // Render the worker table
  const renderWorkerTable = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Passport Number/ID</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Home Number</TableCell>
            <TableCell>Work Information</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredWorkers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((worker) => (
            <TableRow key={worker.id}>
              <TableCell>
                <Avatar src={worker.workerImage || ''} alt={worker.name} />
              </TableCell>
              <TableCell>
                <Link to={`/worker/${worker.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                  {worker.name || 'N/A'}
                </Link>
              </TableCell>
              <TableCell>{worker.passportNumber || 'N/A'}</TableCell>
              <TableCell>{worker.country || 'N/A'}</TableCell>
              <TableCell>{worker.address || 'N/A'}</TableCell>
              <TableCell>{worker.nationality || 'N/A'}</TableCell>
              <TableCell>{worker.phoneNumber || 'N/A'}</TableCell>
              <TableCell>{worker.homeNumber || 'N/A'}</TableCell>
              <TableCell>{worker.workInformation || 'N/A'}</TableCell>
              <TableCell>{worker.job || 'N/A'}</TableCell>
              <TableCell>{worker.status}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleEditWorker(worker)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // Render the pagination controls
  const renderPaginationControls = () => (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={filteredWorkers.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{ mt: 2 }}
    />
  );

  // Render the add worker form
  const renderAddWorkerForm = () => (
    <Box sx={{ mb: 3, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6">Add Worker</Typography>
      <Grid container spacing={2}>
        {[
          { label: 'Name', field: 'name' },
          { label: 'Passport Number', field: 'passportNumber' },
          { label: 'Country', field: 'country' },
          { label: 'Address', field: 'address' },
          { label: 'Nationality', field: 'nationality' },
          { label: 'Phone Number', field: 'phoneNumber' },
          { label: 'Home Number', field: 'homeNumber' },
          { label: 'Work Information', field: 'workInformation' },
          { label: 'Job', field: 'job' },
        ].map(({ label, field }) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              label={translations?.[language]?.workerManagement?.[field] || label}
              fullWidth
              value={newWorker[field]}
              onChange={(e) => setNewWorker((prev) => ({ ...prev, [field]: e.target.value }))}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <input type="file" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="preview" width="100" />}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddWorker}>
            Add Worker
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  // Render the edit dialog
  const renderEditDialog = () => (
    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
      <DialogTitle>Edit Worker</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {[
            { label: 'Name', field: 'name' },
            { label: 'Passport Number', field: 'passportNumber' },
            { label: 'Country', field: 'country' },
            { label: 'Address', field: 'address' },
            { label: 'Nationality', field: 'nationality' },
            { label: 'Phone Number', field: 'phoneNumber' },
            { label: 'Home Number', field: 'homeNumber' },
            { label: 'Work Information', field: 'workInformation' },
            { label: 'Job', field: 'job' },
          ].map(({ label, field }) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={translations?.[language]?.workerManagement?.[field] || label}
                fullWidth
                value={editingWorker ? editingWorker[field] : ''} // Provide a fallback value
                onChange={(e) => setEditingWorker((prev) => ({ ...prev, [field]: e.target.value }))}
                disabled={!editingWorker} // Disable input if editingWorker is null
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <input type="file" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="preview" width="100" />}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
        <Button onClick={handleUpdateWorker} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box p={3} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>Worker Management</Typography>
      
      {/* Add Worker Form */}
      {renderAddWorkerForm()}

      {/* Filter Inputs */}
      <Box sx={{ mb: 2, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Filter by Name"
              fullWidth
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Filter by Country"
              fullWidth
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {renderWorkerTable()}
      {renderPaginationControls()}
      {renderEditDialog()}
    </Box>
  );
};

export default WorkerManagement;