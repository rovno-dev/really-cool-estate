"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { MagnifyingGlassIcon, SlidersIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { cities } from "@/utils/constants/cities";

interface PropertySearchProps {
  showReset?: boolean;
}

export function PropertySearch({ showReset = true }: PropertySearchProps) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const { city } = useCity();

  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>(city?.slug || "");
  const [district, setDistrict] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [developer, setDeveloper] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [bathrooms, setBathrooms] = useState<string>("all");
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

  // Sync city with context
  useEffect(() => {
    setSelectedCity(city?.slug || "");
    setDistrict("all");
  }, [city]);

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
    setSelectedCity(city?.slug || "");
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
    <div className="bg-(--card) border border-(--outline) rounded-2xl p-4 shadow-lg">
      {/* Row 1: Basic search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <Input
          placeholder={t("search.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 md:col-span-2 lg:col-span-2"
        />
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="h-12">
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
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={lang === "ru" ? "Все районы" : "All districts"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{lang === "ru" ? "Все районы" : "All districts"}</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d.ru} value={d.en}>
                {d[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-12">
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
        <Select value={developer} onValueChange={setDeveloper}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={lang === "ru" ? "Застройщик" : "Developer"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{lang === "ru" ? "Любой застройщик" : "Any developer"}</SelectItem>
            {developers.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Row 2: Rooms & Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-3">
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="h-12">
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
          <SelectTrigger className="h-12">
            <SelectValue placeholder={t("search.allBathrooms")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.allBathrooms")}</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <Input
            type="number"
            placeholder={t("search.minArea")}
            value={minArea}
            onChange={(e) => setMinArea(e.target.value)}
            className="h-12"
          />
          <Input
            type="number"
            placeholder={t("search.maxArea")}
            value={maxArea}
            onChange={(e) => setMaxArea(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <Input
            type="number"
            placeholder={t("search.minPrice")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-12"
          />
          <Input
            type="number"
            placeholder={t("search.maxPrice")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      {/* Row 3: Floor, Year, Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-3">
        <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <Input
            type="number"
            placeholder={lang === "ru" ? "Этаж от" : "Floor from"}
            value={minFloor}
            onChange={(e) => setMinFloor(e.target.value)}
            className="h-12"
          />
          <Input
            type="number"
            placeholder={lang === "ru" ? "Этаж до" : "Floor to"}
            value={maxFloor}
            onChange={(e) => setMaxFloor(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="flex gap-2 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <Input
            type="number"
            placeholder={lang === "ru" ? "Год от" : "Year from"}
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            className="h-12"
          />
          <Input
            type="number"
            placeholder={lang === "ru" ? "Год до" : "Year to"}
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="flex items-center gap-2 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={parking}
              onCheckedChange={(checked) => setParking(checked === true)}
            />
            {lang === "ru" ? "Парковка" : "Parking"}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={furnished}
              onCheckedChange={(checked) => setFurnished(checked === true)}
            />
            {lang === "ru" ? "Мебель" : "Furnished"}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={mortgage}
              onCheckedChange={(checked) => setMortgage(checked === true)}
            />
            {lang === "ru" ? "Ипотека" : "Mortgage"}
          </label>
        </div>
      </div>

      {/* Buttons */}
      {showReset && (
        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button variant="text" size="medium" onClick={resetFilters} className="sm:mr-2">
            <XIcon className="size-4" />
            {t("search.reset")}
          </Button>
          <Button size="large" shape="round" onClick={handleSearch} className="sm:w-auto">
            <MagnifyingGlassIcon className="size-5" />
            {t("search.submit")}
          </Button>
        </div>
      )}
    </div>
  );
}
