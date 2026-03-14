import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-title">Hotel Traveller</h2>
          <p className="footer-desc">Experience luxury and comfort in the heart of the city.</p>
        </div>
        <div className="footer-links">
          <h3 className="footer-subtitle">Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/restaurant">Restaurant</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3 className="footer-subtitle">Contact</h3>
          <p>123 Luxury Ave, Cityville, ST 12345</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Email: info@hoteltraveller.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hotel Traveller Inn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
