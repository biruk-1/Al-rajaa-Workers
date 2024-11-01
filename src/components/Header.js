import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook

const Header = ({ onMenuClick }) => {
  const { toggleLanguage, translations, language } = useLanguage();

  return (
    <AppBar
      position="static" // Use static to ensure it takes full width of the container
      sx={{
        background: 'linear-gradient(135deg, #0066cc, #00ccff)',
        color: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        width: '100%', // Ensure it takes full width of the main content
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          padding: { xs: '10px 15px', md: '20px 30px' },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontWeight: 'bold',
          }}
        >
          {translations[language].header.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="inherit"
            startIcon={<LanguageIcon />}
            onClick={toggleLanguage}
            sx={{
              fontSize: { xs: '0.8rem', md: '1rem' },
              color: 'white',
              fontWeight: 600,
            }}
          >
            {translations[language].header.language}
          </Button>
          <IconButton color="inherit" sx={{ marginLeft: { xs: '5px', md: '10px' } }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ marginLeft: { xs: '5px', md: '10px' } }}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;