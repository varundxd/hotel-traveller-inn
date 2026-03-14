import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content animate-fade-in">
          <span className="hero-subtitle">Welcome to</span>
          <h1 className="hero-title">Hotel Traveller Inn</h1>
          <p className="hero-desc">Your serene escape where luxury meets absolute comfort.</p>
          <Link to="/rooms" className="btn btn-primary hero-btn">Explore Our Rooms</Link>
        </div>
      </section>

      <section className="features page-container">
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <h3 className="feature-title">Premium Rooms</h3>
            <p className="feature-desc">Experience unmatched comfort with panoramic city views and state-of-the-art amenities.</p>
            <Link to="/rooms" className="btn btn-outline feature-btn">View Rooms</Link>
          </div>
          <div className="feature-card glass-panel">
            <h3 className="feature-title">Fine Dining</h3>
            <p className="feature-desc">Taste exceptional cuisines prepared by world-class chefs at our exquisite restaurant.</p>
            <Link to="/restaurant" className="btn btn-outline feature-btn">Our Menu</Link>
          </div>
          <div className="feature-card glass-panel">
            <h3 className="feature-title">Relax & Unwind</h3>
            <p className="feature-desc">Rejuvenate your senses at our exclusive spa or relax by the infinity pool.</p>
            <button className="btn btn-outline feature-btn">Discover More</button>
          </div>
        </div>
      </section>

      <section className="gallery">
        <div className="gallery-img g1"></div>
        <div className="gallery-img g2"></div>
        <div className="gallery-img g3"></div>
      </section>
    </div>
  );
};

export default Home;
