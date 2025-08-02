import express from 'express';
import Phone from '../models/Phone.js';

const router = express.Router();

// Get all phones
router.get('/', async (req, res) => {
  try {
    const phones = await Phone.find().sort({ price: 1 });
    res.json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get phones by budget and use case
router.get('/filter', async (req, res) => {
  try {
    const { budget, useCase } = req.query;
    
    let query = {};
    
    // Filter by budget
    if (budget) {
      query.price = { $lte: parseInt(budget) };
    }
    
    // Filter by use case
    if (useCase) {
      query.useCases = useCase;
    }
    
    const phones = await Phone.find(query)
      .sort({ price: -1 }) // Sort by price descending
      .limit(10);
    
    res.json(phones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get phone by ID
router.get('/:id', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone) {
      return res.status(404).json({ message: 'Phone not found' });
    }
    res.json(phone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new phone (for seeding data)
router.post('/', async (req, res) => {
  try {
    const phone = new Phone(req.body);
    const savedPhone = await phone.save();
    res.status(201).json(savedPhone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 