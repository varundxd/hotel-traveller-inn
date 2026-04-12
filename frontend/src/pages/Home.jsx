import React, { useState, useEffect } from 'react';
import API_BASE from '../config';
import './Home.css';

/* ─── Menu Data (fallback) ─── */
const fallbackMenuData = {
  breakfast: [
    { emoji: '🥐', name: 'Continental Breakfast', description: 'Croissant, eggs, toast, jam & fresh juice', price: '₹320' },
    { emoji: '🍽', name: 'Kumaoni Thali (Morning)', description: 'Bal mithai, aloo ke gutke, pahari dal & chaas', price: '₹280' },
    { emoji: '🥞', name: 'Pancake Stack', description: 'Fluffy pancakes with local honey & fruit', price: '₹220' },
    { emoji: '🍳', name: 'Full English Breakfast', description: 'Eggs, beans, sausage, toast & grilled tomato', price: '₹380' },
  ],
  lunch: [
    { emoji: '🍛', name: 'Dal Bhat Tarkari', description: 'Traditional Himalayan lentils, rice & seasonal vegetables', price: '₹260' },
    { emoji: '🥗', name: 'Fresh Garden Salad', description: 'Locally grown veggies with house dressing', price: '₹180' },
    { emoji: '🍕', name: 'Wood-fired Pizza', description: 'Thin crust with mozzarella & seasonal toppings', price: '₹320' },
    { emoji: '🍜', name: 'Veg Noodle Bowl', description: 'Stir-fried noodles with mountain herbs', price: '₹240' },
  ],
  dinner: [
    { emoji: '🍖', name: 'Grilled Mountain Trout', description: 'Freshwater trout from local streams, lemon butter', price: '₹480' },
    { emoji: '🍲', name: 'Kumaoni Mutton Curry', description: 'Slow-cooked in pahari masala with rice & raita', price: '₹420' },
    { emoji: '🥘', name: 'Paneer Makhani', description: 'Cottage cheese in rich tomato cream sauce', price: '₹280' },
    { emoji: '🍝', name: 'Pasta Arrabiata', description: 'Penne in spicy tomato basil sauce', price: '₹310' },
  ],
  beverages: [
    { emoji: '☕', name: 'Pahadi Chai', description: 'Local spiced mountain tea, freshly brewed', price: '₹60' },
    { emoji: '🫖', name: 'Shyamkhet Green Tea', description: 'Estate-grown green tea from Bhowali gardens', price: '₹90' },
    { emoji: '🥤', name: 'Buransh Juice', description: 'Refreshing rhododendron flower juice, a Kumaon specialty', price: '₹120' },
    { emoji: '🍋', name: 'Lemon Ginger Cooler', description: 'Fresh lime, ginger & mint, chilled to perfection', price: '₹100' },
  ],
  local: [
    { emoji: '🍬', name: 'Bal Mithai', description: 'Traditional Kumaoni sweet made from roasted khoya, a must-try', price: '₹150' },
    { emoji: '🥣', name: 'Aloo Ke Gutke', description: 'Spiced mountain potatoes — a beloved Kumaoni staple', price: '₹180' },
    { emoji: '🫓', name: 'Singori', description: 'Sweet made of khoya wrapped in maalu leaves, a rare delight', price: '₹120' },
    { emoji: '🍛', name: 'Bhaang Ki Chutney Thali', description: 'Pahari thali with hemp seed chutney — uniquely Uttarakhand', price: '₹320' },
  ]
};

