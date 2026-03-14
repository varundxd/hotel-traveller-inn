import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-primary">Hotel</span>
          <span className="brand-secondary">Traveller</span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/rooms" className={`nav-link ${location.pathname === '/rooms' ? 'active' : ''}`}>Rooms</Link>
          <Link to="/restaurant" className={`nav-link ${location.pathname === '/restaurant' ? 'active' : ''}`}>Restaurant</Link>
        </nav>
        
        <div className="nav-actions">
          <Link to="/rooms" className="btn btn-primary">Book Now</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
