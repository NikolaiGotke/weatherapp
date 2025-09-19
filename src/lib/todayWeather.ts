import { getWeather } from "./openMeteo";
import { mapHourlyToItems } from "@/utils/mapHourly";
import { filterHourlyByDay } from "@/utils/filterHourly";
import type { HourlyItem } from "@/types/weather";

// Henter dagens hourly-data + current weather for valgt by
export async function getTodayHourly(lat: number, lon: number) {
  const data = await getWeather(lat, lon);

  // Mapper API'ets time-for-time data til HourlyItem
  const allHourly: HourlyItem[] = mapHourlyToItems(data.hourly);

  const now = new Date();
  const idxNow = allHourly.findIndex((h) => h.time.getTime() >= now.getTime());
  const current: HourlyItem = allHourly[idxNow];

  // Filtrerer kun data for i dag og tager hver 3. time
  const hourlyToday = filterHourlyByDay(allHourly, now, 3);

  return { current, hourlyToday };
}