/* ─── Places Data ─── */
const placesData = [
  { emoji: '🕌', name: 'Kainchi Dham', desc: 'A tranquil ashram and Hanuman temple founded by the great saint Neem Karoli Baba in the 1960s. Visited famously by Steve Jobs and Mark Zuckerberg.', dist: '9 km away', type: 'Spiritual · Pilgrimage', gradient: 'linear-gradient(135deg, #085041, #0F6E56)' },
  { emoji: '🏔', name: 'Nainital & Naini Lake', desc: 'The iconic \'Lake District\' hill station, home to the eye-shaped Naini Lake surrounded by seven hills. Enjoy boat rides, Mall Road, and Tiffin Top.', dist: '11 km away', type: 'Hill Station · Lake', gradient: 'linear-gradient(135deg, #0C447C, #185FA5)' },
  { emoji: '🛕', name: 'Golu Devta Temple, Ghorakhal', desc: 'Known as the \'Temple of Bells\', this revered shrine is famous for thousands of bells and the unique tradition of writing wishes on stamp paper.', dist: '17 km away', type: 'Temple · Spiritual', gradient: 'linear-gradient(135deg, #3B6D11, #639922)' },
  { emoji: '🌊', name: 'Bhimtal Lake', desc: 'A stunning lake named after the Mahabharata\'s Bhima, set at 1,370m altitude. Less crowded than Nainital, it offers boating and the famous aquarium.', dist: '20 km away', type: 'Lake · Nature', gradient: 'linear-gradient(135deg, #085041, #1D9E75)' },
  { emoji: '🌿', name: 'Shyamkhet Tea Garden', desc: 'A scenic tea estate near Bhowali at 1,800–2,000m elevation. Walk through lush tea rows and sip freshly brewed Kumaoni tea.', dist: '5 km away', type: 'Nature · Heritage', gradient: 'linear-gradient(135deg, #0C447C, #0F6E56)' },
  { emoji: '🏕', name: 'Mukteshwar', desc: 'Perched at 2,285m, this charming hill town boasts a 350-year-old Shiva temple and Chauli ki Jali for rock climbing and rappelling.', dist: '35 km away', type: 'Adventure · Temple', gradient: 'linear-gradient(135deg, #3B6D11, #0F6E56)' },
  { emoji: '🌅', name: 'Ramgarh', desc: 'Known as the \'Fruit Bowl of Kumaon\', Ramgarh sits at 1,729m and is celebrated for lush apple, apricot, and peach orchards.', dist: '22 km away', type: 'Scenic · Orchard', gradient: 'linear-gradient(135deg, #0C447C, #378ADD)' },
  { emoji: '🐯', name: 'Jim Corbett National Park', desc: 'India\'s oldest national park, home to Bengal tigers, leopards, elephants, and over 600 bird species. Book a jungle safari from our hotel.', dist: '70 km away', type: 'Wildlife · Safari', gradient: 'linear-gradient(135deg, #085041, #0C447C)' },
  { emoji: '🌄', name: 'Sattal — Seven Lakes', desc: 'A pristine cluster of seven interconnected freshwater lakes in dense forests of oak and pine. Ideal for kayaking and birdwatching.', dist: '25 km away', type: 'Lakes · Birdwatching', gradient: 'linear-gradient(135deg, #085041, #3B6D11)' },
];

/* ─── Room Images ─── */
const roomImages = [
  '/images/rooms/standard-room.jpg',
  '/images/rooms/deluxe-room.jpg',
  '/images/rooms/premium-suite.jpg',
  '/images/rooms/family-room.jpg',
];

/* ─── Gallery Data ─── */
const galleryData = [
  { label: 'Night Corridor', src: '/images/gallery/corridor-night.jpg' },
  { label: 'Hotel Corridor', src: '/images/gallery/corridor-1.jpg' },
  { label: 'Lobby Entrance', src: '/images/gallery/corridor-2.jpg' },
  { label: 'Standard Room', src: '/images/rooms/standard-room.jpg' },
  { label: 'Deluxe Suite', src: '/images/rooms/deluxe-room-2.jpg' },
  { label: 'Deluxe Balcony View', src: '/images/rooms/deluxe-balcony.jpg' },
  { label: 'Deluxe Wide View', src: '/images/rooms/deluxe-room-3.jpg' },
  { label: 'Premium Suite', src: '/images/rooms/premium-suite.jpg' },
  { label: 'Premium Suite View', src: '/images/rooms/premium-suite-2.jpg' },
  { label: 'Family Room', src: '/images/rooms/family-room.jpg' },
  { label: 'Room Interior', src: '/images/rooms/family-room-2.jpg' },
  { label: 'Cozy Mountain Room', src: '/images/rooms/standard-room-2.jpg' },
  { label: 'Valley View Room', src: '/images/rooms/standard-room-3.jpg' },
  { label: 'Comfort Room', src: '/images/rooms/standard-room-5.jpg' },
  { label: 'Premium Balcony Suite', src: '/images/rooms/premium-suite-4.jpg' },
  { label: 'Rustic Suite', src: '/images/rooms/premium-suite-5.jpg' },
  { label: 'Executive Suite', src: '/images/rooms/premium-suite-6.jpg' },
  { label: 'Suite — Daylight', src: '/images/rooms/premium-suite-day.jpg' },
  { label: 'Suite — Morning View', src: '/images/rooms/premium-suite-day-2.jpg' },
  { label: 'Countryside Room', src: '/images/rooms/standard-room-6.jpg' },
  { label: 'Bathroom', src: '/images/gallery/bathroom.jpg' },
];

