import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendMessage, setBackendMessage] = useState("");

  // Test backend connection
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/test");
        setBackendMessage(response.data.message);
      } catch (err) {
        setError("Unable to connect to backend server");
        console.error("Backend connection error:", err);
      }
    };

    testBackendConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // CALL API
    const response = await axios.get(
      `http://localhost:5000/api/weather?city=${location}`
    );
    setWeather(response.data);

    setLoading(false);
  };

  // dynamic backgrounds
  const getBackgroundColor = () => {
    if (!weather) return "#222";

    const condition = weather.main?.toLowerCase();

    if (condition?.includes("clear")) return "#0077cc";
    if (condition?.includes("cloud")) return "#465367";
    if (condition?.includes("rain")) return "#305a7a";

    return "#222";
  };

  return (
    <div className="App" style={{ backgroundColor: getBackgroundColor() }}>
      <header className="App-header">
        <h1>Get Weather</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <button type="submit">Search</button>
        </form>
        {/* Backend connection message */}
        {backendMessage && <p className="backend-message">{backendMessage}</p>}

        {/* Weather Display */}
        {weather && (
          <div className="weather-info">
            <h2>
              {weather.city}, {weather.country}
            </h2>

            <div className="weather-content">
              {/* left info */}
              <div className="weather-data">
                <div className="temperature">
                  <p className="temp-main">{weather.temperature}°C</p>
                  <p className="temp-feels">
                    Feels like: {weather.feels_like}°C
                  </p>
                </div>
                <p className="description">{weather.description}</p>
                <div className="details">
                  <p>Humidity: {weather.humidity}%</p>
                  <p>Wind: {weather.wind_speed} m/s</p>
                </div>
              </div>

              {/* right icon */}
              <div className="weather-icon-container">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                  alt={weather.description}
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
