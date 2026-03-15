const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a booking
router.post('/', async (req, res) => {
  try {
    const { roomId, customerName, customerEmail, customerPhone, checkIn, checkOut, adults, children, specialRequests, totalAmount } = req.body;
    
    const booking = await prisma.booking.create({
      data: {
        roomId: parseInt(roomId),
        customerName,
        customerEmail,
        customerPhone: customerPhone || '',
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        adults: parseInt(adults) || 2,
        children: parseInt(children) || 0,
        specialRequests: specialRequests || null,
        totalAmount: parseFloat(totalAmount),
        status: 'pending'
      }
    });
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Failed to create booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status }
    });
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

module.exports = router;
