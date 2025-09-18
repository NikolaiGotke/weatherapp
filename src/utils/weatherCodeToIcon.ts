export function weatherCodeToIcon(code: number): {
  icon: string;
  color: string;
} {
  let icon = "wi wi-na";
  let color = "text-gray-600";

  // Ikoner
  if (code === 0) icon = "wi wi-day-sunny";
  else if (code === 1 || code === 2) icon = "wi wi-day-cloudy";
  else if (code === 3) icon = "wi wi-cloudy";
  else if (code === 45 || code === 48) icon = "wi wi-fog";
  else if ([51, 53, 55].includes(code)) icon = "wi wi-day-sprinkle";
  else if ([56, 57].includes(code)) icon = "wi wi-day-sleet";
  else if ([61, 63, 65].includes(code)) icon = "wi wi-day-rain";
  else if ([66, 67].includes(code)) icon = "wi wi-day-rain-mix";
  else if ([71, 73, 75, 77].includes(code)) icon = "wi wi-day-snow";
  else if ([80, 81, 82].includes(code)) icon = "wi wi-day-showers";
  else if ([95, 96, 99].includes(code)) icon = "wi wi-day-thunderstorm";

  // Farver
  if (code === 0) color = "text-yellow-400"; // Sol
  else if ([1, 2, 3].includes(code)) color = "text-gray-700"; // Skyet
  else if ([45, 48].includes(code)) color = "text-gray-800"; // Tåge
  else if ([51, 53, 55, 61, 63, 65].includes(code))
    color = "text-blue-400"; // Regn / drizzle
  else if ([56, 57, 66, 67].includes(code))
    color = "text-blue-300"; // Fryse-regn
  else if ([71, 73, 75, 77].includes(code)) color = "text-white"; // Sne
  else if ([80, 81, 82].includes(code)) color = "text-blue-500"; // Byger
  else if ([95, 96, 99].includes(code)) color = "text-purple-600"; // Torden

  return { icon, color };
}
