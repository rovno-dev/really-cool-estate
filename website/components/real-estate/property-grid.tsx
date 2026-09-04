"use client";
import { Container } from "../ui/container";
import { PropertyCard, PropertyListing } from "./property-card";
import { useLanguage } from "@/providers/language-provider";

interface PropertyGridProps {
  properties: PropertyListing[];
  title?: string;
  subtitle?: string;
  limit?: number;
  showViewAll?: boolean;
}

export function PropertyGrid({ properties, title, subtitle, limit, showViewAll = false }: PropertyGridProps) {
  const { lang } = useLanguage();
  const filtered = limit ? properties.slice(0, limit) : properties;

  return (
    <section className="py-16 bg-(--bg)">
      <Container>
        {title && (
          <div className="mb-10">
            <h2 className="text-display-2 font-semibold">{title}</h2>
            {subtitle && <p className="mt-2 text-body-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        {showViewAll && (
          <div className="mt-10 text-center">
            <a href="/search" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              {lang === "ru" ? "Смотреть все объекты" : "View All Properties"}
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
