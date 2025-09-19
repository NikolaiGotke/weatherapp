"use client";

import { FaArrowUp } from "react-icons/fa";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import PrecipitationIndicator from "./PrecipitationIndicator";

type Props = {
  temp: number;
  code: number;
  windSpeed: number;
  windDir: number;
  precipitation: number;
  cityName?: string;
  time?: Date;
};

export default function CurrentWeather({
  temp,
  code,
  windSpeed,
  windDir,
  precipitation,
  cityName,
  time,
}: Props) {
  const { icon, color } = weatherCodeToIcon(code);

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
      {/* By */}
      <div className="text-2xl text-center text-gray-800 font-semibold mb-3 bg-center">
        {cityName && <span> {cityName}</span>}
      </div>

      <h2 className="text-1 font-semibold text-gray-800 mb-4">
        Vejret lige nu
      </h2>

      {/* Tidspunkt */}
      {time && (
        <div className="text-xs text-gray-500 mb-2">
          {time.toLocaleTimeString("da-DK", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}

      {/* Vejrikon */}
      <i className={`${icon} text-6xl ${color} drop-shadow-md mb-4`}></i>

      {/* Temperatur */}
      <div className="text-gray-800 text-3xl font-bold mb-2">
        {Math.round(temp)}°C
      </div>

      {/* Vind */}
      <div className="flex items-center justify-center gap-2 text-gray-800 mb-2">
        <FaArrowUp
          className="drop-shadow-md"
          style={{ transform: `rotate(${windDir}deg)` }}
        />
        <span className="text-sm">{windSpeed.toFixed(1)} m/s</span>
      </div>

      {/* Regn */}
      <div className="flex items-center justify-center gap-1">
        <PrecipitationIndicator precipitation={precipitation} />
      </div>
    </div>
  );
}
