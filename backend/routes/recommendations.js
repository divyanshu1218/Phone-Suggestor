import express from 'express';
import Phone from '../models/Phone.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// Initialize Google Gemini with proper error handling
let genAI;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('Google Gemini API key not configured properly');
  } else {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('Google Gemini initialized successfully');
  }
} catch (error) {
  console.warn('Google Gemini not initialized:', error.message);
}

// Generate AI recommendations
router.post('/generate', async (req, res) => {
  try {
    const { budget, useCase, selectedPhones } = req.body;
    
    if (!selectedPhones || selectedPhones.length === 0) {
      return res.status(400).json({ message: 'No phones selected for recommendation' });
    }

    // Check if Gemini is available
    if (!genAI || !process.env.GEMINI_API_KEY || 
        process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ 
        message: 'AI recommendations are not available. Please configure a valid Google Gemini API key.',
        error: 'Gemini API key not configured',
        details: 'Please get a valid API key from https://makersuite.google.com/app/apikey and update your .env file',
        debug: {
          hasGemini: !!genAI,
          hasApiKey: !!process.env.GEMINI_API_KEY,
          apiKeyType: process.env.GEMINI_API_KEY ? 'Set' : 'Not set'
        }
      });
    }

    // Get detailed phone information
    const phoneIds = selectedPhones.map(phone => phone._id || phone.id);
    const phones = await Phone.find({ _id: { $in: phoneIds } });
    
    if (phones.length === 0) {
      return res.status(404).json({ message: 'No phones found' });
    }

    // Prepare phone data for AI analysis
    const phoneData = phones.map(phone => ({
      name: phone.name,
      brand: phone.brand,
      price: phone.price,
      specs: phone.specs,
      pros: phone.pros,
      cons: phone.cons
    }));

    // Create professional and brief prompt for Gemini
    const prompt = `
    You are a professional tech consultant. Analyze these ${phones.length} smartphones for a client with budget $${budget} and primary use case: ${useCase}.

    Phone specifications:
    ${phoneData.map(phone => `
    ${phone.brand} ${phone.name} - $${phone.price}
    Specs: ${phone.specs.screen}, ${phone.specs.processor}, ${phone.specs.camera}
    Pros: ${phone.pros.join(', ')}
    Cons: ${phone.cons.join(', ')}
    `).join('\n')}

    Provide a professional recommendation in this exact JSON format (no additional text):
    {
      "comparison": "Brief 2-3 sentence professional comparison focusing on ${useCase} performance and value",
      "topRecommendation": "Phone name",
      "recommendations": [
        {
          "phoneName": "Phone name",
          "pros": ["Key advantage 1", "Key advantage 2"],
          "cons": ["Main drawback 1", "Main drawback 2"],
          "reasoning": "2-3 sentence professional reasoning for ${useCase} use case"
        }
      ],
      "finalRecommendation": "3-4 sentence professional summary with clear recommendation for ${useCase}"
    }

    Be concise, professional, and focus on the most important factors for ${useCase} within the $${budget} budget.
    `;

    try {
      // Generate AI recommendation using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();
      
      // Try to parse JSON response, fallback to text if needed
      let recommendationData;
      try {
        // Clean the response to extract JSON
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          recommendationData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found in response');
        }
      } catch (error) {
        // If JSON parsing fails, create a structured response
        recommendationData = {
          comparison: `Professional comparison of ${phones.length} phones for ${useCase} within $${budget} budget.`,
          topRecommendation: phones[0].name,
          recommendations: phones.map(phone => ({
            phoneName: phone.name,
            pros: phone.pros.slice(0, 2),
            cons: phone.cons.slice(0, 2),
            reasoning: `Professional recommendation for ${useCase} use case within your budget.`
          })),
          finalRecommendation: `Based on your ${useCase} requirements and $${budget} budget, we recommend the selected phone for optimal performance and value.`
        };
      }

      res.json({
        success: true,
        data: recommendationData,
        phones: phones
      });

    } catch (geminiError) {
      console.error('Gemini API Error:', geminiError);
      
      // Handle specific Gemini errors
      if (geminiError.message && geminiError.message.includes('quota')) {
        return res.status(500).json({
          message: 'AI service is temporarily unavailable due to quota limits. Please try again later.',
          error: 'Gemini quota exceeded',
          details: 'Your Gemini API key has exceeded its usage quota. Please check your billing or use a different API key.'
        });
      } else if (geminiError.message && geminiError.message.includes('API_KEY')) {
        return res.status(500).json({
          message: 'AI service configuration error. Please check your API key.',
          error: 'Gemini authentication failed',
          details: 'The Gemini API key is invalid or expired. Please get a valid key from https://makersuite.google.com/app/apikey'
        });
      } else {
        return res.status(500).json({
          message: 'AI service is temporarily unavailable. Please try again later.',
          error: 'Gemini API error',
          details: geminiError.message
        });
      }
    }

  } catch (error) {
    console.error('Recommendation generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate recommendation',
      error: error.message 
    });
  }
});

export default router; 