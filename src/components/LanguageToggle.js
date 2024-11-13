// src/components/LanguageToggle.js
import React from 'react';
import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguage } from '../LanguageContext'; // Import the useLanguage hook

const LanguageToggle = () => {
  const { toggleLanguage, translations, language } = useLanguage();
  const languageText = translations?.header?.language || 'Language';

  return (
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
  );
};

export default LanguageToggle;