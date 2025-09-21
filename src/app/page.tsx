"use client";

import { useCity } from "@/context/CityContext";
import { useState, useEffect } from "react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyRow from "@/components/HourlyRow";
import type { HourlyItem } from "@/types/weather";
import { getTodayHourly } from "@/lib/todayWeather";
import { formatDate } from "@/utils/formatDate";

export default function HomePage() {
  const { city } = useCity(); // Jeg henter den valgte by fra Context, så hele appen automatisk opdateres ved byskift
  const [hourlyToday, setHourlyToday] = useState<HourlyItem[]>([]);
  const [currentWeather, setCurrentWeather] = useState<HourlyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Jeg bruger getTodayHourly helperen for at centralisere mapping af API-data
    getTodayHourly(city.lat, city.lon, city.name)
      .then(({ current, hourlyToday }) => {
        setCurrentWeather(current); // Jeg gemmer current weather separat, så jeg kan fremhæve det i UI
        setHourlyToday(hourlyToday); // Jeg gemmer time-for-time data for at kunne vise dagens forecast overskueligt
      })
      .catch(() => setError("Kunne ikke hente vejrdata. Prøv igen senere."))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading) return <div className="text-center mt-10">Henter vejr…</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  const today = new Date();
  const dateString = formatDate(today, { weekday: "long", month: "long" }); // Jeg bruger formatDate for at holde datoformateringen ensartet

  return (
    <div className="p-6 min-h-screen bg-cover bg-center">
      <h1 className="text-3xl font-bold text-gray-900 drop-shadow-lg mb-2 text-center">
        Dagens vejr i {city.name}
      </h1>
      <h2 className="text-xl font-medium text-gray-800 drop-shadow mb-6 text-center">
        {dateString}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {currentWeather && (
          <CurrentWeather
            temp={currentWeather.temp}
            code={currentWeather.code}
            windSpeed={currentWeather.windspeed}
            windDir={currentWeather.winddir}
            precipitation={currentWeather.precipitation ?? 0}
            cityName={city.name}
          />
        )}

        <div className="md:col-span-2 space-y-2">
          <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4">
            <div className="grid grid-cols-5 font-semibold text-gray-700 drop-shadow-md text-center mb-2">
              <div>Dag</div>
              <div>Vejr</div>
              <div>Temp (°C)</div>
              <div>Vind</div>
              <div>Regn</div>
            </div>

            <div className="space-y-2">
              {hourlyToday.map((hour) => (
                <HourlyRow
                  key={hour.time.toISOString()}
                  time={hour.time}
                  temp={hour.temp}
                  code={hour.code}
                  windSpeed={hour.windspeed}
                  windDir={hour.winddir}
                  precipitation={hour.precipitation ?? 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
