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
import { useNavigate, Link } from 'react-router-dom';
import { db, storage } from '../firebaseConfig';
import { useLanguage } from '../LanguageContext';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, startAfter, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const SponsorManagement = () => {
  const { language, translations } = useLanguage();
  const navigate = useNavigate();

  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [searchQueryCountry, setSearchQueryCountry] = useState('');
  const [searchQueryName, setSearchQueryName] = useState('');
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    passportNumber: '',
    country: '',
    address: '',
    nationality: '',
    phoneNumber: '',
    homeNumber: '',
    workInformation: '',
    sponsorJob: '',
    sponsorImage: '',
    status: 'hired',
  });
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lastVisible, setLastVisible] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch sponsors from Firestore
  const fetchSponsors = async () => {
    let sponsorQuery = query(collection(db, 'sponsors'), orderBy('name'), limit(rowsPerPage));

    if (lastVisible) {
      sponsorQuery = query(sponsorQuery, startAfter(lastVisible));
    }

    const sponsorSnapshot = await getDocs(sponsorQuery);
    const sponsorList = sponsorSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setSponsors(sponsorList);
    setLastVisible(sponsorSnapshot.docs[sponsorSnapshot.docs.length - 1]);
  };

  useEffect(() => {
    fetchSponsors();
  }, [page, rowsPerPage]);

  // Handle image upload and preview
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const storageRef = ref(storage, `sponsorImages/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setNewSponsor((prevState) => ({ ...prevState, sponsorImage: imageUrl }));
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const handleAddSponsor = async () => {
    const sponsorCollection = collection(db, 'sponsors');
    await addDoc(sponsorCollection, newSponsor);
    setNewSponsor({
      name: '',
      passportNumber: '',
      country: '',
      address: '',
      nationality: '',
      phoneNumber: '',
      homeNumber: '',
      workInformation: '',
      sponsorJob: '',
      sponsorImage: '',
      status: 'hired',
    });
    setImagePreview(null); // Clear the preview after upload
    fetchSponsors(); // Fetch sponsors after adding
  };

  const handleEditSponsor = (sponsor) => {
    setEditingSponsor(sponsor);
    setOpenEditDialog(true);
  };

  const handleUpdateSponsor = async () => {
    const sponsorDocRef = doc(db, 'sponsors', editingSponsor.id);
    await updateDoc(sponsorDocRef, editingSponsor);
    setEditingSponsor(null);
    setOpenEditDialog(false);
    fetchSponsors(); // Fetch sponsors after updating
  };

  const handleSearchChangeCountry = (event) => {
    setSearchQueryCountry(event.target.value);
  };

  const handleSearchChangeName = (event) => {
    setSearchQueryName(event.target.value);
  };

  const filterSponsors = () => {
    const queryCountry = searchQueryCountry.toLowerCase();
    const queryName = searchQueryName.toLowerCase();

    const filteredList = sponsors.filter(
      (sponsor) =>
        sponsor.country.toLowerCase().includes(queryCountry) &&
        sponsor.name.toLowerCase().includes(queryName)
    );
    setFilteredSponsors(filteredList);
  };

  useEffect(() => {
    filterSponsors();
  }, [searchQueryCountry, searchQueryName, sponsors]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchSponsors(); // Fetch sponsors when changing page
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchSponsors(); // Fetch sponsors when changing rows per page
  };

  const renderSponsorTable = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{translations?.[language]?.sponsorManagement?.photo || 'Photo'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.name || 'Name'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.passportNumber || 'Passport Number/ID'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.country || 'Country'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.address || 'Address'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.nationality || 'Nationality'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.phoneNumber || 'Phone Number'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.homeNumber || 'Home Number'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.workInformation || 'Work Information'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.job || 'Job'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.status || 'Status'}</TableCell>
            <TableCell>{translations?.[language]?.sponsorManagement?.actions || 'Actions'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSponsors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sponsor) => (
            <TableRow key={sponsor.id}>
              <TableCell>
                <Avatar src={sponsor.sponsorImage || ''} alt={sponsor.name} />
              </TableCell>
              <TableCell>
                <Link to={`/sponsor/${sponsor.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                  {sponsor.name || 'N/A'}
                </Link>
              </TableCell>
              <TableCell>{sponsor.passportNumber || 'N/A'}</TableCell>
              <TableCell>{sponsor.country || 'N/A'}</TableCell>
              <TableCell>{sponsor.address || 'N/A'}</TableCell>
              <TableCell>{sponsor.nationality || 'N/A'}</TableCell>
              <TableCell>{sponsor.phoneNumber || 'N/A'}</TableCell>
              <TableCell>{sponsor.homeNumber || 'N/A'}</TableCell>
              <TableCell>{sponsor.workInformation || 'N/A'}</TableCell>
              <TableCell>{sponsor.sponsorJob || 'N/A'}</TableCell>
              <TableCell>{sponsor.status}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => handleEditSponsor(sponsor)}>
                  {translations?.[language]?.sponsorManagement?.edit || 'Edit'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderPaginationControls = () => (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={filteredSponsors.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{ mt: 2 }}
    />
  );

  const renderEditDialog = () => (
    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
      <DialogTitle>Edit Sponsor</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {Object.keys(newSponsor).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                label={translations?.[language]?.sponsorManagement?.[key] || key}
                fullWidth
                value={editingSponsor ? editingSponsor[key] : ''}
                onChange={(e) => setEditingSponsor((prev) => ({ ...prev, [key]: e.target.value }))}
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
        <Button onClick={handleUpdateSponsor} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {translations?.[language]?.sponsorManagement?.title || 'Sponsor Management'}
      </Typography>

      {/* Add Sponsor Form Section */}
      <Box sx={{ mb: 3, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6">{translations?.[language]?.sponsorManagement?.addSponsor || 'Add Sponsor'}</Typography>
        <Grid container spacing={3}>
          {Object.keys(newSponsor).map((key) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <TextField
                label={translations?.[language]?.sponsorManagement?.[key] || key}
                variant="outlined"
                value={newSponsor[key]}
                onChange={(e) => setNewSponsor({ ...newSponsor, [key]: e.target.value })}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="contained" component="label">
              Upload Sponsor Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img src={imagePreview} alt="Image Preview" width="100%" />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={handleAddSponsor}>
            {translations?.[language]?.sponsorManagement?.add || 'Add Sponsor'}
          </Button>
        </Box>
      </Box>

      {/* Filter Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, backgroundColor: '#fff', p: 2, borderRadius: 2, boxShadow: 2 }}>
        <TextField
          label="Filter by Name"
          variant="outlined"
          value={searchQueryName}
          onChange={handleSearchChangeName}
          fullWidth
        />
        <TextField
          label="Filter by Country"
          variant="outlined"
          value={searchQueryCountry}
          onChange={handleSearchChangeCountry}
          fullWidth
        />
      </Box>

      {/* Sponsor List Table */}
      {renderSponsorTable()}
      {renderPaginationControls()}
      {renderEditDialog()}
    </Box>
  );
};

export default SponsorManagement;