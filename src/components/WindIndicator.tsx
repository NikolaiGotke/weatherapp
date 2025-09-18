"use client";
import { FaArrowUp } from "react-icons/fa";

type Props = {
  speed: number;
  direction: number;
  size?: string;
};

export default function WindIndicator({
  speed,
  direction,
  size = "text-gray-800",
}: Props) {
  return (
    <div className="flex items-center justify-center gap-1">
      <FaArrowUp
        className={size}
        style={{ transform: `rotate(${direction}deg)` }}
      />
      <span className="text-sm">{speed.toFixed(1)} m/s</span>
    </div>
  );
}
