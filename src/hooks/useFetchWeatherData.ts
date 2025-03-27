import React, { useState, useEffect } from "react";
import { getCityCoordinates, getWeatherForecast } from "../services/weatherService";

const useFetchWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [city, setCity] = useState<string>("上海");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWeatherData = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      const coords = await getCityCoordinates(cityName);
      const data = await getWeatherForecast(coords.lat, coords.lon);

      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      setError("获取天气数据失败，请检查城市名称是否正确");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return { weatherData, city, setCity, loading, error };
};

export default useFetchWeatherData;
