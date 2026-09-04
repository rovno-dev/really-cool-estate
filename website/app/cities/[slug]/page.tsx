"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyGrid } from "@/components/real-estate/property-grid";
import { PropertySearch } from "@/components/real-estate/property-search";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";
import { getCityBySlug } from "@/utils/constants/cities";
import { getPropertiesByCity } from "@/utils/constants/properties";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { ArrowRight } from "@phosphor-icons/react";

export default function CityPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { lang } = useLanguage();
  const { setCityBySlug } = useCity();
  const [city, setCity] = useState<any>(null);

  useEffect(() => {
    const found = getCityBySlug(slug);
    if (found) {
      setCity(found);
      setCityBySlug(found.slug);
    }
  }, [slug, setCityBySlug]);

  if (!city) {
    return (
      <main className="py-20 text-center">
        <p>{lang === "ru" ? "Загрузка..." : "Loading..."}</p>
      </main>
    );
  }

  const properties = getPropertiesByCity(city.slug);

  return (
    <main className="overflow-x-hidden">
      {/* City Hero */}
      <section className="relative h-[70svh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-bg to-bg" />
        <Container className="relative z-10 text-center">
          <Badge variant="glass-static" className="mb-6 px-4 py-2 uppercase tracking-wider text-sm">
            {city.region[lang]}
          </Badge>
          <h1 className="text-display-1 font-bold">{city.name[lang]}</h1>
          <p className="mt-4 text-body-2 text-muted-foreground max-w-xl mx-auto">
            {city.description[lang]}
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-display-3 font-bold">{city.stats.avgPricePerSqm[lang]}</p>
              <p className="text-sm text-muted-foreground">{lang === "ru" ? "за м²" : "per m²"}</p>
            </div>
            <div className="text-center">
              <p className="text-display-3 font-bold">{city.stats.newBuildings}</p>
              <p className="text-sm text-muted-foreground">{lang === "ru" ? "новостроек" : "new builds"}</p>
            </div>
            <div className="text-center">
              <p className="text-display-3 font-bold">{city.stats.population.toLocaleString("ru-RU")}</p>
              <p className="text-sm text-muted-foreground">{lang === "ru" ? "жителей" : "residents"}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Search */}
      <section className="relative z-20 -mt-12 px-4">
        <Container>
          <PropertySearch />
        </Container>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-(--bg)">
        <Container>
          <h2 className="text-display-3 font-semibold mb-8">
            {lang === "ru" ? "Районы" : "Neighborhoods"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {city.neighborhoods.map((neighborhood) => (
              <Badge key={neighborhood.ru} variant="tonal-static" className="px-4 py-2 text-sm">
                {neighborhood[lang]}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* Properties */}
      <PropertyGrid
        properties={properties}
        title={lang === "ru" ? `Объекты в ${city.name.ru}` : `Properties in ${city.name.en}`}
        subtitle={lang === "ru" ? "Все объекты с проверенными документами" : "All properties with verified documents"}
      />
    </main>
  );
}
