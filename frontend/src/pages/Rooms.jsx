import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rooms.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleBook = (room) => {
    navigate('/checkout', { state: { room } });
  };

  return (
    <div className="rooms-page">
      <div className="rooms-header">
        <h1 className="title">Our Signature Rooms</h1>
        <p className="subtitle">Discover comfort tailored to your desires.</p>
      </div>

      <div className="page-container">
        {loading ? (
          <div className="loader">Loading extraordinary experiences...</div>
        ) : (
          <div className="rooms-grid">
            {rooms.map(room => (
              <div key={room.id} className="room-card glass-panel">
                <div className="room-img-container">
                  <img src={room.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80'} alt={room.name} className="room-img" />
                  <div className="room-price">${room.price} <span className="per-night">/ night</span></div>
                </div>
                <div className="room-content">
                  <h2 className="room-title">{room.name}</h2>
                  <p className="room-desc">{room.description}</p>
                  <button onClick={() => handleBook(room)} className="btn btn-primary w-full">Book Experience</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;
