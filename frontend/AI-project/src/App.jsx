import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [budget, setBudget] = useState('');
  const [useCase, setUseCase] = useState('');
  const [phones, setPhones] = useState([]);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const useCases = [
    { value: 'gaming', label: '🎮 Gaming' },
    { value: 'camera', label: '📸 Camera & Photography' },
    { value: 'business', label: '💼 Business' },
    { value: 'student', label: '📚 Student' },
    { value: 'photography', label: '📷 Professional Photography' },
    { value: 'social-media', label: '📱 Social Media' }
  ];

  const API_BASE_URL = 'http://localhost:9000/api';

  // Generate a simple placeholder image URL
  const getPhoneImage = (phoneName) => {
    // Use a simple data URL for placeholder images
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 300, 400);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 400);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(phoneName, 150, 200);
    
    return canvas.toDataURL();
  };

  // Fetch phones based on budget and use case
  const fetchPhones = async () => {
    if (!budget || !useCase) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_BASE_URL}/phones/filter`, {
        params: { budget, useCase }
      });
      setPhones(response.data);
    } catch (err) {
      setError('Failed to fetch phones. Please try again.');
      console.error('Error fetching phones:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate AI recommendations
  const generateRecommendations = async () => {
    if (selectedPhones.length === 0) {
      setError('Please select at least one phone for recommendations.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/recommendations/generate`, {
        budget,
        useCase,
        selectedPhones
      });
      setRecommendations(response.data);
    } catch (err) {
      console.error('Error generating recommendations:', err);
      
      // Handle specific error types
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        if (errorData.error === 'Gemini quota exceeded') {
          setError('🤖 AI service is temporarily unavailable due to quota limits. Please try again later or contact support to update your API key.');
        } else if (errorData.error === 'Gemini authentication failed') {
          setError('🔑 AI service configuration error. Please check your Google Gemini API key.');
        } else if (errorData.error === 'Gemini API key not configured') {
          setError('🔧 AI recommendations are not available. Please configure a valid Google Gemini API key in your backend .env file. Get one from https://makersuite.google.com/app/apikey');
        } else if (errorData.message) {
          setError(errorData.message);
        } else {
          setError('Failed to generate AI recommendations. Please try again.');
        }
      } else {
        setError('Failed to generate recommendations. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle phone selection
  const togglePhoneSelection = (phone) => {
    setSelectedPhones(prev => {
      const isSelected = prev.find(p => p._id === phone._id);
      if (isSelected) {
        return prev.filter(p => p._id !== phone._id);
      } else {
        return [...prev, phone];
      }
    });
  };

  // Reset form
  const resetForm = () => {
    setBudget('');
    setUseCase('');
    setPhones([]);
    setSelectedPhones([]);
    setRecommendations(null);
    setError('');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📱 AI Phone Selector</h1>
        <p>Find your perfect phone with AI-powered recommendations</p>
      </header>

      <main className="main">
        {/* Input Form */}
        <section className="input-section">
          <h2>Tell us what you need</h2>
          
          <div className="form-group">
            <label htmlFor="budget">Budget (USD)</label>
            <input
              type="number"
              id="budget"
              value={budget}
              onChange={(e) => {
                const val = e.target.value;
                setBudget(val);
                if (val && (parseInt(val) < 300)) {
                  setError('Budget must be at least $300.');
                } else if (val && (parseInt(val) > 2000)) {
                  setError('Budget cannot exceed $2000.');
                } else {
                  setError('');
                }
              }}
              placeholder="e.g., 800"
              min="300"
              max="2000"
            />
          </div>

          <div className="form-group">
            <label>Primary Use Case</label>
            <div className="use-case-grid">
              {useCases.map((uc) => (
                <button
                  key={uc.value}
                  className={`use-case-btn ${useCase === uc.value ? 'selected' : ''}`}
                  onClick={() => setUseCase(uc.value)}
                >
                  {uc.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              className="btn btn-primary"
              onClick={fetchPhones}
              disabled={!budget || !useCase || loading}
            >
              {loading ? 'Searching...' : 'Find Phones'}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </section>

        {/* Phone Results */}
        {phones.length > 0 && (
          <section className="results-section">
            <h2>Available Phones ({phones.length})</h2>
            <p>Select 2-3 phones for AI recommendations</p>
            
            <div className="phones-grid">
              {phones.map((phone) => {
                const isSelected = selectedPhones.find(p => p._id === phone._id);
                return (
                  <div 
                    key={phone._id} 
                    className={`phone-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => togglePhoneSelection(phone)}
                  >
                    <div className="phone-image">
                      <div 
                        className="phone-placeholder"
                        style={{
                          width: '200px',
                          height: '200px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          padding: '20px'
                        }}
                      >
                        {phone.brand}<br/>{phone.name}
                      </div>
                    </div>
                    <div className="phone-info">
                      <h3>{phone.brand} {phone.name}</h3>
                      <p className="price">${phone.price}</p>
                      <div className="specs">
                        <span>{phone.specs.screen}</span>
                        <span>{phone.specs.camera}</span>
                        <span>{phone.specs.battery}</span>
                      </div>
                      <div className="pros-cons">
                        <div className="pros">
                          <strong>Pros:</strong>
                          <ul>
                            {phone.pros.slice(0, 2).map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="cons">
                          <strong>Cons:</strong>
                          <ul>
                            {phone.cons.slice(0, 2).map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedPhones.length > 0 && (
              <div className="recommendation-actions">
                <p>Selected: {selectedPhones.length} phone(s)</p>
                <button 
                  className="btn btn-primary"
                  onClick={generateRecommendations}
                  disabled={loading}
                >
                  {loading ? 'Generating AI Recommendations...' : 'Get AI Recommendations'}
                </button>
              </div>
            )}
          </section>
        )}

        {/* AI Recommendations */}
        {recommendations && (
          <section className="recommendations-section">
            <h2>🤖 Professional AI Analysis</h2>
            
            <div className="recommendation-summary">
              <h3>🏆 Top Recommendation: {recommendations.data.topRecommendation}</h3>
              <p className="comparison">{recommendations.data.comparison}</p>
            </div>

            <div className="recommendations-grid">
              {recommendations.data.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <h4>{rec.phoneName}</h4>
                  <div className="recommendation-content">
                    <div className="pros">
                      <h5>✅ Key Advantages</h5>
                      <ul>
                        {rec.pros.map((pro, idx) => (
                          <li key={idx}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <h5>⚠️ Considerations</h5>
                      <ul>
                        {rec.cons.map((con, idx) => (
                          <li key={idx}>{con}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="reasoning">
                      <h5>💡 Professional Analysis</h5>
                      <p>{rec.reasoning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="final-recommendation">
              <h3>🎯 Final Recommendation</h3>
              <p>{recommendations.data.finalRecommendation}</p>
            </div>

            <div className="buy-links">
              <h3>🛒 Purchase Options</h3>
              <div className="buy-links-grid">
                {recommendations.phones.map((phone) => (
                  <div key={phone._id} className="buy-links-card">
                    <h4>{phone.brand} {phone.name}</h4>
                    <div className="links">
                      {phone.buyLinks.map((link, index) => (
                        <a 
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="buy-link"
                        >
                          {link.store} - ${link.price}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
