"use client";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, BedIcon, BathtubIcon, MapPinSimpleAreaIcon, RulerIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/providers/language-provider";
import { cn } from "@/lib/utils";

export interface PropertyListing {
  id: string;
  slug: string;
  title: { en: string; ru: string };
  address: { en: string; ru: string };
  description: { en: string; ru: string };
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  image: string;
  city: string;
  type: "apartment" | "house" | "townhouse";
  status: "available" | "sold" | "reserved";
  yearBuilt: number;
}

interface PropertyCardProps {
  property: PropertyListing;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { lang, t } = useLanguage();

  const formatPrice = (price: number) => {
    if (price >= 1_000_000) {
      return `${(price / 1_000_000).toFixed(1)}M ₽`;
    }
    return `${price.toLocaleString()} ₽`;
  };

  const statusLabels = {
    available: lang === "ru" ? "Доступно" : "Available",
    sold: lang === "ru" ? "Продано" : "Sold",
    reserved: lang === "ru" ? "Бронь" : "Reserved",
  } as const;

  const typeLabels = {
    apartment: lang === "ru" ? "Квартира" : "Apartment",
    house: lang === "ru" ? "Дом" : "House",
    townhouse: lang === "ru" ? "Таунхаус" : "Townhouse",
  } as const;

  return (
    <Link href={`/properties/${property.slug}`} className="block group">
      <Card className={cn("overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1, pt-0!", className)}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.title[lang]}
            fill
            className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="glass-static" className="!bg-white/80 !text-slate-900">
              {typeLabels[property.type]}
            </Badge>
            <Badge variant={property.status === "available" ? "filled-static" : "outlined-static"}>
              {statusLabels[property.status]}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-sm font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-heading-4 font-semibold text-foreground group-hover:text-primary transition-colors">
              {property.title[lang]}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{property.address[lang]}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <RulerIcon className="size-4" /> {property.area} m²
            </span>
            <span className="flex items-center gap-1.5">
              <BedIcon className="size-4" /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <BathtubIcon className="size-4" /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPinSimpleAreaIcon className="size-4" /> {property.floor}/{property.totalFloors}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
