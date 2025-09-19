import type { HourlyItem } from "@/types/weather";

// Filtrerer hourly-data til en specifik dag og evt. hvert n-te element
export function filterHourlyByDay(
  hourly: HourlyItem[],
  date: Date,
  step: number = 1
) {
  return hourly
    .filter(
      (h) =>
        h.time.getDate() === date.getDate() &&
        h.time.getMonth() === date.getMonth() &&
        h.time.getFullYear() === date.getFullYear()
    )
    .filter((_, i) => i % step === 0);
}