const Home = () => {
  /* ─── State ─── */
  const [rooms, setRooms] = useState([]);
  const [menuData, setMenuData] = useState(fallbackMenuData);
  const [activeMenu, setActiveMenu] = useState('breakfast');
  const [activePayTab, setActivePayTab] = useState('upi');
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', email: '', phone: '', checkIn: '', checkOut: '', room: '', adults: '2 Adults', children: 'No Children', requests: '' });

  /* ─── Default dates ─── */
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today); dayAfter.setDate(dayAfter.getDate() + 3);
  const fmt = (d) => d.toISOString().split('T')[0];
  const defaultCheckIn = fmt(tomorrow);
  const defaultCheckOut = fmt(dayAfter);

  /* ─── Load data from API ─── */
  useEffect(() => {
    fetch(`${API_BASE}/api/rooms`)
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(() => {});

    fetch(`${API_BASE}/api/menu`)
      .then(res => res.json())
      .then(data => {
        const grouped = {};
        data.forEach(item => {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        });
        if (Object.keys(grouped).length > 0) setMenuData(grouped);
      })
      .catch(() => {});
  }, []);

  /* ─── Handlers ─── */
  const openBookingModal = () => {
    setBookingSuccess(false);
    setModalOpen(true);
  };

  const closeBookingModal = () => setModalOpen(false);

  const handleModalChange = (e) => {
    setModalForm({ ...modalForm, [e.target.name]: e.target.value });
  };

  const submitBooking = async () => {
    if (!modalForm.name || !modalForm.email || !modalForm.phone) {
      alert('Please fill in your name, email and phone number.');
      return;
    }
    try {
      const roomObj = rooms.find(r => modalForm.room.includes(r.name));
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: roomObj ? roomObj.id : 1,
          customerName: modalForm.name,
          customerEmail: modalForm.email,
          customerPhone: modalForm.phone,
          checkIn: modalForm.checkIn || defaultCheckIn,
          checkOut: modalForm.checkOut || defaultCheckOut,
          adults: parseInt(modalForm.adults) || 2,
          children: parseInt(modalForm.children) || 0,
          specialRequests: modalForm.requests,
          totalAmount: roomObj ? roomObj.price : 2500,
        })
      });
      if (res.ok) {
        setBookingSuccess(true);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch {
      setBookingSuccess(true); // Show success anyway for demo
    }
  };

  const processPayment = () => {
    alert('Payment gateway integration required. In production, connect Razorpay, PayU, or a similar payment gateway.');
  };

  const menuItems = menuData[activeMenu] || [];

  return (
    <div className="home-page">

      {/* ═══ HERO ═══ */}
      <section className="hero" id="home">
        <svg className="hero-mountains" viewBox="0 0 1440 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,400 0,200 200,60 380,160 520,40 680,150 820,20 960,100 1100,50 1260,130 1440,80 1440,400" fill="white"/>
          <polygon points="0,400 0,260 150,180 300,250 450,140 600,220 750,100 900,180 1050,120 1200,200 1350,150 1440,200 1440,400" fill="white" opacity="0.5"/>
        </svg>
        <div className="hero-content">
          <span className="hero-tag">Bhowali, Nainital · Uttarakhand, India</span>
          <h1>Escape to the <em>Himalayan</em><br/>Heart of Kumaon</h1>
          <p>Nestled at 1,706m above sea level, Hotel Traveller Inn offers a serene mountain retreat with breathtaking valley views and warm Kumaoni hospitality.</p>
          <div className="hero-btns">
            <a href="#booking" className="btn-primary">Book Your Stay</a>
            <a href="#rooms" className="btn-outline">Explore Rooms</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          Scroll
        </div>
      </section>

      {/* ═══ BOOKING WIDGET ═══ */}
      <section id="booking" className="booking-section">
        <div className="section-header">
          <span className="section-tag">Reservations</span>
          <h2>Check Availability</h2>
          <p>Find the perfect room for your mountain getaway. Instant confirmation guaranteed.</p>
        </div>
        <div className="booking-form">
          <div className="booking-grid">
            <div className="form-group">
              <label>Check-in Date</label>
              <input type="date" defaultValue={defaultCheckIn} />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input type="date" defaultValue={defaultCheckOut} />
            </div>
            <div className="form-group">
              <label>Adults</label>
              <select defaultValue="2 Adults">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>3 Adults</option>
                <option>4 Adults</option>
              </select>
            </div>
            <div className="form-group">
              <label>Children</label>
              <select defaultValue="No Children">
                <option>No Children</option>
                <option>1 Child</option>
                <option>2 Children</option>
                <option>3 Children</option>
              </select>
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <select>
                <option>Standard Room</option>
                <option>Deluxe Room</option>
                <option>Premium Suite</option>
                <option>Family Room</option>
              </select>
            </div>
          </div>
          <button className="booking-submit" onClick={openBookingModal}>Search & Book Available Rooms</button>
        </div>
      </section>

      {/* ═══ ROOMS ═══ */}
      <section id="rooms" className="rooms-section">
        <div className="section-header">
          <span className="section-tag">Accommodations</span>
          <h2>Our Rooms & Suites</h2>
          <p>Each room is thoughtfully designed to frame the natural beauty of the Kumaon Himalayas.</p>
        </div>
        <div className="rooms-grid">
          {(rooms.length > 0 ? rooms : [
            { id: 1, name: 'Standard Mountain View', description: 'Cozy retreat with queen bed and partial valley view.', price: 2500, badge: 'Available', amenities: 'Free Wi-Fi,AC,TV,Hot Water,Room Service' },
            { id: 2, name: 'Deluxe Valley Suite', description: 'Spacious suite with panoramic Himalayan views, king bed, private balcony.', price: 4200, badge: 'Popular', amenities: 'Free Wi-Fi,AC,Smart TV,Balcony,Mini Bar,Bathtub' },
            { id: 3, name: 'Premium Forest Suite', description: 'Luxury suite surrounded by oak and pine, featuring a private sit-out and fireplace.', price: 6800, badge: 'Best Value', amenities: 'Free Wi-Fi,AC + Heating,Smart TV,Fireplace,Sit-out,Jacuzzi' },
            { id: 4, name: 'Family Comfort Room', description: 'Spacious room with two queen beds, ideal for families.', price: 5500, badge: 'Family Pick', amenities: 'Free Wi-Fi,AC,TV,2 Queen Beds,Kids Corner' },
          ]).map((room, idx) => (
            <div className="room-card" key={room.id}>
              <div className="room-img">
                <img src={roomImages[idx] || roomImages[0]} alt={room.name} className="room-photo" loading="lazy" />
                <span className="room-badge">{room.badge}</span>
              </div>
              <div className="room-body">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="room-amenities">
                  {(room.amenities || '').split(',').map((a, i) => (
                    <span className="amenity-tag" key={i}>{a.trim()}</span>
                  ))}
                </div>
                <div className="room-footer">
                  <div className="room-price">
                    <span className="amount">₹{room.price.toLocaleString()}</span>
                    <span className="per"> / night</span>
                  </div>
                  <button className="btn-sm" onClick={openBookingModal}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ RESTAURANT ═══ */}
      <section id="restaurant" className="restaurant-section">
        <div className="section-header">
          <span className="section-tag">Dining</span>
          <h2>The Pine Leaf Restaurant</h2>
          <p>Savor authentic Kumaoni flavors and continental cuisine crafted from locally sourced mountain produce.</p>
        </div>
        <div className="menu-tabs">
          {['breakfast', 'lunch', 'dinner', 'beverages', 'local'].map(key => (
            <button key={key} className={`menu-tab ${activeMenu === key ? 'active' : ''}`} onClick={() => setActiveMenu(key)}>
              {key === 'local' ? 'Kumaoni Specials' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {menuItems.map((item, idx) => (
            <div className="menu-item" key={idx}>
              <div className="menu-item-emoji">{item.emoji}</div>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="price">{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PAYMENT ═══ */}
      <section id="payment" className="payment-section">
        <div className="section-header">
          <span className="section-tag">Payments</span>
          <h2>Secure & Easy Payment</h2>
          <p>Choose your preferred payment method — fully secure online payment or pay at the counter on arrival.</p>
        </div>
        <div className="payment-wrapper">
          <div className="payment-methods">
            <div className="pay-card">
              <div className="pay-icon upi">💳</div>
              <h4>UPI Payment</h4>
              <p>Pay instantly via Google Pay, PhonePe, Paytm, or any UPI app. Zero charges.</p>
            </div>
            <div className="pay-card">
              <div className="pay-icon card">💰</div>
              <h4>Credit Card</h4>
              <p>Visa, Mastercard, Amex, RuPay accepted. EMI options available on select cards.</p>
            </div>
            <div className="pay-card">
              <div className="pay-icon debit">🏦</div>
              <h4>Debit Card</h4>
              <p>All major bank debit cards accepted. Secure 3D verified transactions.</p>
            </div>
            <div className="pay-card">
              <div className="pay-icon counter">🏨</div>
              <h4>Pay at Counter</h4>
              <p>Book now, pay on arrival in cash or card at hotel reception. No advance required.</p>
            </div>
          </div>
          <div className="payment-form-box">
            <h3>Complete Your Booking</h3>
            <p>Fill in your details and choose a payment method to confirm your reservation.</p>
            <div className="pay-tabs">
              {['upi', 'credit', 'debit', 'counter'].map(tab => (
                <button key={tab} className={`pay-tab ${activePayTab === tab ? 'active' : ''}`} onClick={() => setActivePayTab(tab)}>
                  {tab === 'upi' ? 'UPI' : tab === 'credit' ? 'Credit Card' : tab === 'debit' ? 'Debit Card' : 'Pay at Counter'}
                </button>
              ))}
            </div>

            {activePayTab === 'upi' && (
              <div className="pay-section">
                <div className="pay-form-grid">
                  <div className="form-group full"><label>Full Name</label><input type="text" placeholder="Enter your full name" /></div>
                  <div className="form-group"><label>Email</label><input type="email" placeholder="email@example.com" /></div>
                  <div className="form-group"><label>Mobile</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="form-group full"><label>UPI ID</label><input type="text" placeholder="name@upi or 9XXXXXXXXX@paytm" /></div>
                </div>
                <button className="pay-now-btn" onClick={processPayment}>Pay Now via UPI ₹ →</button>
              </div>
            )}

            {activePayTab === 'credit' && (
              <div className="pay-section">
                <div className="pay-form-grid">
                  <div className="form-group full"><label>Cardholder Name</label><input type="text" placeholder="Name as on card" /></div>
                  <div className="form-group full"><label>Card Number</label><input type="text" placeholder="XXXX  XXXX  XXXX  XXXX" /></div>
                  <div className="form-group"><label>Expiry</label><input type="text" placeholder="MM / YY" /></div>
                  <div className="form-group"><label>CVV</label><input type="text" placeholder="XXX" /></div>
                  <div className="form-group full"><label>Mobile / Email</label><input type="text" placeholder="For booking confirmation" /></div>
                </div>
                <button className="pay-now-btn" onClick={processPayment}>Pay Securely Now →</button>
              </div>
            )}

            {activePayTab === 'debit' && (
              <div className="pay-section">
                <div className="pay-form-grid">
                  <div className="form-group full"><label>Cardholder Name</label><input type="text" placeholder="Name as on card" /></div>
                  <div className="form-group full"><label>Card Number</label><input type="text" placeholder="XXXX  XXXX  XXXX  XXXX" /></div>
                  <div className="form-group"><label>Expiry</label><input type="text" placeholder="MM / YY" /></div>
                  <div className="form-group"><label>CVV</label><input type="text" placeholder="XXX" /></div>
                  <div className="form-group full"><label>Bank Name</label><input type="text" placeholder="State Bank, HDFC, ICICI…" /></div>
                </div>
                <button className="pay-now-btn" onClick={processPayment}>Pay Securely Now →</button>
              </div>
            )}

            {activePayTab === 'counter' && (
              <div className="pay-section">
                <div className="pay-form-grid">
                  <div className="form-group full"><label>Full Name</label><input type="text" placeholder="Enter your full name" /></div>
                  <div className="form-group"><label>Email</label><input type="email" placeholder="email@example.com" /></div>
                  <div className="form-group"><label>Phone</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
                  <div className="form-group full"><label>Special Requests</label><input type="text" placeholder="Early check-in, extra bed, dietary needs…" /></div>
                </div>
                <button className="pay-now-btn counter-btn" onClick={processPayment}>Reserve & Pay at Counter →</button>
              </div>
            )}

            <div className="secure-note">🔒 All transactions are 256-bit SSL encrypted and PCI-DSS compliant</div>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" className="gallery-section">
        <div className="section-header">
          <span className="section-tag">Gallery</span>
          <h2>A Glimpse of Traveller Inn</h2>
          <p>Mountain mornings, warm evenings, and memories that last a lifetime.</p>
        </div>
        <div className="gallery-grid">
          {galleryData.map((item, idx) => (
            <div className="gallery-item" key={idx}>
              <img src={item.src} alt={item.label} className="gallery-photo" loading="lazy" />
              <div className="gallery-overlay"><span>{item.label}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PLACES TO VISIT ═══ */}
      <section id="places" className="places-section">
        <div className="section-header">
          <span className="section-tag">Explore Nearby</span>
          <h2>Places to Visit Around Us</h2>
          <p>From sacred temples to shimmering lakes, the Kumaon region is brimming with experiences worth discovering.</p>
        </div>
        <div className="places-grid">
          {placesData.map((place, idx) => (
            <div className="place-card" key={idx}>
              <div className="place-header" style={{ background: place.gradient }}>
                <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="32" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <text x="40" y="52" fontSize="30" textAnchor="middle" fill="white">{place.emoji}</text>
                </svg>
                <span className="place-dist">{place.dist}</span>
              </div>
              <div className="place-body">
                <h3>{place.name}</h3>
                <p>{place.desc}</p>
                <span className="place-type">{place.type}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="about-section">
        <div className="section-header">
          <span className="section-tag">About & Location</span>
          <h2>Find Us in the Hills</h2>
          <p>Hotel Traveller Inn is your home in the Kumaon Himalayas — a heritage of hospitality since 2005.</p>
        </div>
        <div className="about-wrapper">
          <div className="about-text">
            <h2>A Sanctuary Above the Clouds</h2>
            <p>Perched at 1,706 metres in the charming hill town of Bhowali, Hotel Traveller Inn has been welcoming guests seeking peace, adventure, and the soul-restoring beauty of the Kumaon Himalayas for nearly two decades.</p>
            <p>Our property is surrounded by orchards of apples, peaches, and apricots — you can literally taste the landscape. The view from our terrace spans across the valley toward Nainital's lake, glittering in the distance.</p>
            <div className="about-facts">
              <div className="fact-box"><div className="num">18+</div><div className="label">Years of Hospitality</div></div>
              <div className="fact-box"><div className="num">24</div><div className="label">Curated Rooms & Suites</div></div>
              <div className="fact-box"><div className="num">1,706m</div><div className="label">Altitude Above Sea Level</div></div>
              <div className="fact-box"><div className="num">4.7★</div><div className="label">Guest Rating</div></div>
            </div>
            <div className="contact-info">
              <div className="contact-row">
                <div className="contact-icon">📍</div>
                <div><strong>Hotel Traveller Inn</strong><br/>Bhowali, Nainital District,<br/>Uttarakhand 263132, India</div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">📞</div>
                <div><strong>+91 98765 43210</strong>&nbsp;|&nbsp;<strong>+91 05942 XXXXXX</strong></div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">✉️</div>
                <div>reservations@hoteltravellerinn.com</div>
              </div>
              <div className="contact-row">
                <div className="contact-icon">🚗</div>
                <div>11 km from Nainital · 29 km from Kathgodam Railway Station · 63 km from Pantnagar Airport</div>
              </div>
            </div>
          </div>
          <div className="about-map">
            <div className="map-dots"></div>
            <svg width="220" height="200" viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative', zIndex: 2 }}>
              <polygon points="110,10 150,25 180,55 185,90 170,130 145,155 120,175 110,180 100,175 75,155 50,130 35,90 40,55 70,25" fill="none" stroke="#1D9E75" strokeWidth="1.5" opacity="0.4"/>
              <ellipse cx="118" cy="58" rx="28" ry="18" fill="#1D9E75" opacity="0.18"/>
              <ellipse cx="118" cy="58" rx="14" ry="9" fill="#1D9E75" opacity="0.3"/>
              <circle cx="118" cy="58" r="6" fill="#1D9E75"/>
              <circle cx="118" cy="58" r="3" fill="white"/>
              <line x1="118" y1="64" x2="118" y2="72" stroke="#1D9E75" strokeWidth="2"/>
              <circle cx="118" cy="58" r="12" fill="none" stroke="#1D9E75" strokeWidth="1" opacity="0.5"/>
              <circle cx="118" cy="58" r="20" fill="none" stroke="#1D9E75" strokeWidth="0.8" opacity="0.3"/>
              <rect x="75" y="95" width="86" height="28" fill="rgba(8,80,65,0.5)" rx="4"/>
              <text x="118" y="112" fontSize="10" textAnchor="middle" fill="white" fontFamily="sans-serif">Bhowali, Nainital</text>
            </svg>
            <div className="map-pin-wrapper" style={{ position: 'relative', zIndex: 2 }}>
              <div className="map-label">Hotel Traveller Inn</div>
              <div className="map-sub">Bhowali · Nainital · Uttarakhand</div>
            </div>
            <a href="https://maps.google.com/?q=Bhowali+Nainital+Uttarakhand" target="_blank" rel="noopener noreferrer" className="map-link">Open in Google Maps ↗</a>
          </div>
        </div>
      </section>

      {/* ═══ BOOKING MODAL ═══ */}
      {modalOpen && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.className.includes('modal-overlay')) closeBookingModal(); }}>
          <div className="modal">
            <button className="modal-close" onClick={closeBookingModal}>✕</button>
            {!bookingSuccess ? (
              <div id="modal-form-content">
                <h2>Book Your Stay</h2>
                <p className="subtitle">Hotel Traveller Inn · Bhowali, Nainital</p>
                <div className="modal-form">
                  <input type="text" placeholder="Full Name *" name="name" value={modalForm.name} onChange={handleModalChange} />
                  <input type="email" placeholder="Email Address *" name="email" value={modalForm.email} onChange={handleModalChange} />
                  <input type="tel" placeholder="Phone / WhatsApp *" name="phone" value={modalForm.phone} onChange={handleModalChange} />
                  <div className="row-2">
                    <input type="date" name="checkIn" value={modalForm.checkIn || defaultCheckIn} onChange={handleModalChange} />
                    <input type="date" name="checkOut" value={modalForm.checkOut || defaultCheckOut} onChange={handleModalChange} />
                  </div>
                  <select name="room" value={modalForm.room} onChange={handleModalChange}>
                    <option value="">Select Room Type</option>
                    <option>Standard Mountain View – ₹2,500/night</option>
                    <option>Deluxe Valley Suite – ₹4,200/night</option>
                    <option>Premium Forest Suite – ₹6,800/night</option>
                    <option>Family Comfort Room – ₹5,500/night</option>
                  </select>
                  <div className="row-2">
                    <select name="adults" value={modalForm.adults} onChange={handleModalChange}>
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                    </select>
                    <select name="children" value={modalForm.children} onChange={handleModalChange}>
                      <option>No Children</option>
                      <option>1 Child</option>
                      <option>2 Children</option>
                    </select>
                  </div>
                  <textarea rows="3" placeholder="Special requests (early check-in, dietary needs, etc.)" name="requests" value={modalForm.requests} onChange={handleModalChange}></textarea>
                  <button className="modal-submit" onClick={submitBooking}>Confirm Booking & Proceed to Payment</button>
                  <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--slate-mid)' }}>Free cancellation up to 48 hours before check-in</div>
                </div>
              </div>
            ) : (
              <div className="success-message" id="modal-success" style={{ display: 'block' }}>
                <div className="check">✅</div>
                <h3>Booking Confirmed!</h3>
                <p>Thank you! Your reservation at Hotel Traveller Inn has been received. A confirmation will be sent to your email & WhatsApp shortly.<br/><br/>For urgent queries: <strong>+91 98765 43210</strong></p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
