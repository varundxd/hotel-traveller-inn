const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) }
    });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

module.exports = router;
