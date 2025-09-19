// Repræsenterer nuværende vejr fra API
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

// Daglige opsummeringer fra API
export interface Daily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  weathercode: number[];
  windspeed_10m_max?: number[];
  windspeed_10m_min?: number[];
  winddirection_10m_dominant?: number[];
}

// Time-for-time data fra API
export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  precipitation: number[];
  windspeed_10m?: number[];
  winddirection_10m?: number[];
}

// Samlet respons fra Open-Meteo API
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather?: CurrentWeather | null;
  daily: Daily;
  hourly: Hourly;
}

// Egen interne type for håndtering af time-for-time data i UI
export type HourlyItem = {
  time: Date;
  temp: number;
  code: number;
  windspeed: number;
  winddir: number;
  precipitation?: number;
};

// Egen interne type for daglige prognoser, brugt i 7-dages oversigt
export type DailyForecast = {
  date: string;
  avgMin: number;
  avgMax: number;
  avgWindSpeed: number;
  avgWindDir: number;
  hourly: HourlyItem[];
};
