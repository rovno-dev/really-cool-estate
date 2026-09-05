"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";
import { MagnifyingGlassIcon, XIcon, CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { cities } from "@/utils/constants/cities";

interface PropertySearchProps {
  heroImage?: string;
  compact?: boolean;
}

export function PropertySearch({ heroImage, compact = false }: PropertySearchProps) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { city } = useCity();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const firstRender = useRef(true);

  // Basic filters
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    const urlCity = searchParams.get("city");
    return urlCity || city?.slug || "moscow";
  });
  const [district, setDistrict] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [developer, setDeveloper] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [bathrooms, setBathrooms] = useState<string>("all");

  // Advanced filters
  const [minArea, setMinArea] = useState<string>("");
  const [maxArea, setMaxArea] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [minFloor, setMinFloor] = useState<string>("");
  const [maxFloor, setMaxFloor] = useState<string>("");
  const [yearFrom, setYearFrom] = useState<string>("");
  const [yearTo, setYearTo] = useState<string>("");
  const [parking, setParking] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [mortgage, setMortgage] = useState(false);

  useEffect(() => {
    setHasInitialized(true);
  }, []);

  // Update selectedCity when city context changes, but only after initial load
  useEffect(() => {
    if (hasInitialized && city) {
      setSelectedCity(city.slug);
      setDistrict("all");
    }
  }, [city, hasInitialized]);

  // Sync selectedCity to the URL query parameter (skip first render)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const currentCityParam = searchParams.get("city");
    if (selectedCity && selectedCity !== "all") {
      if (currentCityParam !== selectedCity) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("city", selectedCity);
        router.replace(`?${params.toString()}`, { scroll: false });
      }
    } else if (selectedCity === "all" && currentCityParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("city");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedCity, searchParams, router]);

  const developers = [
    { value: "pik", label: lang === "ru" ? "ПИК" : "PIK" },
    { value: "samolet", label: lang === "ru" ? "Самолёт" : "Samolet" },
    { value: "donstroy", label: lang === "ru" ? "Донстрой" : "Donstroy" },
    { value: "lSR", label: lang === "ru" ? "ЛСР" : "LSR" },
    { value: "other", label: lang === "ru" ? "Другой" : "Other" },
  ];
  const districts = city ? city.neighborhoods : [];

  const resetFilters = () => {
    setQuery("");
    setSelectedCity(city?.slug || "moscow");
    setDistrict("all");
    setType("all");
    setDeveloper("all");
    setBedrooms("all");
    setBathrooms("all");
    setMinArea("");
    setMaxArea("");
    setMinPrice("");
    setMaxPrice("");
    setMinFloor("");
    setMaxFloor("");
    setYearFrom("");
    setYearTo("");
    setParking(false);
    setFurnished(false);
    setMortgage(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCity && selectedCity !== "all") params.set("city", selectedCity);
    if (district && district !== "all") params.set("district", district);
    if (type !== "all") params.set("type", type);
    if (developer !== "all") params.set("developer", developer);
    if (bedrooms !== "all") params.set("bedrooms", bedrooms);
    if (bathrooms !== "all") params.set("bathrooms", bathrooms);
    if (minArea) params.set("minArea", minArea);
    if (maxArea) params.set("maxArea", maxArea);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minFloor) params.set("minFloor", minFloor);
    if (maxFloor) params.set("maxFloor", maxFloor);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);
    if (parking) params.set("parking", "true");
    if (furnished) params.set("furnished", "true");
    if (mortgage) params.set("mortgage", "true");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
      {/* Background image with overlay */}
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
          <div className="absolute inset-0" />
        </div>
      )}
      {/* Form card */}
      <div className="relative bg-background/95 backdrop-blur-lg p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-2">
          <h2 className="text-heading-3 font-semibold">{t("search.title")}</h2>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            {showAdvanced ? t("search.hideAdvanced") : t("search.showAdvanced")}
            <CaretDownIcon className={cn("size-4 transition-transform", showAdvanced && "rotate-180")} />
          </button>
        </div>
        {/* Basic search row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            placeholder={t("search.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 md:col-span-2 lg:col-span-2"
          />
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="h-14 w-full">
              <SelectValue placeholder={t("search.allCities")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.allCities")}</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-14 w-full">
              <SelectValue placeholder={t("search.allTypes")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.allTypes")}</SelectItem>
              <SelectItem value="apartment">{t("search.apartment")}</SelectItem>
              <SelectItem value="house">{t("search.house")}</SelectItem>
              <SelectItem value="townhouse">{t("search.townhouse")}</SelectItem>
              <SelectItem value="commercial">{t("search.commercial")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Quick filters row (always visible) */}
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select value={district} onValueChange={setDistrict}>
            <SelectTrigger className="h-14 w-full">
              <SelectValue placeholder={t("search.allDistricts")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.allDistricts")}</SelectItem>
              {districts.map((d) => (
                <SelectItem key={d.ru} value={d.en}>
                  {d[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="h-14 w-full">
              <SelectValue placeholder={t("search.allBedrooms")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.allBedrooms")}</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
          <Select value={bathrooms} onValueChange={setBathrooms}>
            <SelectTrigger className="h-14 w-full">
              <SelectValue placeholder={t("search.allBathrooms")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.allBathrooms")}</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
          <Select value={developer} onValueChange={setDeveloper}>
            <SelectTrigger className="h-14 w-full">
              <SelectValue placeholder={t("search.allDevelopers")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.allDevelopers")}</SelectItem>
              {developers.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Advanced filters section */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-border/50 animate-in fade-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Area */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {t("search.minArea")} — {t("search.maxArea")}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={t("search.minArea")}
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    className="h-10"
                  />
                  <Input
                    type="number"
                    placeholder={t("search.maxArea")}
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
              {/* Price */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {t("search.minPrice")} — {t("search.maxPrice")}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={t("search.minPrice")}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="h-10"
                  />
                  <Input
                    type="number"
                    placeholder={t("search.maxPrice")}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
              {/* Floor */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {t("search.minFloor")} — {t("search.maxFloor")}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={t("search.minFloor")}
                    value={minFloor}
                    onChange={(e) => setMinFloor(e.target.value)}
                    className="h-10"
                  />
                  <Input
                    type="number"
                    placeholder={t("search.maxFloor")}
                    value={maxFloor}
                    onChange={(e) => setMaxFloor(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
              {/* Year built */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  {t("search.yearFrom")} — {t("search.yearTo")}
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={t("search.yearFrom")}
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                    className="h-10"
                  />
                  <Input
                    type="number"
                    placeholder={t("search.yearTo")}
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            </div>
            {/* Amenities */}
            <div className="mt-4 flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={parking} onCheckedChange={(c) => setParking(c === true)} />
                {t("search.parking")}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={furnished} onCheckedChange={(c) => setFurnished(c === true)} />
                {t("search.furnished")}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={mortgage} onCheckedChange={(c) => setMortgage(c === true)} />
                {t("search.mortgage")}
              </label>
            </div>
          </div>
        )}
        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="text" size="medium" onClick={resetFilters}>
            <XIcon className="size-4" />
            {t("search.reset")}
          </Button>
          <Button size="large" shape="round" onClick={handleSearch} className="sm:min-w-40">
            <MagnifyingGlassIcon className="size-5" />
            {t("search.submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
