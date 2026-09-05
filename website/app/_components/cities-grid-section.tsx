"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { cities } from "@/utils/constants/cities";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function CitiesGridSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

  return (
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
                <ArrowRightIcon className="size-5 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}