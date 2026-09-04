"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MagnifyingGlassIcon, SlidersIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/providers/language-provider";

export function PropertySearch() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [priceMax, setPriceMax] = useState<string>("all");

  const handleSearch = () => {
    // In a real implementation, this would filter or navigate to search results
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type !== "all") params.set("type", type);
    if (bedrooms !== "all") params.set("bedrooms", bedrooms);
    if (priceMax !== "all") params.set("maxPrice", priceMax);
    
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="bg-(--card) border border-(--outline) rounded-2xl p-4 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_150px_150px_150px_auto] gap-3">
        <Input
          placeholder={lang === "ru" ? "Поиск по адресу или названию..." : "Search by address or name..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12"
        />
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={lang === "ru" ? "Тип" : "Type"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{lang === "ru" ? "Все типы" : "All types"}</SelectItem>
            <SelectItem value="apartment">{lang === "ru" ? "Квартира" : "Apartment"}</SelectItem>
            <SelectItem value="house">{lang === "ru" ? "Дом" : "House"}</SelectItem>
            <SelectItem value="townhouse">{lang === "ru" ? "Таунхаус" : "Townhouse"}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={bedrooms} onValueChange={setBedrooms}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={lang === "ru" ? "Комнаты" : "Bedrooms"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{lang === "ru" ? "Любое" : "Any"}</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priceMax} onValueChange={setPriceMax}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder={lang === "ru" ? "Цена до" : "Price up to"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{lang === "ru" ? "Любая" : "Any"}</SelectItem>
            <SelectItem value="10m">10M ₽</SelectItem>
            <SelectItem value="20m">20M ₽</SelectItem>
            <SelectItem value="50m">50M ₽</SelectItem>
            <SelectItem value="100m">100M ₽</SelectItem>
          </SelectContent>
        </Select>
        <Button size="large" shape="round" onClick={handleSearch} className="h-12 px-6">
          <MagnifyingGlassIcon className="size-5" />
          {lang === "ru" ? "Найти" : "Search"}
        </Button>
      </div>
    </div>
  );
}
