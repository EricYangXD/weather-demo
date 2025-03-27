import React from "react";
import { WeatherData } from "../types";

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="weather-date">{weather.date}</div>
      <div className="weather-day">{weather.dayOfWeek}</div>
      <div className="weather-icon" style={{ fontSize: "2rem" }}>
        {weather.weatherIcon}
      </div>
      <div className="weather-temp">
        <span>
          {weather.tempMin}°C ~ {weather.tempMax}°C
        </span>
      </div>
      <div className="weather-desc">{weather.weatherDesc}</div>
    </div>
  );
};

export default WeatherCard;
