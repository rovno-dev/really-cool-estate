"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { SpinningCityIllustrations } from "@/components/real-estate/spinning-city-illustrations";

export default function HeroSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

  return (
    <section className="relative py-16 pb-24 lg:pt-64 flex items-center justify-center overflow-hidden">
      <div className="absolute -bottom-[50%] md:inset-0 flex items-center justify-center lg:justify-end overflow-visible pointer-events-none z-0">
        <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] flex items-center justify-center lg:translate-x-[60%] xl:translate-x-[60%] 2xl:translate-x-[20%]">
          <SpinningCityIllustrations />
        </div>
      </div>
      <Container className="relative z-10 text-center lg:text-left">
        <div>
          <Badge variant="glass-static" className="mb-6 text-sm tracking-wider px-4 py-2">
            {lang === "ru" ? "Недвижимость в г. " + city.name.ru : "Real Estate in " + city.name.en}
          </Badge>
          <h1 className="text-display-2 sm:text-display-1 lg:text-[4rem] font-bold! leading-[1.05]">
            {lang === "ru" ? (
              <>Найдите свою<br />идеальную квартиру</>
            ) : (
              <>Find your<br />perfect apartment</>
            )}
          </h1>
          <p className="mt-4 text-body-3 sm:text-body-2 text-muted-foreground max-w-xl mx-auto lg:mx-0">
            {lang === "ru"
              ? "Более 500 проверенных объектов в 4 городах России. От студий до пентхаусов."
              : "Over 500 verified properties in 4 cities across Russia. From studios to penthouses."}
          </p>
          {/* <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
          </div> */}
        </div>
      </Container >
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs tracking-[0.3em] uppercase">
        {lang === "ru" ? "Прокрутите вниз" : "Scroll down"}
      </div>
    </section >
  )
}
