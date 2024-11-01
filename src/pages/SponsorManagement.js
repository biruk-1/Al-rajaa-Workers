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
import { fetchSponsors, addSponsor, editSponsor } from '../services/Firebase'; // Import your Firebase functions
import { useLanguage } from '../LanguageContext'; // Import useLanguage hook

const SponsorManagement = () => {
  const { language, translations } = useLanguage(); // Access language and translations
  const [sponsors, setSponsors] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    contractNumber: '',
    visaArrivalDate: '',
    country: '',
    financialDetails: '',
    additionalInfo: '',
  });
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const loadSponsors = async () => {
      const sponsorsData = await fetchSponsors();
      setSponsors(sponsorsData);
    };
    loadSponsors();
  }, []);

  const handleAddSponsor = async () => {
    await addSponsor(newSponsor);
    setNewSponsor({
      name: '',
      contractNumber: '',
      visaArrivalDate: '',
      country: '',
      financialDetails: '',
      additionalInfo: '',
    }); // Reset the form
    const updatedSponsors = await fetchSponsors();
    setSponsors(updatedSponsors);
  };

  const handleEditSponsor = (sponsor) => {
    setEditingSponsor(sponsor);
    setOpenEditDialog(true);
  };

  const handleUpdateSponsor = async () => {
    await editSponsor(editingSponsor.id, editingSponsor);
    setEditingSponsor(null);
    setOpenEditDialog(false);
    const updatedSponsors = await fetchSponsors();
    setSponsors(updatedSponsors);
  };

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const filteredSponsors = countryFilter
    ? sponsors.filter(sponsor => sponsor.country === countryFilter)
    : sponsors;

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
        {translations[language].sponsorManagement?.title || "Sponsor Management"}
      </Typography>

      {/* Add Sponsor Form */}
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">{translations[language].sponsorManagement?.addSponsor || "Add Sponsor"}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].sponsorManagement?.sponsorName || "Sponsor Name"}
              value={newSponsor.name}
              onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].sponsorManagement?.contractNumber || "Contract Number"}
              value={newSponsor.contractNumber}
              onChange={(e) => setNewSponsor({ ...newSponsor, contractNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].sponsorManagement?.visaArrivalDate || "Visa Arrival Date"}
              type="date"
              value={newSponsor.visaArrivalDate}
              onChange={(e) => setNewSponsor({ ...newSponsor, visaArrivalDate: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].sponsorManagement?.country || "Country"}
              value={newSponsor.country}
              onChange={(e) => setNewSponsor({ ...newSponsor, country: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].sponsorManagement?.financialDetails || "Financial Details"}
              value={newSponsor.financialDetails}
              onChange={(e) => setNewSponsor({ ...newSponsor, financialDetails: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translations[language].sponsorManagement?.additionalInfo || "Additional Info"}
              value={newSponsor.additionalInfo}
              onChange={(e) => setNewSponsor({ ...newSponsor, additionalInfo: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddSponsor}>
              {translations[language].sponsorManagement?.addButton || "Add Sponsor"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Filter Sponsors */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Select
            fullWidth
            value={countryFilter}
            onChange={handleFilterChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>{translations[language].sponsorManagement?.allCountries || "All Countries"}</em>
            </MenuItem>
            <MenuItem value="Country1">Country1</MenuItem>
            <MenuItem value="Country2">Country2</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Sponsor Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.name || "Name"}</TableCell>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.contractNumber || "Contract Number"}</TableCell>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.visaArrivalDate || "Visa Arrival Date"}</TableCell>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.country || "Country"}</TableCell>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.financialDetails || "Financial Details"}</TableCell>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.additionalInfo || "Additional Info"}</TableCell>
              <TableCell>{translations[language].sponsorManagement?.tableHeaders?.actions || "Actions"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSponsors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sponsor) => (
              <TableRow key={sponsor.id}>
                <TableCell>{sponsor.name}</TableCell>
                <TableCell>{sponsor.contractNumber}</TableCell>
                <TableCell>{sponsor.visaArrivalDate}</TableCell>
                <TableCell>{sponsor.country}</TableCell>
                <TableCell>{sponsor.financialDetails}</TableCell>
                <TableCell>{sponsor.additionalInfo}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditSponsor(sponsor)}>
                    {translations[language].sponsorManagement?.edit || "Edit"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredSponsors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Sponsor Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>{translations[language].sponsorManagement?.editSponsor || "Edit Sponsor"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={translations[language].sponsorManagement?.sponsorName || "Sponsor Name"}
                value={editingSponsor?.name || ''}
                onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={translations[language].sponsorManagement?.contractNumber || "Contract Number"}
                value={editingSponsor?.contractNumber || ''}
                onChange={(e) => setEditingSponsor({ ...editingSponsor, contractNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={translations[language].sponsorManagement?.visaArrivalDate || "Visa Arrival Date"}
                type="date"
                value={editingSponsor?.visaArrivalDate || ''}
                onChange={(e) => setEditingSponsor({ ...editingSponsor, visaArrivalDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={translations[language].sponsorManagement?.country || "Country"}
                value={editingSponsor?.country || ''}
                onChange={(e) => setEditingSponsor({ ...editingSponsor, country: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={translations[language].sponsorManagement?.financialDetails || "Financial Details"}
                value={editingSponsor?.financialDetails || ''}
                onChange={(e) => setEditingSponsor({ ...editingSponsor, financialDetails: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={translations[language].sponsorManagement?.additionalInfo || "Additional Info"}
                value={editingSponsor?.additionalInfo || ''}
                onChange={(e) => setEditingSponsor({ ...editingSponsor, additionalInfo: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>{translations[language].cancel || "Cancel"}</Button>
          <Button onClick={handleUpdateSponsor} variant="contained">{translations[language].update || "Update"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SponsorManagement;
