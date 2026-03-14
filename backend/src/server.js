const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hotel Traveller Inn API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
