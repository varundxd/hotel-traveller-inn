import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const RAZORPAY_KEY_ID = 'rzp_test_demo123456789';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!room) {
    return (
      <div className="page-container text-center" style={{ paddingTop: '10rem' }}>
        <h2 className="title">No Room Selected</h2>
        <p className="mb-12">Please select a room to proceed with booking.</p>
        <button onClick={() => navigate('/rooms')} className="btn btn-primary">Browse Rooms</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 1;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  };

  const calculateTotal = () => {
    return (room.price * calculateNights()).toFixed(2);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const totalAmount = parseFloat(calculateTotal());
      
      // 1. Create booking in our backend
      const bookingRes = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          customerName: formData.name,
          customerEmail: formData.email,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          totalAmount: totalAmount
        })
      });
      
      const bookingData = await bookingRes.json();
      if (!bookingRes.ok) throw new Error(bookingData.error);

      // 2. Create Razorpay order
      const orderRes = await fetch('http://localhost:5001/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          bookingId: bookingData.id,
          roomName: room.name
        })
      });
      
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error);

      // 3. Load Razorpay checkout
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load Razorpay SDK. Check your internet connection.');

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Hotel Traveller Inn',
        description: `Booking: ${room.name} (${calculateNights()} night${calculateNights() > 1 ? 's' : ''})`,
        order_id: orderData.id,
        handler: async function (response) {
          // 4. Verify payment
          try {
            const verifyRes = await fetch('http://localhost:5001/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.verified) {
              // Update booking status
              await fetch(`http://localhost:5001/api/bookings/${bookingData.id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'confirmed' })
              });
              setSuccess(true);
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err) {
            setError('Payment verification error. Please contact support.');
          }
          setLoading(false);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#9b7e46'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong during checkout.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-container text-center" style={{ paddingTop: '10rem' }}>
        <div className="success-card glass-panel">
          <div className="success-icon">✓</div>
          <h2 className="title" style={{ color: '#16a34a' }}>Booking Confirmed!</h2>
          <p className="success-msg">Thank you, {formData.name}! Your booking for <strong>{room.name}</strong> has been confirmed.</p>
          <p className="success-details">Check-in: {formData.checkIn} &nbsp;|&nbsp; Check-out: {formData.checkOut}</p>
          <p className="success-details">Total Paid: ₹{calculateTotal()}</p>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-container">
      <div className="checkout-grid">
        <div className="checkout-form-container glass-panel">
          <h2 className="checkout-title">Complete Your Booking</h2>
          {error && <div className="error-msg">{error}</div>}
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-control" placeholder="example@email.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="form-control" placeholder="+91 9876543210" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Check-in Date</label>
                <input type="date" name="checkIn" required value={formData.checkIn} onChange={handleChange} className="form-control" min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input type="date" name="checkOut" required value={formData.checkOut} onChange={handleChange} className="form-control" min={formData.checkIn || new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary w-full submit-btn">
              {loading ? 'Processing...' : `Pay ₹${calculateTotal()}`}
            </button>
          </form>
        </div>
        
        <div className="checkout-summary glass-panel">
          <h3 className="summary-title">Booking Summary</h3>
          <img src={room.image} alt={room.name} className="summary-img" />
          <div className="summary-details">
            <div className="summary-row">
              <span className="summary-label">Room</span>
              <span className="summary-value">{room.name}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Rate</span>
              <span className="summary-value">₹{room.price} / night</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Nights</span>
              <span className="summary-value">{calculateNights()}</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row total-row">
              <span className="summary-label">Total Amount</span>
              <span className="summary-value">₹{calculateTotal()}</span>
            </div>
          </div>
          <div className="payment-methods">
            <p className="payment-label">Accepted Methods</p>
            <div className="payment-icons">
              <span>💳 Cards</span>
              <span>🏦 UPI</span>
              <span>🏧 Net Banking</span>
              <span>📱 Wallets</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
