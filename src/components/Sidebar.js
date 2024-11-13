// src/components/Sidebar.js
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Box, IconButton, Divider, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportIcon from '@mui/icons-material/Assessment';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width:900px)');
  const { language, translations } = useLanguage(); // Get language and translations

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        background: 'linear-gradient(135deg, #0066cc, #00ccff)',
        color: '#fff',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '20px',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff', marginLeft: 'auto', marginRight: '10px' }}>
        <CloseIcon />
      </IconButton>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '10px 0' }} />
      
      <img className='logo-image' style={{ marginLeft: "30%", marginTop: "-16%", marginBottom: "20%" }} src="/logo.jpg" alt="Company Logo" /> 
      
      <List>
        {[  
          { text: translations.sidebar.dashboard, icon: <HomeIcon />, link: '/dashboard' },
          { text: translations.sidebar.sponsorManagement, icon: <PeopleIcon />, link: '/sponsors' },
          { text: translations.sidebar.workerManagement, icon: <WorkIcon />, link: '/workers' },
          { text: translations.sidebar.payments, icon: <PaymentIcon />, link: '/payment' },
          { text: translations.sidebar.reports, icon: <ReportIcon />, link: '/reports' },
          { text: translations.sidebar.settings, icon: <WorkIcon />, link: '/settings' },
          { text: translations.sidebar.helpSupport, icon: <WorkIcon />, link: '/help-support' },
        ].map((item, index) => (
          <ListItem
            button
            component={Link}
            to={item.link}
            key={index}
            sx={{
              padding: '10px 20px',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Hamburger menu for mobile view */}
      {!isDesktop && (
        <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
          <MenuIcon />
        </IconButton>
      )}

      {/* Temporary drawer for mobile view */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Permanent drawer for desktop view */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          open
          sx={{
            '& .MuiDrawer-paper': {
              width: '15%', // Adjust width as needed
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;