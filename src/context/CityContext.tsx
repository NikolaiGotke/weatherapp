"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface City {
  name: string;
  lat: number;
  lon: number;
}

interface CityContextProps {
  city: City;
  setCity: (city: City) => void;
}

const defaultCity: City = {
  name: "Bunkeren, Better Developers",
  lat: 56.1518,
  lon: 10.2064,
};

const CityContext = createContext<CityContextProps>({
  city: defaultCity,
  setCity: () => {},
});

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<City>(defaultCity);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
