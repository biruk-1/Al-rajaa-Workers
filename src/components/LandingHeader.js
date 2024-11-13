// src/components/LandingHeader.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../Styles/LandingPage.css';

export default function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <ul className={`navbar-list ${menuOpen ? 'open' : ''}`}>
            <img className='logo-image' src="/logo.jpg" alt="Company Logo" /> 
            <li><Link to="/">Home</Link></li>
            <li><Link to="#about">About</Link></li> 
            <li><Link to="#location">Location</Link></li> 
            <li><Link to="#contact">Contact</Link></li>
          </ul>
        </nav>
        
        <Link to="/register" className="register-btn">Register</Link>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>
    </div>
  );
}