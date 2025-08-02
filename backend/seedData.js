import mongoose from 'mongoose';
import Phone from './models/Phone.js';
import dotenv from 'dotenv';

dotenv.config();

const smartphones = [
  // Budget Phones ($100-300)
  {
    name: "Samsung Galaxy A15",
    brand: "Samsung",
    price: 199,
    category: "budget",
    specs: {
      screen: "6.5-inch AMOLED",
      processor: "MediaTek Dimensity 6100+",
      ram: "4GB",
      storage: "128GB",
      camera: "50MP + 5MP + 2MP",
      battery: "5000mAh"
    },
    useCases: ["student", "social-media"],
    pros: ["Great battery life", "Good display", "Affordable price"],
    cons: ["Basic camera", "Limited performance", "No 5G"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.com/samsung-galaxy-a15", price: 199 },
      { store: "Best Buy", url: "https://bestbuy.com/samsung-galaxy-a15", price: 199 }
    ]
  },
  {
    name: "Motorola Moto G Power",
    brand: "Motorola",
    price: 249,
    category: "budget",
    specs: {
      screen: "6.7-inch IPS LCD",
      processor: "MediaTek Dimensity 7020",
      ram: "6GB",
      storage: "128GB",
      camera: "50MP + 8MP + 2MP",
      battery: "5000mAh"
    },
    useCases: ["student", "social-media"],
    pros: ["Excellent battery life", "Clean Android", "Good value"],
    cons: ["Average camera", "Plastic build", "No wireless charging"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.com/motorola-moto-g-power", price: 249 },
      { store: "Motorola", url: "https://motorola.com/moto-g-power", price: 249 }
    ]
  },
  {
    name: "Nokia G50",
    brand: "Nokia",
    price: 299,
    category: "budget",
    specs: {
      screen: "6.82-inch IPS LCD",
      processor: "Snapdragon 480",
      ram: "4GB",
      storage: "128GB",
      camera: "48MP + 5MP + 2MP",
      battery: "5000mAh"
    },
    useCases: ["student", "social-media"],
    pros: ["Stock Android", "Good build quality", "Reliable"],
    cons: ["Slow performance", "Basic camera", "No 5G"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.com/nokia-g50", price: 299 },
      { store: "Nokia", url: "https://nokia.com/g50", price: 299 }
    ]
  },
  {
    name: "OnePlus Nord N30",
    brand: "OnePlus",
    price: 299,
    category: "budget",
    specs: {
      screen: "6.72-inch AMOLED",
      processor: "Snapdragon 695",
      ram: "8GB",
      storage: "128GB",
      camera: "108MP + 2MP + 2MP",
      battery: "5000mAh"
    },
    useCases: ["gaming", "student", "social-media"],
    pros: ["Fast charging", "Good performance", "AMOLED display"],
    cons: ["No wireless charging", "Basic camera", "Plastic build"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.com/oneplus-nord-n30", price: 299 },
      { store: "OnePlus", url: "https://oneplus.com/nord-n30", price: 299 }
    ]
  },
  {
    name: "Google Pixel 6a",
    brand: "Google",
    price: 349,
    category: "budget",
    specs: {
      screen: "6.1-inch OLED",
      processor: "Google Tensor",
      ram: "6GB",
      storage: "128GB",
      camera: "12.2MP + 12MP",
      battery: "4410mAh"
    },
    useCases: ["camera", "photography", "social-media"],
    pros: ["Excellent camera", "Stock Android", "Fast updates"],
    cons: ["Limited storage", "No expandable storage", "Average battery"],
    buyLinks: [
      { store: "Google Store", url: "https://store.google.com/pixel-6a", price: 349 },
      { store: "Amazon", url: "https://amazon.com/google-pixel-6a", price: 349 }
    ]
  },

  // Mid-Range Phones ($300-700)
  {
    name: "Samsung Galaxy A54",
    brand: "Samsung",
    price: 449,
    category: "mid-range",
    specs: {
      screen: "6.4-inch AMOLED",
      processor: "Exynos 1380",
      ram: "8GB",
      storage: "256GB",
      camera: "50MP + 12MP + 5MP",
      battery: "5000mAh"
    },
    useCases: ["camera", "social-media", "student"],
    pros: ["Great camera", "Water resistant", "Good battery"],
    cons: ["No wireless charging", "Plastic frame", "Average performance"],
    buyLinks: [
      { store: "Samsung", url: "https://samsung.com/galaxy-a54", price: 449 },
      { store: "Amazon", url: "https://amazon.com/samsung-galaxy-a54", price: 449 }
    ]
  },
  {
    name: "OnePlus 11",
    brand: "OnePlus",
    price: 699,
    category: "mid-range",
    specs: {
      screen: "6.7-inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB",
      storage: "128GB",
      camera: "50MP + 48MP + 32MP",
      battery: "5000mAh"
    },
    useCases: ["gaming", "camera", "business"],
    pros: ["Fast performance", "Great camera", "Fast charging"],
    cons: ["No wireless charging", "Software updates", "No IP rating"],
    buyLinks: [
      { store: "OnePlus", url: "https://oneplus.com/oneplus-11", price: 699 },
      { store: "Amazon", url: "https://amazon.com/oneplus-11", price: 699 }
    ]
  },
  {
    name: "Google Pixel 7",
    brand: "Google",
    price: 599,
    category: "mid-range",
    specs: {
      screen: "6.3-inch OLED",
      processor: "Google Tensor G2",
      ram: "8GB",
      storage: "128GB",
      camera: "50MP + 12MP",
      battery: "4355mAh"
    },
    useCases: ["camera", "photography", "business"],
    pros: ["Best camera", "Stock Android", "AI features"],
    cons: ["Average battery", "No expandable storage", "Limited availability"],
    buyLinks: [
      { store: "Google Store", url: "https://store.google.com/pixel-7", price: 599 },
      { store: "Amazon", url: "https://amazon.com/google-pixel-7", price: 599 }
    ]
  },
  {
    name: "iPhone 13",
    brand: "Apple",
    price: 699,
    category: "mid-range",
    specs: {
      screen: "6.1-inch OLED",
      processor: "A15 Bionic",
      ram: "4GB",
      storage: "128GB",
      camera: "12MP + 12MP",
      battery: "3240mAh"
    },
    useCases: ["camera", "photography", "business", "social-media"],
    pros: ["Excellent camera", "Great performance", "iOS ecosystem"],
    cons: ["No expandable storage", "Limited customization", "No 120Hz"],
    buyLinks: [
      { store: "Apple", url: "https://apple.com/iphone-13", price: 699 },
      { store: "Amazon", url: "https://amazon.com/iphone-13", price: 699 }
    ]
  },
  {
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    price: 799,
    category: "mid-range",
    specs: {
      screen: "6.1-inch AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "8GB",
      storage: "256GB",
      camera: "50MP + 12MP + 10MP",
      battery: "3900mAh"
    },
    useCases: ["gaming", "camera", "business"],
    pros: ["Great camera", "Premium build", "Good performance"],
    cons: ["Expensive", "No expandable storage", "Average battery"],
    buyLinks: [
      { store: "Samsung", url: "https://samsung.com/galaxy-s23", price: 799 },
      { store: "Amazon", url: "https://amazon.com/samsung-galaxy-s23", price: 799 }
    ]
  },

  // Flagship Phones ($700-1200)
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 999,
    category: "flagship",
    specs: {
      screen: "6.1-inch OLED",
      processor: "A17 Pro",
      ram: "8GB",
      storage: "128GB",
      camera: "48MP + 12MP + 12MP",
      battery: "3650mAh"
    },
    useCases: ["camera", "photography", "business", "social-media"],
    pros: ["Excellent camera system", "Premium build quality", "Powerful A17 Pro chip", "iOS ecosystem"],
    cons: ["Expensive", "No expandable storage", "Limited customization"],
    buyLinks: [
      { store: "Apple", url: "https://www.apple.com/iphone-15-pro/", price: 999 },
      { store: "Amazon", url: "https://amazon.com/iphone-15-pro", price: 999 }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    category: "flagship",
    specs: {
      screen: "6.8-inch AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      camera: "200MP + 12MP + 50MP + 10MP",
      battery: "5000mAh"
    },
    useCases: ["gaming", "camera", "photography", "business"],
    pros: ["Best camera", "S Pen support", "Premium build", "Great performance"],
    cons: ["Very expensive", "Large size", "Heavy"],
    buyLinks: [
      { store: "Samsung", url: "https://samsung.com/galaxy-s24-ultra", price: 1199 },
      { store: "Amazon", url: "https://amazon.com/samsung-galaxy-s24-ultra", price: 1199 }
    ]
  },
  {
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 999,
    category: "flagship",
    specs: {
      screen: "6.7-inch OLED",
      processor: "Google Tensor G3",
      ram: "12GB",
      storage: "128GB",
      camera: "50MP + 48MP + 48MP",
      battery: "4950mAh"
    },
    useCases: ["camera", "photography", "business"],
    pros: ["Best camera", "Stock Android", "AI features", "Fast updates"],
    cons: ["Expensive", "Limited availability", "Average battery"],
    buyLinks: [
      { store: "Google Store", url: "https://store.google.com/pixel-8-pro", price: 999 },
      { store: "Amazon", url: "https://amazon.com/google-pixel-8-pro", price: 999 }
    ]
  },
  {
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 799,
    category: "mid-range",
    specs: {
      screen: "6.82-inch AMOLED",
      processor: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "256GB",
      camera: "50MP + 48MP + 64MP",
      battery: "5400mAh"
    },
    useCases: ["gaming", "camera", "student", "social-media"],
    pros: ["Great value", "Fast charging", "Good performance", "Large battery"],
    cons: ["No wireless charging", "Limited camera features", "Software updates"],
    buyLinks: [
      { store: "OnePlus", url: "https://www.oneplus.com/oneplus-12", price: 799 },
      { store: "Amazon", url: "https://amazon.com/oneplus-12", price: 799 }
    ]
  },
  {
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    category: "flagship",
    specs: {
      screen: "6.7-inch OLED",
      processor: "A17 Pro",
      ram: "8GB",
      storage: "256GB",
      camera: "48MP + 12MP + 12MP",
      battery: "4441mAh"
    },
    useCases: ["camera", "photography", "business", "social-media"],
    pros: ["Best camera", "Premium build", "Great performance", "iOS ecosystem"],
    cons: ["Very expensive", "Large size", "No expandable storage"],
    buyLinks: [
      { store: "Apple", url: "https://apple.com/iphone-15-pro-max", price: 1199 },
      { store: "Amazon", url: "https://amazon.com/iphone-15-pro-max", price: 1199 }
    ]
  }
];

