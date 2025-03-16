const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

// set port
const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server 👍" });
});

app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city;
    const API_KEY = "fe58b510d07d6812a15fa151db36ef52";

    // Make API request
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // Send back simplified data
    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feels_like: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      main: response.data.weather[0].main,
      icon: response.data.weather[0].icon,
      wind_speed: response.data.wind.speed,
    });
  } catch (error) {
    //error response
    res.status(500).json({ error: "Error getting weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
