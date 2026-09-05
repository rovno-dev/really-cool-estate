"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { cities } from "@/utils/constants/cities";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";

export default function CitiesGridSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

  return (
    <section className="py-16 bg-(--bg)">
      <Container>
        <div className="mb-12">
          <h2 className="text-display-2 font-semibold">
            {lang === "ru" ? "Города присутствия" : "Our cities"}
          </h2>
          <p className="mt-2 text-body-3 text-muted-foreground">
            {lang === "ru" ? "Мы работаем в 4 городах России" : "We work in 4 cities across Russia"}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/cities/${c.slug}`}
            >
              <div className="grid grid-cols-[1fr_130px] lg:grid-cols-[1fr_100px] aspect-21/9 gap-1">
                <div className="relative bg-(--card) rounded-xl border p-3 overflow-hidden">
                  <h3 className="text-display-4 md:text-display-4 text-(--on-bg-medium)">
                    {c.name[lang]}
                  </h3>
                  {c.image?.src && (
                    <img className="absolute bottom-0 right-0 h-[50%] aspect-3/2 object-cover" src={c.image?.src} alt="" />
                  )}
                </div>
                <div className="bg-(--card) rounded-xl border">
                  <div className="h-30 overflow-hidden flex items-center justify-end">
                    <p className="text-5xl md:text-6xl lg:text-5xl font-black text-(--on-bg-low) uppercase leading-none origin-center scale-y-[2] px-0.5">
                      {c.propertiesCount}
                    </p>
                  </div>
                  <p className="text-body-3 w-full text-right text-(--on-bg-medium) px-3 pb-3">
                    {lang == 'ru' ? "объектов" : "objects"}
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRightIcon className="size-5 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}