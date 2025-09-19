"use client";

import { FaArrowUp } from "react-icons/fa";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import PrecipitationIndicator from "./PrecipitationIndicator";

/*
  HourlyRow viser en enkelt times vejrdata i en række.
  - Jeg bruger en grid-layout for at sikre, at alle kolonner (tid, vejr, temp, vind, regn) er pænt justeret.
  - Denne komponent gør time-for-time visningen på forsiden overskuelig.
*/

type Props = {
  time: Date;
  temp: number;
  code: number;
  windSpeed: number;
  windDir: number;
  precipitation: number;
};

export default function HourlyRow({
  time,
  temp,
  code,
  windSpeed,
  windDir,
  precipitation,
}: Props) {
  // Konverterer vejrkode til ikon og farve for visuelt overblik
  const { icon, color } = weatherCodeToIcon(code);

  return (
    <div className="grid grid-cols-5 items-center gap-4 p-3 bg-white/40 rounded-lg shadow-md">
      {/* Tidspunkt */}
      <div className="text-center text-gray-800 text-sm">
        {time.toLocaleTimeString("da-DK", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {/* Vejrikon */}
      <div className="flex justify-center">
        <i className={`${icon} text-2xl ${color}`}></i>
      </div>

      {/* Temperatur */}
      <div className="text-center text-gray-800 font-semibold">
        {Math.round(temp)}°C
      </div>

      {/* Vind: pil roteres med vindretning */}
      <div className="flex items-center justify-center gap-2">
        <FaArrowUp
          className="text-gray-800"
          style={{ transform: `rotate(${windDir}deg)` }}
        />
        <span className="text-gray-800 text-sm">
          {windSpeed.toFixed(1)} m/s
        </span>
      </div>

      {/* Nedbør */}
      <div className="flex items-center justify-center gap-1">
        <PrecipitationIndicator precipitation={precipitation} />
      </div>
    </div>
  );
}
