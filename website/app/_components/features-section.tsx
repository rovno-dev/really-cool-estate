"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRightIcon, BuildingIcon, KeyIcon, PercentIcon, ShieldIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturesSection() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

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
  )
}