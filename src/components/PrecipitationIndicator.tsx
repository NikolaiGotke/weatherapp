"use client";

import { FaTint } from "react-icons/fa";

type Props = {
  precipitation: number;
};

/*
  PrecipitationIndicator viser en lille regn-ikon + værdi.
  - Ikonet farves blåt hvis der er nedbør, ellers gråt og transparent
  - Talformat: 1 decimal
*/

export default function PrecipitationIndicator({ precipitation }: Props) {
  return (
    <div className="flex items-center justify-center gap-1">
      {/* Dråbe-ikon */}
      <FaTint
        className={
          precipitation > 0
            ? "text-blue-500 text-lg"
            : "text-gray-900 text-lg opacity-40"
        }
      />
      {/* Nedbørsmængde */}
      <span className="text-gray-800 text-sm">
        {precipitation.toFixed(1)} mm
      </span>
    </div>
  );
}
