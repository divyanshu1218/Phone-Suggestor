import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');

// Check if .env file already exists
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  process.exit(0);
}

// Create .env file with template
const envContent = `# MongoDB Connection String
# Use your local MongoDB or MongoDB Atlas connection string
MONGODB_URI=mongodb://localhost:27017/phone-selector

# OpenAI API Key
# Get your API key from https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Server Port (optional, defaults to 5000)
PORT=5000
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please edit the .env file and add your actual values:');
  console.log('   - Replace "your_openai_api_key_here" with your OpenAI API key');
  console.log('   - Update MONGODB_URI if using a different database');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  process.exit(1);
} 