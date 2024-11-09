import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/LandingPage.css';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Welcome to Al-Rajaa Recruitment Agency</h1>
          <p>Connecting skilled professionals globally</p>
          <Link to="/register" className="cta-btn">Register</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Our agency connects skilled workers in various sectors with employers worldwide,
            ensuring quality recruitment and fair worker treatment. Join us to explore the best
            global opportunities.
          </p>
        </div>
        <div className="about-image">
          <img src="/workers-2.jpg" alt="About Us" />
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <h2>Location</h2>
        <div className="map-image">
          <img src="/map.jpg" alt="Map" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
