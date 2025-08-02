import dotenv from 'dotenv';
// Load environment variables first
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import phoneRoutes from './routes/phones.js';
import recommendationRoutes from './routes/recommendations.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/phone-selector')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/phones', phoneRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Phone Selector API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Configured' : 'Not set'}`);
  console.log(`Google Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Missing'}`);
}); 