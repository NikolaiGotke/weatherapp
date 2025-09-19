import type { OpenMeteoResponse } from "@/types/weather";

// Funktion til at hente vejrdata fra Open-Meteo API
export async function getWeather(
  lat: number,
  lon: number
): Promise<OpenMeteoResponse> {
  const base = "https://api.open-meteo.com/v1/forecast";

  // URLSearchParams bruges til at bygge querystring på en sikker måde
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current_weather: "true",
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode,windspeed_10m_max,windspeed_10m_min,winddirection_10m_dominant",
    hourly:
      "temperature_2m,weathercode,precipitation,windspeed_10m,winddirection_10m",
    timezone: "Europe/Copenhagen",
    forecast_days: "7",
    windspeed_unit: "ms",
  });

  const res = await fetch(`${base}?${params.toString()}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok)
    throw new Error(`OpenMeteo fetch failed: ${res.status} ${res.statusText}`);

  return res.json();
}
