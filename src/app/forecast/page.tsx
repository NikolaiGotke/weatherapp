"use client";

import { useEffect, useState } from "react";
import { useCity } from "@/context/CityContext";
import ForecastAccordion from "@/components/ForecastAccordion";
import { formatDate } from "@/utils/formatDate";
import { get7DayForecast } from "@/lib/forecast";
import type { DailyForecast } from "@/types/weather";

export default function ForecastPage() {
  const { city } = useCity();
  const [forecast, setForecast] = useState<DailyForecast[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await get7DayForecast(city.lat, city.lon);
      setForecast(data);
    }
    fetchData();
  }, [city]);

  return (
    <div className="p-6 min-h-screen bg-cover bg-center">
      <h1 className="text-3xl font-bold text-gray-800 drop-shadow-lg mb-6 text-center">
        7-dages prognose for {city.name}
      </h1>

      <div
        className="bg-white/30 backdrop-blur-md rounded-xl p-6 max-w-4xl mx-auto shadow-lg
        space-y-4 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent"
      >
        {/* Overskrift */}
        <div className="grid grid-cols-5 font-semibold text-gray-700 drop-shadow-md text-center mb-2">
          <div>Dag</div>
          <div>Vejr</div>
          <div>Temp (min/max)</div>
          <div>Vind</div>
          <div>Regn</div>
        </div>

        {/* Dage */}
        {forecast.map((day) => (
          <ForecastAccordion
            key={day.date}
            day={formatDate(day.date)}
            avgMin={day.avgMin}
            avgMax={day.avgMax}
            avgWindSpeed={day.avgWindSpeed}
            avgWindDir={day.avgWindDir}
            hourly={day.hourly}
            collapsible={true}
          />
        ))}
      </div>
    </div>
  );
}
