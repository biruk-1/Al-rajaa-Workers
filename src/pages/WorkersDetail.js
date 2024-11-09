import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Paper,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchWorkerById } from '../services/Firebase'; // Adjust the import based on your structure
import { useLanguage } from '../LanguageContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const WorkersDetail = () => {
  const { language, translations } = useLanguage();
  const { id } = useParams(); // Extract the worker ID from the URL
  const [worker, setWorker] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [updatedWorker, setUpdatedWorker] = useState({});

  useEffect(() => {
    const loadWorker = async () => {
      const workerData = await fetchWorkerById(id);
      setWorker(workerData);
      setUpdatedWorker(workerData); // Initialize updatedWorker with fetched data
    };
    loadWorker();
  }, [id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Display preview of uploaded image
      const storageRef = ref(storage, `workerImages/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setUpdatedWorker((prevState) => ({ ...prevState, workerImage: imageUrl }));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleUpdateWorker = async () => {
    // Update worker logic here (e.g., update in Firestore)
    // After updating, you can close the dialog and refresh the worker data
    setOpenEditDialog(false);
  };

  if (!worker) return <Typography>Loading...</Typography>;

  return (
    <Box p={3} sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {translations?.[language]?.workerDetails?.title || "Worker Details"}
      </Typography>

      <Paper sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar src={worker.workerImage || ''} alt={worker.name} sx={{ width: 120, height: 120 }} />
            <input type="file" onChange={handleImageUpload} style={{ marginTop: '10px' }} />
            {imagePreview && <img src={imagePreview} alt="preview" width="100%" style={{ marginTop: '10px' }} />}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">{translations?.[language]?.workerDetails?.name || "Name"}: {worker.name || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.passportNumber || "Passport Number"}: {worker.passportNumber || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.country || "Country"}: {worker.country || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.address || "Address"}: {worker.address || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.nationality || "Nationality"}: {worker.nationality || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.phoneNumber || "Phone Number"}: {worker.phoneNumber || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.homeNumber || "Home Number"}: {worker.homeNumber || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.workInformation || "Work Information"}: {worker.workInformation || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.job || "Job"}: {worker.job || "N/A"}</Typography>
            <Typography variant="body1">{translations?.[language]?.workerDetails?.status || "Status"}: {worker.status || "N/A"}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={() => setOpenEditDialog(true)}>
            Edit Worker
          </Button>
        </Box>
      </Paper>

      {/* Edit Dialog */}
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
                  label={translations?.[language]?.workerDetails?.[field] || label}
                  fullWidth
                  value={updatedWorker[field] || ''}
                  onChange={(e) => setUpdatedWorker((prev) => ({ ...prev, [field]: e.target.value }))}
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
    </Box>
  );
};

export default WorkersDetail;