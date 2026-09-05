"use client"

import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { useEffect, useState } from "react";

export default function CityStatsSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <section className="py-20 bg-(--card)">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-display-1 font-bold text-primary">{city.stats.avgPricePerSqm[lang]}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ru" ? "Средняя цена за м²" : "Average price per m²"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-display-1 font-bold text-primary">{city.stats.newBuildings}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ru" ? "Новостроек" : "New Buildings"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-display-1 font-bold text-primary">
              {isMounted ? city.stats.population.toLocaleString("ru-RU") : ""}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {lang === "ru" ? "Население" : "Population"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}