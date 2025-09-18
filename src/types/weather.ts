export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

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

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  weathercode: number[];
  precipitation: number[];
  windspeed_10m?: number[];
  winddirection_10m?: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather?: CurrentWeather | null;
  daily: Daily;
  hourly: Hourly;
}

// -------------------------------------------------
// Typer til lokal behandling af forecast data
// -------------------------------------------------

// Én time i forecast
export type HourlyItem = {
  time: Date;
  temp: number;
  code: number;
  windspeed: number;
  winddir: number;
  precipitation: number;
};

// Én dags forecast inkl. hourly data
export type DailyForecast = {
  date: string;
  avgMin: number;
  avgMax: number;
  avgWindSpeed: number;
  avgWindDir: number;
  hourly: HourlyItem[];
};
