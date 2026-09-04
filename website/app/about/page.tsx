"use client";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { useLanguage } from "@/providers/language-provider";
import { TrophyIcon, UsersIcon, BuildingIcon, TrendUpIcon } from "@phosphor-icons/react";

export default function AboutPage() {
  const { lang } = useLanguage();

  const stats = [
    { icon: <TrophyIcon className="size-6" weight="duotone" />, value: "12 лет", label: lang === "ru" ? "На рынке" : "On the market" },
    { icon: <UsersIcon className="size-6" weight="duotone" />, value: "3,500+", label: lang === "ru" ? "Клиентов" : "Clients" },
    { icon: <BuildingIcon className="size-6" weight="duotone" />, value: "120+", label: lang === "ru" ? "Жилых комплексов" : "Residential complexes" },
    { icon: <TrendUpIcon className="size-6" weight="duotone" />, value: "98%", label: lang === "ru" ? "Сделок успешно" : "Successful deals" },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-bg to-bg">
        <Container className="max-w-3xl text-center">
          <Badge variant="tonal-static" className="mb-4 px-4 py-2">
            {lang === "ru" ? "О компании" : "About Us"}
          </Badge>
          <h1 className="text-display-1 font-bold">
            {lang === "ru" ? "Помогаем найти дом" : "We Help You Find a Home"}
          </h1>
          <p className="mt-4 text-body-2 text-muted-foreground">
            {lang === "ru"
              ? "Realty Pro — агентство недвижимости с 12-летним опытом. Мы работаем в 4 городах России и помогаем клиентам покупать, продавать и инвестировать в недвижимость."
              : "Realty Pro is a real estate agency with 12 years of experience. We work in 4 cities across Russia and help clients buy, sell, and invest in real estate."}
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 bg-(--bg)">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-8 text-center hover:border-primary/40 transition-all hover:shadow-xl">
                  <div className="flex justify-center mb-4">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-display-3 font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 bg-(--card)">
        <Container className="max-w-2xl text-center">
          <h2 className="text-display-3 font-semibold">
            {lang === "ru" ? "Наша миссия" : "Our Mission"}
          </h2>
          <p className="mt-4 text-body-2 text-muted-foreground leading-relaxed">
            {lang === "ru"
              ? "Мы делаем процесс покупки недвижимости простым, прозрачным и безопасным. Каждый клиент получает персонального менеджера, который сопровождает его на всех этапах — от выбора объекта до получения ключей."
              : "We make the home buying process simple, transparent, and safe. Every client gets a personal manager who accompanies them at every stage — from choosing a property to receiving the keys."}
          </p>
        </Container>
      </section>
    </main>
  );
}
