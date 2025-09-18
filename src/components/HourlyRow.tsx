"use client";

import { FaArrowUp } from "react-icons/fa";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import PrecipitationIndicator from "./PrecipitationIndicator";

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
  const { icon, color } = weatherCodeToIcon(code);

  return (
    <div className="grid grid-cols-5 items-center gap-4 p-3 bg-white/40 rounded-lg shadow-md">
      <div className="text-center text-gray-800 text-sm">
        {time.toLocaleTimeString("da-DK", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div className="flex justify-center">
        <i className={`${icon} text-2xl ${color}`}></i>
      </div>

      <div className="text-center text-gray-800 font-semibold">
        {Math.round(temp)}°C
      </div>

      <div className="flex items-center justify-center gap-2">
        <FaArrowUp
          className="text-gray-800"
          style={{ transform: `rotate(${windDir}deg)` }}
        />
        <span className="text-gray-800 text-sm">
          {windSpeed.toFixed(1)} m/s
        </span>
      </div>

      <div className="flex items-center justify-center gap-1">
        <PrecipitationIndicator precipitation={precipitation} />
      </div>
    </div>
  );
}
