import { getWeather as fetchWeather } from "./openMeteo";
import type { DailyForecast, HourlyItem } from "@/types/weather";
import { mapHourlyToItems } from "@/utils/mapHourly";
import { filterHourlyByDay } from "@/utils/filterHourly";

// Funktion til at hente 7-dages prognose baseret på lat/lon
export async function get7DayForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  const weatherData = await fetchWeather(lat, lon);
  const daily = weatherData.daily;

  // Mapper alle time-for-time data til HourlyItem-objekter via central helper
  const hourlyData: HourlyItem[] = mapHourlyToItems(weatherData.hourly);

  // Mapper hver dag i daily.time til en DailyForecast
  return daily.time.map((dateStr) => {
    const dayDate = new Date(dateStr);

    // Filtrerer time-for-time data til den aktuelle dag og tager kun hver 3. time
    const hourlyForDay = filterHourlyByDay(hourlyData, dayDate, 3);

    // Beregner min/max og gennemsnit for temperatur og vind
    const temps = hourlyForDay.map((h) => h.temp);
    const winds = hourlyForDay.map((h) => h.windspeed);

    const avgMin = Math.min(...temps);
    const avgMax = Math.max(...temps);
    const avgWindSpeed = winds.length
      ? winds.reduce((a, b) => a + b, 0) / winds.length
      : 0;
    const avgWindDir = hourlyForDay.length
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
