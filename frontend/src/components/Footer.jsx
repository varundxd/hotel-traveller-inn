import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">Hotel <span>Traveller Inn</span></div>
          <p>A serene mountain retreat in the heart of Kumaon, Uttarakhand. Your home in the Himalayas since 2005.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#rooms">Rooms & Suites</a></li>
            <li><a href="#restaurant">Restaurant</a></li>
            <li><a href="#gallery">Photo Gallery</a></li>
            <li><a href="#places">Nearby Places</a></li>
            <li><a href="#about">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Policies</h4>
          <ul>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Child Policy</a></li>
            <li><a href="#">Pet Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Hotel Traveller Inn, Bhowali, Nainital, Uttarakhand 263132 · All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
