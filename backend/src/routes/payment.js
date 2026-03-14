const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_demo123456789',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'demo_secret_key_placeholder'
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, bookingId, roomName } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency: currency || 'INR',
      receipt: `booking_${bookingId}`,
      notes: {
        roomName: roomName,
        bookingId: bookingId
      }
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment signature
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'demo_secret_key_placeholder')
      .update(sign)
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      res.json({ verified: true, message: 'Payment verified successfully!' });
    } else {
      res.status(400).json({ verified: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
