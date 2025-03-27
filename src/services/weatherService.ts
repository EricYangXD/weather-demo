import { SearchCityResponse, WeatherData, WeatherResponse } from "../types";

const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: "晴朗", icon: "☀️" },
  1: { description: "大部晴朗", icon: "🌤️" },
  2: { description: "部分多云", icon: "⛅" },
  3: { description: "多云", icon: "☁️" },
  45: { description: "雾", icon: "🌫️" },
  48: { description: "雾凇", icon: "🌫️" },
  51: { description: "小毛毛雨", icon: "🌦️" },
  53: { description: "毛毛雨", icon: "🌦️" },
  55: { description: "大毛毛雨", icon: "🌧️" },
  56: { description: "冻毛毛雨", icon: "🌨️" },
  57: { description: "强冻毛毛雨", icon: "🌨️" },
  61: { description: "小雨", icon: "🌦️" },
  63: { description: "中雨", icon: "🌧️" },
  65: { description: "大雨", icon: "🌧️" },
  66: { description: "冻雨", icon: "🌨️" },
  67: { description: "强冻雨", icon: "🌨️" },
  71: { description: "小雪", icon: "🌨️" },
  73: { description: "中雪", icon: "🌨️" },
  75: { description: "大雪", icon: "❄️" },
  77: { description: "雪粒", icon: "❄️" },
  80: { description: "小阵雨", icon: "🌦️" },
  81: { description: "中阵雨", icon: "🌧️" },
  82: { description: "大阵雨", icon: "🌧️" },
  85: { description: "小阵雪", icon: "🌨️" },
  86: { description: "大阵雪", icon: "❄️" },
  95: { description: "雷暴", icon: "⛈️" },
  96: { description: "雷暴伴有小冰雹", icon: "⛈️" },
  99: { description: "雷暴伴有大冰雹", icon: "⛈️" },
};

const getDayOfWeek = (dateString: string): string => {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const date = new Date(dateString);
  return weekdays[date.getDay()];
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

// 获取城市经纬度接口
export const getCityCoordinates = async (city: string): Promise<{ lat: number; lon: number }> => {
  try {
    const response: SearchCityResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh`
    ).then((res) => res.json());

    const { results } = response;

    if (results?.length > 0) {
      // 返回第一个结果的经纬度
      const { latitude, longitude } = results[0];
      return { lat: latitude, lon: longitude };
    }
    throw new Error("城市未找到");
  } catch (error) {
    console.error("获取城市坐标失败:", error);
    throw error;
  }
};

// 获取天气数据接口
export const getWeatherForecast = async (lat: number, lon: number): Promise<WeatherData[]> => {
  try {
    const response: WeatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
    ).then((res) => res.json());

    const { daily } = response;
    // 组装每日天气数据
    return daily.time.map((date, index) => {
      const weatherCode = daily.weathercode[index];
      const weather = weatherCodeMap[weatherCode] || { description: "未知", icon: "❓" };

      return {
        date: formatDate(date),
        dayOfWeek: getDayOfWeek(date),
        tempMax: Math.round(daily.temperature_2m_max[index]),
        tempMin: Math.round(daily.temperature_2m_min[index]),
        weatherIcon: weather.icon,
        weatherDesc: weather.description,
      };
    });
  } catch (error) {
    console.error("获取天气数据失败:", error);
    throw error;
  }
};

export function getWeatherCode(code: number | null): string {
  if (code == null) {
    return "-";
  }
  switch (code) {
    case 0:
      return "fair";
    case 1:
      return "mainly clear";
    case 2:
      return "partly cloudy";
    case 3:
      return "overcast";
    case 45:
      return "fog";
    case 48:
      return "depositing rime fog";
    case 51:
      return "light drizzle";
    case 53:
      return "moderate drizzle";
    case 55:
      return "dense drizzle";
    case 56:
      return "light freezing drizzle";
    case 57:
      return "dense freezing drizzle";
    case 61:
      return "slight rain";
    case 63:
      return "moderate rain";
    case 65:
      return "heavy rain";
    case 66:
      return "light freezing rain";
    case 67:
      return "heavy freezing rain";
    case 71:
      return "slight snow fall";
    case 73:
      return "moderate snow fall";
    case 75:
      return "heavy snow fall";
    case 77:
      return "snow grains";
    case 80:
      return "slight rain showers";
    case 81:
      return "moderate rain showers";
    case 82:
      return "heavy rain showers";
    case 85:
      return "slight snow showers";
    case 86:
      return "heavy snow showers";
    case 95:
      return "slight to moderate thunderstorm";
    case 96:
      return "thunderstorm with slight hail";
    case 99:
      return "thunderstorm with heavy hail";
  }
  return "unknown code";
}
