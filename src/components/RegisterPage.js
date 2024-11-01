// components/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginRegister.css';
import Footer from './Footer';
import LandingHeader from './LandingHeader';
import { registerUser } from '../services/Firebase'; // Import the register function

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('worker'); // Default role to worker
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser(email, password);
      navigate('/login'); // Redirect to Login after successful registration
    } catch (error) {
      console.error("Registration Error: ", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <LandingHeader />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Register as</label>
              <div className="role-selection">
                <input
                  type="radio"
                  name="role"
                  value="worker"
                  checked={role === 'worker'}
                  onChange={() => setRole('worker')}
                />
                <label>Worker</label>

                <input
                  type="radio"
                  name="role"
                  value="sponsor"
                  checked={role === 'sponsor'}
                  onChange={() => setRole('sponsor')}
                />
                <label>Sponsor</label>
              </div>
            </div>

            <button type="submit" className="auth-btn">Register</button>

            <p className="auth-text">
              Already registered?
              <Link to="/login" className="auth-link"> Login here</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
