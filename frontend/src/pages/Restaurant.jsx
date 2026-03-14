import React from 'react';
import './Restaurant.css';

const Restaurant = () => {
  return (
    <div className="restaurant-page">
      <div className="rest-hero">
        <div className="hero-overlay"></div>
        <div className="rest-hero-content animate-fade-in">
          <h1 className="title text-white">The Golden Plate</h1>
          <p className="subtitle text-light">A culinary journey of flavors, crafted just for you.</p>
        </div>
      </div>

      <div className="page-container rest-content">
        <div className="rest-intro text-center">
          <h2 className="rest-heading">Exquisite Dining Experience</h2>
          <p className="rest-desc">
            Our award-winning chefs combine locally sourced ingredients with international culinary techniques to bring you an unforgettable dining experience. Whether you're looking for a hearty breakfast or a romantic candlelit dinner, The Golden Plate is your destination.
          </p>
        </div>

        <div className="menu-section">
          <h2 className="rest-heading text-center mb-12">Featured Menu</h2>
          <div className="menu-grid">
            <div className="menu-item">
              <div className="menu-header">
                <h3>Truffle Risotto</h3>
                <span className="price">$32</span>
              </div>
              <p className="menu-desc">Arborio rice, wild mushrooms, parmesan, and white truffle oil.</p>
            </div>
            <div className="menu-item">
              <div className="menu-header">
                <h3>Pan-Seared Scallops</h3>
                <span className="price">$45</span>
              </div>
              <p className="menu-desc">Jumbo scallops, cauliflower purée, crispy pancetta, lemon butter.</p>
            </div>
            <div className="menu-item">
              <div className="menu-header">
                <h3>Wagyu Beef Tenderloin</h3>
                <span className="price">$85</span>
              </div>
              <p className="menu-desc">Grilled asparagus, potato gratin, rich red wine reduction.</p>
            </div>
            <div className="menu-item">
              <div className="menu-header">
                <h3>Chocolate Fondant</h3>
                <span className="price">$18</span>
              </div>
              <p className="menu-desc">Warm chocolate center, Madagascar vanilla bean ice cream.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
