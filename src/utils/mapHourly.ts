import type { Hourly, HourlyItem } from "@/types/weather";

export function mapHourlyToItems(hourly: Hourly): HourlyItem[] {
  return hourly.time.map((t, i) => ({
    time: new Date(t),
    temp: hourly.temperature_2m[i],
    code: hourly.weathercode[i],
    windspeed: hourly.windspeed_10m?.[i] ?? 0,
    winddir: hourly.winddirection_10m?.[i] ?? 0,
    precipitation: hourly.precipitation?.[i] ?? 0,
  }));
}
