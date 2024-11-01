import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import '../Styles/LandingPage.css';

export default function LandingHeader() {
  return (
    <div>
      <header className="header">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/location">Location</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
        <Link to="/register" className="register-btn">Register</Link>
      </header>
    </div>
  );
}
