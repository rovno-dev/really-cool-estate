"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PropertyGrid } from "@/components/real-estate/property-grid";
import { PropertySearch } from "@/components/real-estate/property-search";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";
import { properties } from "@/utils/constants/properties";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const { city } = useCity();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    let result = properties;
    
    const q = searchParams.get("q");
    const type = searchParams.get("type");
    const bedrooms = searchParams.get("bedrooms");
    const maxPrice = searchParams.get("maxPrice");

    if (q) {
      const query = q.toLowerCase();
      result = result.filter(p => 
        p.title.en.toLowerCase().includes(query) || 
        p.title.ru.toLowerCase().includes(query) ||
        p.address.en.toLowerCase().includes(query) ||
        p.address.ru.toLowerCase().includes(query)
      );
    }
    if (type && type !== "all") {
      result = result.filter(p => p.type === type);
    }
    if (bedrooms && bedrooms !== "all") {
      result = result.filter(p => p.bedrooms === parseInt(bedrooms));
    }
    if (maxPrice && maxPrice !== "all") {
      const maxPriceValue = maxPrice === "10m" ? 10_000_000 : 
                           maxPrice === "20m" ? 20_000_000 : 
                           maxPrice === "50m" ? 50_000_000 : 100_000_000;
      result = result.filter(p => p.price <= maxPriceValue);
    }

    setFilteredProperties(result);
  }, [searchParams, city]);

  return (
    <main>
      <section className="py-16 bg-(--bg)">
        <Container>
          <h1 className="text-display-2 font-semibold mb-8">
            {lang === "ru" ? "Поиск объектов" : "Property Search"}
          </h1>
          <PropertySearch />
        </Container>
      </section>
      <PropertyGrid 
        properties={filteredProperties}
        title={lang === "ru" ? "Результаты" : "Results"}
        subtitle={`${filteredProperties.length} ${lang === "ru" ? "объектов найдено" : "properties found"}`}
      />
    </main>
  );
}
