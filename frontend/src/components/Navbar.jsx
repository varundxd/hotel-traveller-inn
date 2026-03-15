import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToBooking = () => {
    setMenuOpen(false);
    const el = document.getElementById('bookingModal');
    if (el) {
      el.classList.add('active');
      document.getElementById('modal-form-content').style.display = 'block';
      document.getElementById('modal-success').style.display = 'none';
    }
  };

  return (
    <nav className="site-nav">
      <div className="nav-logo">Hotel <span>Traveller Inn</span></div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#rooms" onClick={() => setMenuOpen(false)}>Rooms</a></li>
        <li><a href="#restaurant" onClick={() => setMenuOpen(false)}>Restaurant</a></li>
        <li><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a></li>
        <li><a href="#places" onClick={() => setMenuOpen(false)}>Explore</a></li>
        <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
      </ul>
      <button className="nav-book-btn" onClick={scrollToBooking}>Book Now</button>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
};

export default Navbar;
