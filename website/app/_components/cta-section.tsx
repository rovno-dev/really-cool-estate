"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function CtaSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

  return (
    <section className="py-20">
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
          <Button variant="glass" size="large" shape="round" className="mt-8">
            {lang === "ru" ? "Оставить заявку" : "Leave a Request"}
            <ArrowRightIcon size={16} weight="bold" />
          </Button>
        </div>
      </Container>
    </section>
  )
}