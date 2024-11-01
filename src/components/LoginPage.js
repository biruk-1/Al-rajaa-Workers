// components/LoginPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginRegister.css';
import Footer from './Footer';
import LandingHeader from './LandingHeader';
import { loginUser } from '../services/Firebase'; // Import the login function

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/dashboard'); // Redirect to Dashboard after successful login
    } catch (error) {
      console.error("Login Error: ", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <LandingHeader />
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-btn">Login</button>

            <p className="auth-text">
              Don't have an account?
              <Link to="/register" className="auth-link"> Register here</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
