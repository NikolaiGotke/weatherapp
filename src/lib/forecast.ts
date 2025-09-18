import { getWeather as fetchWeather } from "./openMeteo";

// Typing for hourly items
export type HourlyItem = {
  precipitation: number;
  time: Date;
  temp: number;
  code: number;
  windspeed: number;
  winddir: number;
};

// Typing for daily forecast with hourly
export type DailyForecast = {
  date: string;
  avgMin: number;
  avgMax: number;
  avgWindSpeed: number;
  avgWindDir: number;
  hourly: HourlyItem[];
};

// Funktion der henter og strukturerer forecast for en specifik by
export async function get7DayForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  const weatherData = await fetchWeather(lat, lon);
  const daily = weatherData.daily;

  // Lav hourly items
  const hourlyData: HourlyItem[] = weatherData.hourly.time.map((t, i) => ({
    time: new Date(t),
    temp: weatherData.hourly.temperature_2m[i],
    code: weatherData.hourly.weathercode[i],
    windspeed: weatherData.hourly.windspeed_10m?.[i] ?? 0,
    winddir: weatherData.hourly.winddirection_10m?.[i] ?? 0,
    precipitation: weatherData.hourly.precipitation?.[i] ?? 0,
  }));

  // Split hourly pr dag og lav gennemsnit
  return daily.time.map((dateStr) => {
    const hourlyForDay = hourlyData
      .filter(
        (h) =>
          h.time.getDate() === new Date(dateStr).getDate() &&
          h.time.getMonth() === new Date(dateStr).getMonth() &&
          h.time.getFullYear() === new Date(dateStr).getFullYear()
      )
      .filter((_, idx) => idx % 3 === 0); // hver 3. time

    const temps = hourlyForDay.map((h) => h.temp);
    const winds = hourlyForDay.map((h) => h.windspeed);

    const avgMin = Math.min(...temps);
    const avgMax = Math.max(...temps);
    const avgWindSpeed = winds.length
      ? winds.reduce((a, b) => a + b, 0) / winds.length
      : 0;

    const avgWindDir =
      hourlyForDay.length > 0
        ? hourlyForDay.reduce((sum, h) => sum + h.winddir, 0) /
          hourlyForDay.length
        : 0;

    return {
      date: dateStr,
      avgMin,
      avgMax,
      avgWindSpeed,
      avgWindDir,
      hourly: hourlyForDay,
    };
  });
}
