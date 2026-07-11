import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Routes, Route } from 'react-router-dom';
import logo from './images/logo1.png';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurServices from './pages/OurServices';
import CallUs from './pages/CallUs';
import driveService from './services/driveService';
import { loadDriveImages, DRIVE_IMAGE_FOLDER } from './data/constants';

function App() {
  const [driveReady, setDriveReady] = useState(false);
  const [driveStatus, setDriveStatus] = useState('');
  const [driveError, setDriveError] = useState<string | null>(null);

  useEffect(() => {
    async function initDrive() {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!apiKey || !clientId) {
        setDriveStatus('Drive keys missing');
        console.warn('VITE_GOOGLE_API_KEY or VITE_GOOGLE_CLIENT_ID not set - skipping Drive init');
        return;
      }
      try {
        await driveService.initDrive({ apiKey, clientId });
        setDriveReady(true);
        setDriveStatus('Drive initialized. Sign in to load images.');
      } catch (err) {
        console.error('Failed to initialize Drive', err);
        setDriveError(String(err));
        setDriveStatus('Drive initialization failed');
      }
    }
    initDrive();
  }, []);

  async function handleDriveSignIn() {
    if (!driveReady) {
      setDriveError('Drive SDK is not ready yet');
      return;
    }
    setDriveStatus('Requesting Drive access...');
    try {
      await driveService.requestDriveToken('consent');
      setDriveStatus('Drive access granted. Loading images...');
      await loadDriveImages(DRIVE_IMAGE_FOLDER);
      setDriveStatus('Drive images loaded');
      setDriveError(null);
    } catch (err) {
      console.error('Drive sign-in failed', err);
      setDriveError(String(err));
      setDriveStatus('Drive sign-in failed');
    }
  }
  return (
    <div className="app-shell">
      <div className="top-bar">
        <div className="running-banner" role="status" aria-live="polite">
          <div className="banner-track">
            <span>
              Premium interior design services at affordable rates — End-to-end design &amp; execution, modular kitchens, smart storage, and renovation. Free estimate &amp; transparent pricing. Call +91 7012444932
            </span>
            <span>
              Premium interior design services at affordable rates — End-to-end design &amp; execution, modular kitchens, smart storage, and renovation. Free estimate &amp; transparent pricing. Call +91 7012444932
            </span>
          </div>
        </div>
      </div>
      {/* <div className="drive-status-bar">
        <span>{driveStatus}</span>
        {driveError && <span className="drive-error">{driveError}</span>}
        <button className="cta-button-secondary" type="button" onClick={handleDriveSignIn} disabled={!driveReady}>
          Sign in to Drive
        </button>
      </div> */}

      <header className="site-header">
        {/* <div className="brand">
          <Link to="/" className="brand-link">
            <img src={logo} alt="Dwud Interiors logo" className="brand-logo" />
            <div>
              <h1>Dwud Interiors</h1>
              <p>Timeless interiors designed for modern living.</p>
            </div>
          </Link>
        </div> */}

        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/ourservices">Our Services</NavLink>
          <NavLink to="/callus">Call Us</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/ourservices" element={<OurServices />} />
          <Route path="/callus" element={<CallUs />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>© Dwud Interiors. Crafted for beautiful spaces.</p>
      </footer>
    </div>
  );
}

export default App;
