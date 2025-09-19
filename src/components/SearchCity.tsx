"use client";

import { useState, useEffect } from "react";

type CityResult = {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
};

type Props = {
  onSelectCity: (lat: number, lon: number, name: string) => void;
};

// SearchCity komponenten håndterer søgning efter byer: 
// - query holder brugerens input i søgefeltet
// - results gemmer de byer, som API’et returnerer baseret på input
// - highlightIndex holder styr på hvilken by der er markeret, så brugeren kan navigere med piletaster og Enter

export default function SearchCity({ onSelectCity }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Jeg bruger useEffect til at hente søgeresultater, hver gang query ændres
  // AbortController sikrer, at gamle fetch-kald annulleres, hvis brugeren skriver hurtigt
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=5`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results || []);
        setHighlightIndex(-1);
      })
      .catch(() => {}); // undgår fejl hvis fetch afbrydes

    return () => controller.abort();
  }, [query]);

  // Håndterer valg af by, sender data tilbage til parent og rydder input/resultater
  const handleSelect = (city: CityResult) => {
    onSelectCity(city.latitude, city.longitude, city.name);
    setQuery(""); 
    setResults([]); 
    setHighlightIndex(-1); 
  };

  // Keyboard-navigation gør komponenten mere brugervenlig og tilgængelig
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && results[highlightIndex]) {
        handleSelect(results[highlightIndex]); 
      } else if (results.length === 1) {
        handleSelect(results[0]);
      }
    }
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Søg efter by"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Jeg viser kun dropdown, hvis der er resultater */}
      {results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-md max-h-60 overflow-y-auto">
          {results.map((city, index) => (
            <li
              key={`${city.name}-${index}`}
              onClick={() => handleSelect(city)}
              className={`px-3 py-2 cursor-pointer ${
                index === highlightIndex ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
            >
              {city.name}{" "}
              <span className="text-gray-500 text-sm">
                ({city.country_code})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
