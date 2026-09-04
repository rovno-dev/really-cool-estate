"use client";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyGrid } from "@/components/real-estate/property-grid";
import { PropertySearch } from "@/components/real-estate/property-search";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";
import { getPropertiesByCity } from "@/utils/constants/properties";
import { cities } from "@/utils/constants/cities";
import Link from "next/link";
import { ArrowRight, BuildingIcon, KeyIcon, PercentIcon, ShieldIcon, TrophyIcon, UsersIcon } from "@phosphor-icons/react";

export default function Home() {
  const { lang, t } = useLanguage();
  const { city } = useCity();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const cityProperties = getPropertiesByCity(city.slug);

  const features = [
    {
      icon: <BuildingIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Более 120 ЖК" : "120+ Residential Complexes",
      description: lang === "ru" ? "От эконом до премиум — выбирайте под свой бюджет" : "From economy to premium — choose for your budget"
    },
    {
      icon: <KeyIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Ипотека от 3.5%" : "Mortgage from 3.5%",
      description: lang === "ru" ? "Специальные условия от банков-партнёров" : "Special terms from partner banks"
    },
    {
      icon: <PercentIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Рассрочка 0%" : "0% Installment",
      description: lang === "ru" ? "До 5 лет без переплат и скрытых комиссий" : "Up to 5 years without overpayment"
    },
    {
      icon: <ShieldIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Юридическая защита" : "Legal Protection",
      description: lang === "ru" ? "Полное сопровождение сделки и страховка" : "Full transaction support and insurance"
    },
  ];

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background gradient with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-bg to-bg" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] [background-size:60px_60px]" />

        <Container className="relative z-10 text-center">
          <Badge variant="glass-static" className="mb-6 text-sm tracking-wider uppercase px-4 py-2">
            {lang === "ru" ? "Недвижимость в " + city.name.ru : "Real Estate in " + city.name.en}
          </Badge>
          <h1 className="text-display-1 font-bold leading-[1.05] max-w-3xl mx-auto">
            {lang === "ru" ? (
              <>Найдите свою<br />идеальную квартиру</>
            ) : (
              <>Find your<br />perfect apartment</>
            )}
          </h1>
          <p className="mt-4 text-body-2 text-muted-foreground max-w-xl mx-auto">
            {lang === "ru"
              ? "Более 500 проверенных объектов в 4 городах России. От студий до пентхаусов."
              : "Over 500 verified properties in 4 cities across Russia. From studios to penthouses."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="large" shape="round" asChild>
              <Link href="#properties">
                {lang === "ru" ? "Смотреть объекты" : "View Properties"}
                <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
            <Button variant="outlined" size="large" shape="round" asChild>
              <Link href="/mortgage">
                {lang === "ru" ? "Ипотека" : "Mortgage"}
              </Link>
            </Button>
          </div>
        </Container>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs tracking-[0.3em] uppercase">
          {lang === "ru" ? "Прокрутите вниз" : "Scroll down"}
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-20 -mt-16 px-4">
        <Container className="max-w-5xl">
          <PropertySearch heroImage="/images/sochi-apartments-1.png" />
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-display-2 font-semibold">
              {lang === "ru" ? "Почему выбирают нас" : "Why Choose Us"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-(--card) border border-(--outline) p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-heading-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PROPERTIES */}
      <div id="properties">
        <PropertyGrid
          properties={cityProperties.length > 0 ? cityProperties : getPropertiesByCity("moscow")}
          title={lang === "ru" ? `Новостройки в ${city.name.ru}` : `New Buildings in ${city.name.en}`}
          subtitle={lang === "ru" ? "Специальные условия для покупателей" : "Special conditions for buyers"}
          limit={8}
          showViewAll={true}
        />
      </div>

      {/* CITY STATS */}
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

      {/* CITIES GRID */}
      <section className="py-20 bg-(--bg)">
        <Container>
          <div className="mb-12">
            <h2 className="text-display-2 font-semibold">
              {lang === "ru" ? "Другие города" : "Other Cities"}
            </h2>
            <p className="mt-2 text-body-3 text-muted-foreground">
              {lang === "ru" ? "Мы работаем в 4 городах России" : "We work in 4 cities across Russia"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/cities/${c.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-(--outline) hover:border-primary/40 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-heading-3 font-semibold text-white">{c.name[lang]}</h3>
                  <p className="text-sm text-white/70 mt-1">{c.propertiesCount} {lang === "ru" ? "объектов" : "properties"}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="size-5 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <Container>
          <div className="text-center text-on-primary">
            <h2 className="text-display-2 font-semibold">
              {lang === "ru" ? "Готовы выбрать квартиру?" : "Ready to choose your apartment?"}
            </h2>
            <p className="mt-2 text-body-3 opacity-80">
              {lang === "ru"
                ? "Оставьте заявку — подберём варианты под ваш бюджет за 1 день"
                : "Leave a request — we'll find options for your budget in 1 day"}
            </p>
            <Button variant="tonal-card" size="large" shape="round" className="mt-8">
              {lang === "ru" ? "Оставить заявку" : "Leave a Request"}
              <ArrowRight size={16} weight="bold" />
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
