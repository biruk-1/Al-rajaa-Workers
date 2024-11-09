import React from 'react';
import '../Styles/Footer.css';
import { useLanguage } from '../LanguageContext'; 

const Footer = () => {
  const { toggleLanguage, translations, language } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h4>Al-Rajaa Recruitment Agency</h4>
          <p>Connecting talented workers with global sponsors.</p>
        </div>
        
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/location">Location</a>
        </div>
        
        <div className="footer-contact">
          <p>Email: info@alhijra.com</p>
          <p>Phone: +123-456-7890</p>
          <p>© 2024 Al-rajaa Recruitment Agency</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
