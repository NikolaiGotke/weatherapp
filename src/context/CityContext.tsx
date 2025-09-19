"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Definerer strukturen for en by
export interface City {
  name: string;
  lat: number;
  lon: number;
}

// Struktur for context: indeholder den valgte by og en funktion til at ændre den
interface CityContextProps {
  city: City;
  setCity: (city: City) => void;
}

// Default-by, som appen starter med
const defaultCity: City = {
  name: "Bunkeren, Better Developers",
  lat: 56.1518,
  lon: 10.2064,
};

// Opretter context med default værdier
const CityContext = createContext<CityContextProps>({
  city: defaultCity,
  setCity: () => {},
});

// Provider-komponent som omslutter appen og giver adgang til city state globalt
export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<City>(defaultCity);
  // useState giver mulighed for at opdatere valgt by og få re-render hvor context bruges

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children} {}
    </CityContext.Provider>
  );
};

// Custom hook for nem adgang til city context i komponenter
export const useCity = () => useContext(CityContext);
