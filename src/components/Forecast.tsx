import ForecastAccordion from "@/components/ForecastAccordion";
import { get7DayForecast } from "@/lib/forecast";
import { formatDate } from "@/utils/formatDate";

/*
  ForecastPage henter en 7-dages vejrprognose og viser den i en accordion-baseret tabel.
  - Jeg bruger server-side data fetching (async) her for at kunne hente data før render.
  - Accordion-komponenterne gør det muligt at folde hver dags time-for-time detaljer ud.
*/

export default async function ForecastPage() {
  // Henter vejret for en fast sat by (her: koordinater for Better Developers)
  const forecast = await get7DayForecast(56.1518, 10.2064);

  return (
    <div className="p-6 min-h-screen bg-cover bg-center">
      {/* Overskrift */}
      <h1 className="text-3xl font-bold text-gray-800 drop-shadow-lg mb-6 text-center">
        7-dages prognose
      </h1>

      {/* Card container med scroll og blur-effekt for bedre læsbarhed */}
      <div
        className="bg-white/30 backdrop-blur-md rounded-xl p-6 max-w-4xl mx-auto shadow-lg
        space-y-4 max-h-[80vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-400/50 scrollbar-track-transparent"
      >
        {/* Kolonneoverskrift */}
        <div className="grid grid-cols-5 font-semibold text-gray-700 drop-shadow-md text-center mb-2">
          <div>Dag</div>
          <div>Vejr</div>
          <div>Temp (min/max)</div>
          <div>Vind</div>
          <div>Regn</div>
        </div>

        {/* Renderer en ForecastAccordion for hver dag */}
        {forecast.map((day) => (
          <ForecastAccordion
            key={day.date}
            day={formatDate(day.date)} // Formaterer dato pænt til visning
            avgMin={day.avgMin}
            avgMax={day.avgMax}
            avgWindSpeed={day.avgWindSpeed}
            avgWindDir={day.avgWindDir}
            hourly={day.hourly.map((h) => ({
              ...h,
              precipitation: h.precipitation ?? 0,
            }))}
            collapsible={true} // Gør accordion foldbar
          />
        ))}
      </div>
    </div>
  );
}
