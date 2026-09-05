"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

  return (
    <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] rotate-[-12deg] opacity-70 hover:opacity-100 transition-opacity">
          <Image className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-90" width={1200} height={1200} src={"/images/kazan-illustration.png"} alt={"illustration"} />
        </div>
        <div className="absolute bottom-[10%] left-[10%] rotate-[8deg] opacity-70 hover:opacity-100 transition-opacity">
          <Image className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-90" width={1200} height={1200} src={"/images/moscow-illustration.png"} alt={"illustration"} />
        </div>
        <div className="absolute top-[10%] right-[8%] rotate-[15deg] opacity-70 hover:opacity-100 transition-opacity">
          <Image className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-90" width={1200} height={1200} src={"/images/spb-illustration.png"} alt={"illustration"} />
        </div>
        <div className="absolute bottom-[15%] right-[5%] rotate-[-6deg] opacity-70 hover:opacity-100 transition-opacity">
          <Image className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-90" width={1200} height={1200} src={"/images/sochi-illustration.png"} alt={"illustration"} />
        </div>
      </div>
      <Container className="relative z-10 text-center">
        <Badge variant="glass-static" className="mb-6 text-sm tracking-wider px-4 py-2">
          {lang === "ru" ? "Недвижимость в г. " + city.name.ru : "Real Estate in " + city.name.en}
        </Badge>
        <h1 className="text-display-2 sm:text-display-1 lg:text-[4rem] font-bold leading-[1.05] max-w-3xl mx-auto">
          {lang === "ru" ? (
            <>Найдите свою<br />идеальную квартиру</>
          ) : (
            <>Find your<br />perfect apartment</>
          )}
        </h1>
        <p className="mt-4 text-body-3 sm:text-body-2 text-muted-foreground max-w-xl mx-auto">
          {lang === "ru"
            ? "Более 500 проверенных объектов в 4 городах России. От студий до пентхаусов."
            : "Over 500 verified properties in 4 cities across Russia. From studios to penthouses."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="large" shape="round" asChild>
            <Link href="#properties">
              {lang === "ru" ? "Смотреть объекты" : "View Properties"}
              <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </Button>
          <Button variant="glass" size="large" shape="round" asChild>
            <Link href="/mortgage">
              {lang === "ru" ? "Ипотека от 5мин." : "Mortgage from 5min."}
            </Link>
          </Button>
        </div>
      </Container>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs tracking-[0.3em] uppercase">
        {lang === "ru" ? "Прокрутите вниз" : "Scroll down"}
      </div>
    </section>
  )
}