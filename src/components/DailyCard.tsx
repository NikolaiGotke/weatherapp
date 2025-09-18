"use client";

import { weatherCodeToIcon as WeatherIconFunc } from "@/utils/weatherCodeToIcon";

type Props = {
  date: string;
  min: number;
  max: number;
  code: number;
  weatherCodeToIcon: typeof WeatherIconFunc;
};

export default function DailyCard({
  date,
  min,
  max,
  code,
  weatherCodeToIcon,
}: Props) {
  const { icon, color } = weatherCodeToIcon(code);

  const dt = new Date(date + "T00:00:00");
  const formattedDate = dt.toLocaleDateString("da-DK", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="rounded-lg shadow backdrop-blur-md bg-white/10 p-2">
      <div className="bg-white p-4 rounded-lg text-center">
        <div className="text-xs text-gray-500">{formattedDate}</div>
        <i className={`${icon} ${color} text-4xl my-2`}></i>
        <div className="text-sm text-gray-800">
          {Math.round(min)}° / {Math.round(max)}°
        </div>
      </div>
    </div>
  );
}
