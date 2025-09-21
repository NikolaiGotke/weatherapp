import { getWeather } from "./openMeteo";
import { mapHourlyToItems } from "@/utils/mapHourly";
import { filterHourlyByDay } from "@/utils/filterHourly";
import { getCache, setCache } from "./cacheWeather";
import type { HourlyItem } from "@/types/weather";

// Henter dagens hourly-data + current weather for valgt by
export async function getTodayHourly(
  lat: number,
  lon: number,
  cityName: string
) {
  // check cache
  const cached = getCache<{ current: HourlyItem; hourlyToday: HourlyItem[] }>(
    cityName
  );
  if (cached) {
    // Konverterer time tilbage til Date, fordi JSON gemmer det som string
    cached.current.time = new Date(cached.current.time);
    cached.hourlyToday = cached.hourlyToday.map((h) => ({
      ...h,
      time: new Date(h.time),
    }));
    return cached;
  }

  const data = await getWeather(lat, lon);

  // Brug live current_weather som current
  let current: HourlyItem;
  if (data.current_weather) {
    current = {
      temp: data.current_weather.temperature,
      windspeed: data.current_weather.windspeed,
      winddir: data.current_weather.winddirection,
      code: data.current_weather.weathercode,
      precipitation: 0, // current_weather giver ikke precipitation
      time: new Date(data.current_weather.time),
    };
  } else {
    // fallback hvis current_weather mangler
    const now = new Date();
    current = {
      temp: 0,
      windspeed: 0,
      winddir: 0,
      code: 0,
      precipitation: 0,
      time: now,
    };
  }

  // Mapper API'ets time-for-time data til HourlyItem
  const allHourly: HourlyItem[] = mapHourlyToItems(data.hourly);

  const now = new Date();

  // Filtrerer kun data for i dag og tager hver 3. time
  const hourlyToday = filterHourlyByDay(allHourly, now, 3);

  const result = { current, hourlyToday };
  setCache(cityName, result);
  return result;
}
