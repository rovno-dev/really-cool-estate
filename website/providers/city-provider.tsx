"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { City, cities, getCityBySlug } from "@/utils/constants/cities";
import { useLanguage } from "@/providers/language-provider";

interface CityContextType {
  city: City;
  setCity: (city: City) => void;
  setCityBySlug: (slug: string) => void;
  cities: City[];
  isLoading: boolean;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [city, setCityState] = useState<City>(cities[0]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem("selected_city");
    if (stored) {
      const found = getCityBySlug(stored);
      if (found) setCityState(found);
    }
    setIsLoading(false);
  }, []);

  const setCity = (newCity: City) => {
    localStorage.setItem("selected_city", newCity.slug);
    setCityState(newCity);
  };

  const setCityBySlug = (slug: string) => {
    const found = getCityBySlug(slug);
    if (found) {
      localStorage.setItem("selected_city", found.slug);
      setCityState(found);
    }
  };

  return (
    <CityContext.Provider value={{ city, setCity, setCityBySlug, cities, isLoading }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
}
