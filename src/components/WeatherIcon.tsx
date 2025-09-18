"use client";
import React from "react";

type Props = {
  icon: string;
  color: string;
  size?: string;
};

export default function WeatherIcon({ icon, color, size = "text-3xl" }: Props) {
  return <i className={`${icon} ${color} ${size} drop-shadow-md`}></i>;
}
