import React, { useState, useEffect } from "react";
import "./App.css";
import { WeatherData } from "./types";
import { getCityCoordinates, getWeatherForecast } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import useFetchWeatherData from "./hooks/useFetchWeatherData";

const App: React.FC = () => {
  const { weatherData, city, setCity, loading } = useFetchWeatherData();
  const [inputCity, setInputCity] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setInputCity("");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>{city}未来七天天气预报</h1>
      </header>

      <form className="city-input" onSubmit={handleSubmit}>
        <input type="text" value={inputCity} onChange={handleCityChange} placeholder="输入城市名称" />
        <button type="submit">查询</button>
      </form>

      {loading && <div className="loading">加载中...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <div className="weather-container">
          {weatherData.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </div>
      )}

      <footer className="footer">
        <p>© 2025 天气预报</p>
        <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
      </footer>
    </div>
  );
};

export default App;
