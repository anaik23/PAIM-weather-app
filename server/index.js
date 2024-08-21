const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Rate limiter to prevent too many requests in a short time
const limiter = rateLimit({
    max: 5, // Maximum number of requests
    windowMs: 10000, // Time window in milliseconds (10 seconds)
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests, please try again later."
        });
    }
});

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// CORS configuration to allow cross-origin requests
const corsOptions = {
    origin: "*", // Allow all origins
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));


// Route to handle weather data fetching
app.get('/weather', limiter, async (req, res) => {
    const { city } = req.query; // Get the city name from query parameters

    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    try {
        // Fetch coordinates for the given city using OpenWeather API
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=100&appid=${process.env.WEATHER_API_KEY}`);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            return res.status(404).json({ error: "City not found" });
        }

        // Fetch weather and forecast data for each city
        const weatherDataPromises = geoData.map(async (cityData) => {
            const { lat, lon, name, state, country } = cityData;

            // Fetch current weather data
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
            const weatherData = await weatherResponse.json();

            // Fetch 5-day weather forecast
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
            const forecastData = await forecastResponse.json();

            return {
                coord: { lat, lon },
                name,
                state,
                country,
                current: weatherData, // Current weather data
                forecast: forecastData.list   // 5-day forecast data
            };
        });

        // Wait for all weather data promises to resolve
        const weatherData = await Promise.all(weatherDataPromises);

        // Send the collected weather data back to the client
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server on port 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
