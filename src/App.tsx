import './App.css';
import { Link, NavLink, Routes, Route } from 'react-router-dom';
import logo from './images/logo1.png';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurServices from './pages/OurServices';
import CallUs from './pages/CallUs';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">
          <Link to="/" className="brand-link">
            <img src={logo} alt="Dwud Interiors logo" className="brand-logo" />
            <div>
              <h1>Dwud Interiors</h1>
              <p>Timeless interiors designed for modern living.</p>
            </div>
          </Link>
        </div>

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
