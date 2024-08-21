import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import "./App.css";

function App() {
  // State to hold the current weather data
  const [currentWeather, setCurrentWeather] = useState(null);

  // State to hold the forecast data
  const [forecast, setForecast] = useState(null);

  // Set the document title
  document.title = "PAIM Weather App";

  // Function to handle search changes
  const handleOnSearchChange = (searchData) => {
    // Get the city name from the selected search data
    const city = searchData.label;

    // Fetch weather data from the backend server using the city name
    fetch(`/weather?city=${encodeURIComponent(city)}`)
      .then(async (response) => {
        // Parse the JSON response
        const weatherData = await response.json();

        // Assuming the backend returns an array of possible city matches, we select the first one
        const weather = weatherData[0];

        // Update state with the data from the backend
        setCurrentWeather({ city: weather.name, ...weather.current });
        setForecast({ city: weather.name, list: weather.forecast });
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <div className="container">
      {/* Header of the app */}
      <h1 align="center">
        <font color="white">Welcome to the PAIM Weather App</font>
      </h1>

      {/* Search component with a callback for handling search changes */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Conditionally render the CurrentWeather component if currentWeather is not null */}
      {currentWeather && <CurrentWeather data={currentWeather} />}

      {/* Conditionally render the Forecast component if forecast is not null */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
