"use client";

import { useCity } from "@/context/CityContext";
import { useState, useEffect } from "react";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyRow from "@/components/HourlyRow";
import { getWeather } from "@/lib/openMeteo";
import type { HourlyItem } from "@/types/weather";

// Håndterer den valgte by og vejrdata for forsiden:
// - trækker den aktuelle by fra CityContext
// - holder dagens time-for-time data og nuværende vejr i state
// - samt simple loading og error states til UI
export default function HomePage() {
  const { city } = useCity();
  const [hourlyToday, setHourlyToday] = useState<HourlyItem[]>([]);
  const [currentWeather, setCurrentWeather] = useState<HourlyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hver gang jeg søger på en ny by, så henter jeg nye data for de koordinater
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // Her henter jeg data fra min lib-funktion openMeteo
        const data = await getWeather(city.lat, city.lon);
        const now = new Date();

        // Her finder jeg index i time-arrayet der er nærmest lige nu
        const idxNow = data.hourly.time.findIndex(
          (t: string) => new Date(t).getTime() >= now.getTime()
        );

        // Her bygger jeg et HourlyItem objekt til CurrentWeather ud fra nuværende tidspunkt
        const current: HourlyItem = {
          time: new Date(data.hourly.time[idxNow]),
          temp: data.hourly.temperature_2m[idxNow],
          code: data.hourly.weathercode[idxNow],
          windspeed: data.hourly.windspeed_10m?.[idxNow] ?? 0,
          winddir: data.hourly.winddirection_10m?.[idxNow] ?? 0,
          precipitation: data.hourly.precipitation?.[idxNow] ?? 0,
        };

        // Her mapper jeg hele døgnet til HourlyItem og filtrerer kun dem for i dag
        // (og kun hver 3. time – så tabellen ikke bliver alt for lang)
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
      } catch (err) {
        console.error(err);
        // viser en fejlbesked hvis API fejler
        setError("Kunne ikke hente vejrdata. Prøv igen senere.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [city]);

  // loading og error views
  if (loading) return <div className="text-center mt-10">Henter vejr…</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  // formatterer dagens dato til overskriften
  const today = new Date();
  const dateString = today.toLocaleDateString("da-DK", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="p-6 min-h-screen bg-cover bg-center">
      {/* overskrift og dato */}
      <h1 className="text-3xl font-bold text-gray-900 drop-shadow-lg mb-2 text-center">
        Dagens vejr i {city.name}
      </h1>
      <h2 className="text-xl font-medium text-gray-800 drop-shadow mb-6 text-center">
        {dateString}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* venstre boks: CurrentWeather med dagens værdier */}
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

        {/* højre boks: time-for-time tabel */}
        <div className="md:col-span-2 space-y-2">
          {/* overlay card med baggrund */}
          <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4">
            {/* overskrift for kolonnerne */}
            <div className="grid grid-cols-5 font-semibold text-gray-700 drop-shadow-md text-center mb-2">
              <div>Dag</div>
              <div>Vejr</div>
              <div>Temp (°C)</div>
              <div>Vind</div>
              <div>Regn</div>
            </div>

            {/* her renderer jeg HourlyRow for hver timeblok */}
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
