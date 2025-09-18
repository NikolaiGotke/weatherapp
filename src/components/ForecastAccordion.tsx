"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowUp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { weatherCodeToIcon } from "@/utils/weatherCodeToIcon";
import PrecipitationIndicator from "./PrecipitationIndicator";

type HourlyItem = {
  time: Date;
  temp: number;
  code: number;
  windspeed: number;
  winddir: number;
  precipitation?: number;
};

type Props = {
  day: string;
  avgMin: number;
  avgMax: number;
  avgWindSpeed: number;
  avgWindDir: number;
  hourly: HourlyItem[];
  collapsible?: boolean;
};

export default function ForecastAccordion({
  day,
  avgMin,
  avgMax,
  avgWindSpeed,
  avgWindDir,
  hourly,
  collapsible = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    setHeight(open ? `${contentRef.current?.scrollHeight}px` : "0px");
  }, [open, hourly]);

  // Total nedbør for dagen
  const totalPrecipitation = hourly.reduce(
    (acc, h) => acc + (h.precipitation ?? 0),
    0
  );

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-md transition-all">
      {/* Dag header */}
      <div
        className={`grid grid-cols-5 items-center gap-4 p-3 ${
          collapsible
            ? "cursor-pointer hover:bg-white/30 transition-colors"
            : ""
        }`}
        onClick={() => collapsible && setOpen(!open)}
      >
        <div className="text-center text-gray-800 drop-shadow-sm">{day}</div>

        <div className="flex justify-center">
          {hourly.length > 0 &&
            (() => {
              const { icon, color } = weatherCodeToIcon(hourly[0].code);
              return (
                <i className={`${icon} ${color} text-3xl drop-shadow-md`}></i>
              );
            })()}
        </div>

        <div className="text-center text-gray-800 font-semibold drop-shadow-sm">
          {Math.round(avgMin)}° / {Math.round(avgMax)}°
        </div>

        <div className="flex items-center justify-center gap-2">
          <FaArrowUp
            className="text-gray-800 drop-shadow-md"
            style={{ transform: `rotate(${avgWindDir}deg)` }}
          />
          <span className="text-gray-800 text-sm drop-shadow-sm">
            {avgWindSpeed.toFixed(1)} m/s
          </span>
        </div>

        {/* Dag-nedbør + chevron */}
        <div className="flex items-center justify-center gap-2">
          <PrecipitationIndicator precipitation={totalPrecipitation} />
          {collapsible && (open ? <FaChevronUp /> : <FaChevronDown />)}
        </div>
      </div>

      {/* Hourly detaljer */}
      {collapsible && (
        <div
          ref={contentRef}
          style={{ maxHeight: height }}
          className="overflow-hidden transition-[max-height] duration-500 ease-in-out scroll-container"
        >
          <div className="space-y-2 p-3 border-t border-gray-300/30">
            {hourly.map((item) => {
              const { icon, color } = weatherCodeToIcon(item.code);

              return (
                <div
                  key={item.time.toISOString()}
                  className="grid grid-cols-5 items-center gap-4 p-2 bg-white/10 rounded-lg"
                >
                  <div className="text-center text-gray-800 text-sm">
                    {item.time.toLocaleTimeString("da-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex justify-center">
                    <i className={`${icon} text-2xl ${color}`}></i>
                  </div>
                  <div className="text-center text-gray-800 font-semibold">
                    {Math.round(item.temp)}°
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <FaArrowUp
                      className="text-gray-800"
                      style={{ transform: `rotate(${item.winddir}deg)` }}
                    />
                    <span className="text-gray-800 text-sm">
                      {item.windspeed.toFixed(1)} m/s
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <PrecipitationIndicator
                      precipitation={item.precipitation ?? 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
