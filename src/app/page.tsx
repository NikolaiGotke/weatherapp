"use client";

import { useCity } from "@/context/CityContext";
import { useState, useEffect } from "react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyRow from "@/components/HourlyRow";
import { getWeather } from "@/lib/openMeteo";
import type { HourlyItem } from "@/types/weather";

export default function HomePage() {
  const { city } = useCity();
  const [hourlyToday, setHourlyToday] = useState<HourlyItem[]>([]);
  const [currentWeather, setCurrentWeather] = useState<HourlyItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getWeather(city.lat, city.lon);
      const now = new Date();

      const idxNow = data.hourly.time.findIndex(
        (t: string) => new Date(t).getTime() >= now.getTime()
      );

      const current: HourlyItem = {
        time: new Date(data.hourly.time[idxNow]),
        temp: data.hourly.temperature_2m[idxNow],
        code: data.hourly.weathercode[idxNow],
        windspeed: data.hourly.windspeed_10m?.[idxNow] ?? 0,
        winddir: data.hourly.winddirection_10m?.[idxNow] ?? 0,
        precipitation: data.hourly.precipitation?.[idxNow] ?? 0,
      };

      const hourlyFiltered: HourlyItem[] = data.hourly.time
        .map((t, i) => ({
          time: new Date(t),
          temp: data.hourly.temperature_2m[i],
          code: data.hourly.weathercode[i],
          windspeed: data.hourly.windspeed_10m?.[i] ?? 0,
          winddir: data.hourly.winddirection_10m?.[i] ?? 0,
          precipitation: data.hourly.precipitation?.[i] ?? 0,
        }))
        .filter(
          (item) =>
            item.time.getDate() === now.getDate() &&
            item.time.getMonth() === now.getMonth() &&
            item.time.getFullYear() === now.getFullYear()
        )
        .filter((_, i) => i % 3 === 0);

      setCurrentWeather(current);
      setHourlyToday(hourlyFiltered);
    }

    fetchData();
  }, [city]);

  const today = new Date();
  const dateString = today.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="p-6 min-h-screen bg-cover bg-center">
      <h1 className="text-3xl font-bold text-gray-900 drop-shadow-lg mb-2 text-center">
        Dagens vejr i {city.name}
      </h1>
      <h2 className="text-xl font-medium text-gray-800 drop-shadow mb-6 text-center">
        {dateString}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Venstre boks: CurrentWeather */}
        {currentWeather && (
          <CurrentWeather
            temp={currentWeather.temp}
            code={currentWeather.code}
            windSpeed={currentWeather.windspeed}
            windDir={currentWeather.winddir}
            precipitation={currentWeather.precipitation}
            cityName={city.name}
          />
        )}

        {/* Højre boks: timer */}
        <div className="md:col-span-2 space-y-2">
          {/* Overlay card */}
          <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4">
            {/* Overskrift for tabellen */}
            <div className="grid grid-cols-5 font-semibold text-gray-700 drop-shadow-md text-center mb-2">
              <div>Dag</div>
              <div>Vejr</div>
              <div>Temp (°C)</div>
              <div>Vind</div>
              <div>Regn</div>
            </div>

            {/* Timer */}
            <div className="space-y-2">
              {hourlyToday.map((hour) => (
                <HourlyRow
                  key={hour.time.toISOString()}
                  time={hour.time}
                  temp={hour.temp}
                  code={hour.code}
                  windSpeed={hour.windspeed}
                  windDir={hour.winddir}
                  precipitation={hour.precipitation}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
