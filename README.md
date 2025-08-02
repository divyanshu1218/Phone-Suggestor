# 📱 AI Phone Selector - MVP

An intelligent web application that helps users find the perfect smartphone based on their budget and use case, powered by AI recommendations.

## 🚀 Features

- **Smart Input Form**: Users input their budget and primary use case
- **Phone Filtering**: Filter phones from MongoDB based on criteria
- **AI-Powered Recommendations**: Uses OpenAI GPT to generate personalized recommendations
- **Interactive UI**: Modern, responsive design with beautiful animations
- **Purchase Links**: Direct links to buy recommended phones

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI GPT API
- **Styling**: Modern CSS with gradients and animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- OpenAI API key

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Navigate to the project directory
cd AI-project

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/AI-project
npm install
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```bash
cd backend
touch .env
```

Add the following environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/phone-selector
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

### 3. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend Development Server
```bash
cd frontend/AI-project
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
AI-project/
├── backend/
│   ├── models/
│   │   └── Phone.js          # MongoDB phone schema
│   ├── routes/
│   │   ├── phones.js         # Phone filtering API
│   │   └── recommendations.js # AI recommendations API
│   ├── server.js             # Express server
│   └── package.json
├── frontend/
│   └── AI-project/
│       ├── src/
│       │   ├── App.jsx       # Main React component
│       │   ├── App.css       # Modern styling
│       │   └── main.jsx
│       └── package.json
└── README.md
```

## 🔧 API Endpoints

### Phones
- `GET /api/phones` - Get all phones
- `GET /api/phones/filter?budget=800&useCase=gaming` - Filter phones by budget and use case
- `GET /api/phones/:id` - Get specific phone
- `POST /api/phones` - Add new phone (for admin)

### Recommendations
- `POST /api/recommendations/generate` - Generate AI recommendations

## 🎯 How It Works

1. **User Input**: User enters budget and selects primary use case
2. **Phone Filtering**: Backend filters phones from MongoDB based on criteria
3. **Phone Selection**: User selects 2-3 phones of interest
4. **AI Analysis**: OpenAI GPT analyzes selected phones and generates recommendations
5. **Results Display**: Shows AI-generated pros/cons and purchase links

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Gradients**: Beautiful color schemes and animations
- **Interactive Cards**: Hover effects and selection states
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI recommendations | Yes |
| `PORT` | Backend server port (default: 5000) | No |

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB (MongoDB Atlas recommended)
2. Deploy to platforms like Heroku, Railway, or Vercel
3. Set environment variables in deployment platform

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or GitHub Pages
3. Update API base URL in `App.jsx` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check that all dependencies are installed
2. Verify environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check OpenAI API key is valid and has credits

---

**Built with ❤️ using MERN stack and OpenAI** # Phone-Suggestor
