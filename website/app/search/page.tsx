"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PropertyGrid } from "@/components/real-estate/property-grid";
import { PropertySearch } from "@/components/real-estate/property-search";
import { useLanguage } from "@/providers/language-provider";
import { properties } from "@/utils/constants/properties";
import { cities } from "@/utils/constants/cities";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { lang, t } = useLanguage();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    let result = properties;

    const q = searchParams.get("q");
    const city = searchParams.get("city");
    const district = searchParams.get("district");
    const type = searchParams.get("type");
    const developer = searchParams.get("developer");
    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const minArea = searchParams.get("minArea");
    const maxArea = searchParams.get("maxArea");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const minFloor = searchParams.get("minFloor");
    const maxFloor = searchParams.get("maxFloor");
    const yearFrom = searchParams.get("yearFrom");
    const yearTo = searchParams.get("yearTo");
    const parking = searchParams.get("parking");
    const furnished = searchParams.get("furnished");
    const mortgage = searchParams.get("mortgage");

    // Basic text search
    if (q) {
      const query = q.toLowerCase();
      result = result.filter(p =>
        p.title.en.toLowerCase().includes(query) ||
        p.title.ru.toLowerCase().includes(query) ||
        p.address.en.toLowerCase().includes(query) ||
        p.address.ru.toLowerCase().includes(query)
      );
    }

    // City filter
    if (city && city !== "all") {
      result = result.filter(p => p.city === city);
    }

    // District filter (we'll assume property has district field, but not present in mock; we'll skip for now)
    // if (district && district !== "all") { ... }

    // Type
    if (type && type !== "all") {
      result = result.filter(p => p.type === type);
    }

    // Bedrooms
    if (bedrooms && bedrooms !== "all") {
      result = result.filter(p => p.bedrooms === parseInt(bedrooms));
    }

    // Bathrooms
    if (bathrooms && bathrooms !== "all") {
      result = result.filter(p => p.bathrooms === parseInt(bathrooms));
    }

    // Area
    if (minArea) {
      result = result.filter(p => p.area >= parseInt(minArea));
    }
    if (maxArea) {
      result = result.filter(p => p.area <= parseInt(maxArea));
    }

    // Price
    if (minPrice) {
      result = result.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= parseInt(maxPrice));
    }

    // Floor
    if (minFloor) {
      result = result.filter(p => p.floor >= parseInt(minFloor));
    }
    if (maxFloor) {
      result = result.filter(p => p.floor <= parseInt(maxFloor));
    }

    // Year built
    if (yearFrom) {
      result = result.filter(p => p.yearBuilt >= parseInt(yearFrom));
    }
    if (yearTo) {
      result = result.filter(p => p.yearBuilt <= parseInt(yearTo));
    }

    // Amenities (mock - we'll add optional flags to property? For now, no filtering)
    // if (parking === "true") ... 
    // if (furnished === "true") ...
    // if (mortgage === "true") ...

    setFilteredProperties(result);
  }, [searchParams]);

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
        subtitle={`${filteredProperties.length} ${t("search.found")}`}
      />
    </main>
  );
}
