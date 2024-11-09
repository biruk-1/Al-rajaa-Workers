import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Header = () => {
  const { toggleLanguage, translations, language } = useLanguage();
  const navigate = useNavigate();

  // State for handling profile menu anchor
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Handlers for menu interactions
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate('/'); // Redirect to home (or login) on logout
    handleMenuClose();
  };

  const handleSettings = () => {
    navigate('/settings'); // Navigate to settings page
    handleMenuClose();
  };

  // Fallback translation if the specific translation is undefined
  const headerTitle = translations?.header?.title || 'App Title';
  const languageText = translations?.header?.language || 'Language';

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #0066cc, #00ccff)',
        color: '#fff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        width: '100%',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          padding: { xs: '10px 15px', md: '20px 30px' },
        }}
      >
        {/* App title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontWeight: 'bold',
          }}
        >
          {headerTitle}
        </Typography>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Language toggle button */}
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
            {languageText}
          </Button>

          {/* Notifications icon */}
          <IconButton color="inherit" sx={{ marginLeft: { xs: '5px', md: '10px' } }}>
            <NotificationsIcon />
          </IconButton>

          {/* Profile icon */}
          <IconButton
            color="inherit"
            sx={{ marginLeft: { xs: '5px', md: '10px' } }}
            onClick={handleProfileClick}
          >
            <AccountCircle />
          </IconButton>

          {/* Profile menu */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
