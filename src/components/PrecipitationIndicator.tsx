"use client";

import { FaTint } from "react-icons/fa";

type Props = {
  precipitation: number;
};

export default function PrecipitationIndicator({ precipitation }: Props) {
  return (
    <div className="flex items-center justify-center gap-1">
      <FaTint
        className={
          precipitation > 0
            ? "text-blue-500 text-lg"
            : "text-gray-900 text-lg opacity-40"
        }
      />
      <span className="text-gray-800 text-sm">
        {precipitation.toFixed(1)} mm
      </span>
    </div>
  );
}
