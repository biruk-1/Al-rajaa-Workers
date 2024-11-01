import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SponsorManagement from './pages/SponsorManagement';
import WorkerManagement from './pages/WorkerManagement';
import PaymentManagement from './pages/paymentManagment';
import './App.css';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import { LanguageProvider } from './LanguageContext';
import { auth } from './services/Firebase';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Unprotected Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <Dashboard />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sponsors"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <SponsorManagement />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/workers"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <WorkerManagement />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <PaymentManagement />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <Reports />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <Settings />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/help-support"
            element={
              <ProtectedRoute>
                <div className="app-layout">
                  {!isMobile && <Sidebar />}
                  <div className="main-content">
                    <Header />
                    <HelpSupport />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;