export interface SearchCityResponse {
  results: SearchCityData[];
  generationtime_ms: number;
}

export interface SearchCityData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
}

export interface WeatherData {
  date: string;
  dayOfWeek: string;
  tempMax: number;
  tempMin: number;
  weatherIcon: string;
  weatherDesc: string;
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

// const SearchCityDataDemo = {
//   results: [
//     {
//       id: 7072498,
//       name: "上海",
//       latitude: 29.32955,
//       longitude: 121.05804,
//       elevation: 321.0,
//       feature_code: "PPL",
//       country_code: "CN",
//       admin1_id: 1784764,
//       admin2_id: 1795854,
//       timezone: "Asia/Shanghai",
//       country_id: 1814991,
//       country: "中国",
//       admin1: "浙江",
//       admin2: "绍兴",
//     },
//   ],
//   generationtime_ms: 0.21195412,
// };

// const WeatherResponseDemo = {
//   latitude: 29.375,
//   longitude: 121.0,
//   generationtime_ms: 0.03254413604736328,
//   utc_offset_seconds: 28800,
//   timezone: "Asia/Shanghai",
//   timezone_abbreviation: "GMT+8",
//   elevation: 232.0,
//   daily_units: {
//     time: "iso8601",
//     weathercode: "wmo code",
//     temperature_2m_max: "°C",
//     temperature_2m_min: "°C",
//   },
//   daily: {
//     time: ["2025-03-27", "2025-03-28", "2025-03-29", "2025-03-30", "2025-03-31", "2025-04-01", "2025-04-02"],
//     weathercode: [80, 80, 61, 3, 80, 3, 3],
//     temperature_2m_max: [29.0, 11.9, 9.3, 9.2, 8.3, 15.2, 18.2],
//     temperature_2m_min: [12.3, 6.4, 6.1, 6.6, 5.9, 6.6, 5.2],
//   },
// };
