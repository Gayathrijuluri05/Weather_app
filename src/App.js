import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to get coordinates from city name
  const getCoordinates = async (cityName) => {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return {
          latitude: data.results[0].latitude,
          longitude: data.results[0].longitude,
          name: data.results[0].name,
          country: data.results[0].country
        };
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      throw new Error('Failed to find city');
    }
  };

  // Function to get weather data
  const getWeatherData = async (lat, lon) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max&timezone=auto&forecast_days=7`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  };

  // Weather code to description mapping
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
  };

  // Weather code to emoji mapping
  const getWeatherEmoji = (code) => {
    const weatherEmojis = {
      0: '☀️',
      1: '🌤️',
      2: '⛅',
      3: '☁️',
      45: '🌫️',
      48: '🌫️',
      51: '🌦️',
      53: '🌦️',
      55: '🌧️',
      61: '🌧️',
      63: '🌧️',
      65: '⛈️',
      71: '🌨️',
      73: '❄️',
      75: '❄️',
      95: '⛈️',
      96: '⛈️',
      99: '⛈️'
    };
    return weatherEmojis[code] || '🌡️';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      // Get coordinates for the city
      const coordinates = await getCoordinates(city);
      
      // Get weather data
      const weather = await getWeatherData(coordinates.latitude, coordinates.longitude);
      
      setWeatherData({
        ...weather,
        cityName: coordinates.name,
        country: coordinates.country
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Weather Now</h1>
        <p>Get 7-day weather forecast for any city</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="form-group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="city-input"
            />
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <p>🔍 Searching for weather data...</p>
          </div>
        )}

        {weatherData && (
          <div className="weather-results">
            <div className="city-info">
              <h2>📍 {weatherData.cityName}, {weatherData.country}</h2>
              <p>7-Day Weather Forecast</p>
            </div>

            <div className="weather-grid">
              {weatherData.daily.time.map((date, index) => (
                <div key={index} className="weather-card">
                  <div className="date">
                    <h3>{index === 0 ? 'Today' : formatDate(date).split(',')[0]}</h3>
                    <p>{formatDate(date).split(',').slice(1).join(',')}</p>
                  </div>
                  
                  <div className="weather-icon">
                    {getWeatherEmoji(weatherData.daily.weathercode[index])}
                  </div>
                  
                  <div className="weather-info">
                    <div className="temperature">
                      <span className="temp-max">{Math.round(weatherData.daily.temperature_2m_max[index])}°C</span>
                      <span className="temp-min">{Math.round(weatherData.daily.temperature_2m_min[index])}°C</span>
                    </div>
                    
                    <div className="weather-desc">
                      {getWeatherDescription(weatherData.daily.weathercode[index])}
                    </div>
                    
                    <div className="additional-info">
                      <div className="info-item">
                        <span>🌧️ {weatherData.daily.precipitation_sum[index]}mm</span>
                      </div>
                      <div className="info-item">
                        <span>💨 {Math.round(weatherData.daily.windspeed_10m_max[index])} km/h</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;