// Generate comprehensive phone list with variations
const generateComprehensivePhoneList = () => {
  const allPhones = [];
  
  // Add the main smartphones
  allPhones.push(...smartphones);
  
  // Budget phones ($100-300) - 50 phones
  const budgetBrands = ["Samsung", "Motorola", "Nokia", "OnePlus", "Google", "Xiaomi", "Realme", "POCO", "Vivo", "Oppo", "Infinix", "Tecno", "Itel", "Honor", "ZTE"];
  const budgetModels = ["A15", "Moto G Power", "G50", "Nord N30", "Pixel 6a", "Redmi Note 12", "Realme 10", "X5", "Y27", "A78", "Note 30", "Camon 20", "S23", "X8", "Blade V50"];
  
  for (let i = 0; i < 50; i++) {
    const brand = budgetBrands[i % budgetBrands.length];
    const model = budgetModels[i % budgetModels.length];
    const price = 150 + Math.floor(Math.random() * 150);
    
    allPhones.push({
      name: `${brand} ${model}`,
      brand: brand,
      price: price,
      category: "budget",
      specs: {
        screen: "6.5-inch IPS LCD",
        processor: "MediaTek Dimensity 700",
        ram: "4GB",
        storage: "64GB",
        camera: "48MP + 2MP + 2MP",
        battery: "5000mAh"
      },
      useCases: ["student", "social-media"],
      pros: ["Affordable", "Good battery", "Basic features"],
      cons: ["Limited performance", "Basic camera", "No 5G"],
      buyLinks: [
        { store: "Amazon", url: `https://amazon.com/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}`, price: price },
        { store: brand, url: `https://${brand.toLowerCase()}.com/${model.toLowerCase().replace(/\s+/g, '-')}`, price: price }
      ]
    });
  }
  
  // Mid-range phones ($300-700) - 100 phones
  const midRangeBrands = ["Samsung", "OnePlus", "Google", "Apple", "Xiaomi", "Realme", "Vivo", "Oppo", "Honor", "Motorola", "Nothing", "ASUS", "Sony", "LG", "HTC"];
  const midRangeModels = ["Galaxy A54", "OnePlus 11", "Pixel 7", "iPhone 13", "Redmi Note 13 Pro", "GT Neo 3", "V27", "Reno 8", "Honor 90", "Edge 40", "Phone 2", "Zenfone 10", "Xperia 10", "G8", "U12+"];
  
  for (let i = 0; i < 100; i++) {
    const brand = midRangeBrands[i % midRangeBrands.length];
    const model = midRangeModels[i % midRangeModels.length];
    const price = 350 + Math.floor(Math.random() * 350);
    
    allPhones.push({
      name: `${brand} ${model}`,
      brand: brand,
      price: price,
      category: "mid-range",
      specs: {
        screen: "6.7-inch AMOLED",
        processor: "Snapdragon 7 Gen 2",
        ram: "8GB",
        storage: "128GB",
        camera: "64MP + 8MP + 2MP",
        battery: "5000mAh"
      },
      useCases: ["gaming", "camera", "social-media"],
      pros: ["Good performance", "AMOLED display", "Fast charging"],
      cons: ["No wireless charging", "Average camera", "Plastic build"],
      buyLinks: [
        { store: "Amazon", url: `https://amazon.com/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}`, price: price },
        { store: brand, url: `https://${brand.toLowerCase()}.com/${model.toLowerCase().replace(/\s+/g, '-')}`, price: price }
      ]
    });
  }
  
  // Flagship phones ($700-1200) - 50 phones
  const flagshipBrands = ["Samsung", "Apple", "Google", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Honor", "ASUS", "Sony"];
  const flagshipModels = ["Galaxy S24 Ultra", "iPhone 15 Pro", "Pixel 8 Pro", "OnePlus 12", "Xiaomi 13 Ultra", "X90 Pro+", "Find X6 Pro", "Magic 5 Pro", "ROG Phone 7", "Xperia 1 V"];
  
  for (let i = 0; i < 50; i++) {
    const brand = flagshipBrands[i % flagshipBrands.length];
    const model = flagshipModels[i % flagshipModels.length];
    const price = 800 + Math.floor(Math.random() * 400);
    
    allPhones.push({
      name: `${brand} ${model}`,
      brand: brand,
      price: price,
      category: "flagship",
      specs: {
        screen: "6.8-inch AMOLED",
        processor: "Snapdragon 8 Gen 2",
        ram: "12GB",
        storage: "256GB",
        camera: "108MP + 12MP + 10MP",
        battery: "5000mAh"
      },
      useCases: ["gaming", "camera", "photography", "business"],
      pros: ["Premium build", "Great camera", "Fast performance"],
      cons: ["Expensive", "Large size", "Heavy"],
      buyLinks: [
        { store: "Amazon", url: `https://amazon.com/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}`, price: price },
        { store: brand, url: `https://${brand.toLowerCase()}.com/${model.toLowerCase().replace(/\s+/g, '-')}`, price: price }
      ]
    });
  }
  
  return allPhones;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Phone.deleteMany({});
    console.log('Cleared existing phone data');
    
    // Generate all phones
    const allPhones = generateComprehensivePhoneList();
    
    // Insert phones
    const insertedPhones = await Phone.insertMany(allPhones);
    console.log(`✅ Added ${insertedPhones.length} phones to database`);
    
    console.log('Sample data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 