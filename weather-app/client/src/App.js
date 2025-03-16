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
    // Form handling logic will be implemented in subsequent steps
    console.log("Searching location:", location);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Get Weather</h1>
        {/* Search form */}
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

        {/* Weather information display */}
        {weather && (
          <div className="weather-info">
            <p>Weather information will be displayed here</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
