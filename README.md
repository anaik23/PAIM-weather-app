# PAIM Weather App

## Overview

The **PAIM Weather App** is a simple and intuitive web application that allows users to check the current weather and the 5-day weather forecast for any city. The app provides real-time information such as temperature, weather conditions, wind speed, humidity, sunrise, and sunset times.

## Features

- **City Search:** Users can enter the name of any city to view the current weather and 5-day forecast.
- **Current Weather:** Displays the current temperature, weather condition, wind speed, humidity, sunrise, and sunset times.
- **5-Day Forecast:** Provides a summary of weather conditions for the next 5 days.
- **Temperature Units:** Users can switch between Celsius (°C) and Fahrenheit (°F).

## User Interface

### Main Screen

- **Location:** A search bar at the top where users can type in the name of a city.
- **Current Weather Widget:**
  - Displays the local date and time.
  - Shows the current weather condition with an icon.
  - Current temperature.
  - Wind speed, humidity percentage, sunrise, and sunset times.
- **5-Day Weather Forecast:**
  - A list showing the weather condition for each of the next 5 days, including temperature highs and lows in (°C).

## Usage

1. **Enter a City Name:**

2. **View Current Weather:**

3. **Check 5-Day Forecast:**

4. **Switch Temperature Units:**

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/paim-weather-app.git
    ```
2. Start the application:
    ```sh
    npm start
    ```
3. Application should start locally. REMEMBER: To run locally please ensure to create an .env file and add API KEY from OpenWeather - https://openweathermap.org. Once you get the API KEY create an .env in the server folder.
   
   The .env should look like the following
   ```sh
    WEATHER_API_KEY="ENTER API KEY"
    ```
   The app is also accessible and hosted on Heroku at https://paim-weather-app-9c0909d1d31c.herokuapp.com/

## Technologies Used

- **HTML/CSS/JavaScript:** Core technologies for the front-end interface.
- **Weather API:** Integrated with a OpenWeather API to fetch real-time weather data.
