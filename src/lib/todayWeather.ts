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

  // Mapper API'ets time-for-time data til HourlyItem
  const allHourly: HourlyItem[] = mapHourlyToItems(data.hourly);

  const now = new Date();
  const idxNow = allHourly.findIndex((h) => h.time.getTime() >= now.getTime());
  const current: HourlyItem = allHourly[idxNow];

  // Filtrerer kun data for i dag og tager hver 3. time
  const hourlyToday = filterHourlyByDay(allHourly, now, 3);

  const result = { current, hourlyToday };
  setCache(cityName, result);
  return result;
}
