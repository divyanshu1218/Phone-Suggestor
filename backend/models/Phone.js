import mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['budget', 'mid-range', 'flagship']
  },
  specs: {
    screen: String,
    processor: String,
    ram: String,
    storage: String,
    camera: String,
    battery: String
  },
  useCases: [{
    type: String,
    enum: ['gaming', 'camera', 'business', 'student', 'photography', 'social-media']
  }],
  pros: [String],
  cons: [String],
  buyLinks: [{
    store: String,
    url: String,
    price: Number
  }],
  imageUrl: String,
  releaseDate: Date
}, {
  timestamps: true
});

// Index for better search performance
phoneSchema.index({ price: 1, useCases: 1, category: 1 });

export default mongoose.model('Phone', phoneSchema); 