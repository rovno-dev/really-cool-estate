"use client";
import { useMemo } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { MapPinIcon, CheckIcon, CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface CitySwitcherProps {
  className?: string;
}

export function CitySwitcher({ className }: CitySwitcherProps) {
  const { city, setCityBySlug, cities, isLoading } = useCity();
  const { lang } = useLanguage();

  const cityName = useMemo(() => {
    if (!city || isLoading) return "";
    return city.name[lang];
  }, [city, lang, isLoading]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <button
          className="flex items-center gap-1.5 rounded-full border border-(--outline) bg-(--card) px-3 h-9 text-sm font-medium transition-all hover:border-(--primary)/50 hover:shadow-sm cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label="Select city"
        >
          <MapPinIcon className="size-4 text-(--on-bg-low) group-hover:text-(--primary) transition-colors" />
          <span>{cityName || "Select city"}</span>
          <CaretDownIcon className="size-3 text-(--on-bg-low) transition-transform" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 p-1.5">
        <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-(--on-bg-low) px-2 py-1.5">
          {lang === "ru" ? "Выберите город" : "Select City"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {cities.map((c) => (
          <DropdownMenuItem
            key={c.slug}
            onClick={() => setCityBySlug(c.slug)}
            className={cn(
              "flex items-center justify-between rounded-lg px-2 py-2 cursor-pointer transition-colors",
              city?.slug === c.slug && "bg-(--primary-card) text-(--primary)"
            )}
          >
            <span className="flex items-center gap-2.5">
              <span className="text-sm font-medium">{c.name[lang]}</span>
              {/* <span className="text-xs text-muted-foreground">{c.region[lang]}</span> */}
            </span>
            {city?.slug === c.slug && <CheckIcon className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
