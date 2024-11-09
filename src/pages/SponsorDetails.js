import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useLanguage } from '../LanguageContext';

const SponsorsDetail = () => {
  const { id } = useParams();
  const { language, translations } = useLanguage();
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsor = async () => {
      setLoading(true);
      try {
        const sponsorDocRef = doc(db, 'sponsors', id);
        const sponsorDoc = await getDoc(sponsorDocRef);
        if (sponsorDoc.exists()) {
          setSponsor(sponsorDoc.data());
        } else {
          console.error("No such sponsor document!");
        }
      } catch (error) {
        console.error("Error fetching sponsor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsor();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!sponsor) {
    return <Typography variant="h6">Sponsor not found.</Typography>;
  }

  // Safe access to translations with fallback values
  const title = translations?.[language]?.sponsorDetail?.title || "Sponsor Detail";

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      
      <Paper sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Avatar
              src={sponsor.sponsorImage || ''}
              alt={sponsor.name || 'Sponsor Image'}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>{sponsor.name || 'N/A'}</Typography>
            <Typography variant="body1">
              <strong>Passport Number/ID:</strong> {sponsor.passportNumber || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {sponsor.country || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {sponsor.address || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Nationality:</strong> {sponsor.nationality || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {sponsor.phoneNumber || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Home Number:</strong> {sponsor.homeNumber || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Work Information:</strong> {sponsor.workInformation || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Job:</strong> {sponsor.sponsorJob || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {sponsor.status || 'N/A'}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" onClick={() => {/* Add your edit functionality here */}}>
                Edit Sponsor
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SponsorsDetail;