import React from "react";
import {
    Accordion,
    AccordionItem,
} from "react-accessible-accordion";
import "./forecast.css";

// Array of week day names
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    // Getting the current day index (0 for Sunday, 1 for Monday, etc.)
    const dayInAWeek = new Date().getDay();
    // Creating an array of the next 5 days for the forecast
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    //structure of output in the frontend
    return (
        <>
            <label className="title">Next 5 Day Weather Forecast</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 5).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <div className="accordion-item">
                            <div className="daily-item">
                                {/* Weather icon */}
                                <img
                                    src={`icons/${item.weather[0].icon}.png`}
                                    className="icon-small"
                                    alt="weather"
                                />
                                {/* Day of the week */}
                                <label className="day">{forecastDays[idx]}</label>
                                {/* Weather description */}
                                <label className="description">{item.weather[0].description}</label>
                                {/* Max and min temperature */}
                                <label className="min-max">
                                    {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                                </label>
                            </div>
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;
