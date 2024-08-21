import React, { useState, useEffect } from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
    const [unit, setUnit] = useState("C"); // State to track the current unit (Celsius or Fahrenheit)
    const [localDateTime, setLocalDateTime] = useState(""); // State to store the local date and time

    // Function to convert Celsius to Fahrenheit
    const toFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

    // Toggle between Celsius and Fahrenheit
    const toggleUnit = () => {
        setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
    };

    // Determine the displayed temperature based on the unit
    const temperature = unit === "C"
        ? Math.round(data.main.temp)
        : Math.round(toFahrenheit(data.main.temp));

    // Function to calculate and set the local date and time based on the city's timezone
    useEffect(() => {
        const calculateLocalDateTime = () => {
            const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
            const cityTime = new Date(utcTime + data.timezone * 1000);
            setLocalDateTime(cityTime.toLocaleString([], {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        };

        calculateLocalDateTime();
        const interval = setInterval(calculateLocalDateTime, 60000); // Update the time every minute

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [data.timezone]);

    //Structure of the output on frontend.
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.name}</p>
                    <p className="local-date-time">Local Date & Time: {localDateTime}</p> {/* Display the local date and time */}
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={`icons/${data.weather[0].icon}.png`}
                />
            </div>
            <div className="bottom">
                <div className="temperature-container">
                    <p className="temperature">{temperature}°{unit}</p>
                    <div className="toggle-container">
                        <div className={`toggle-button ${unit}`} onClick={toggleUnit}>
                            <div className="toggle-option C">C</div>
                            <div className="toggle-option F">F</div>
                            <div className="toggle-indicator"></div>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">{data.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Sunrise</span>
                        <span className="parameter-value">{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Sunset</span>
                        <span className="parameter-value">{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
