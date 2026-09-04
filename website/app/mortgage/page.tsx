"use client";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/providers/language-provider";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { PercentIcon, BuildingIcon, ShieldIcon, CheckCircleIcon } from "@phosphor-icons/react";

export default function MortgagePage() {
  const { lang } = useLanguage();

  const mortgagePrograms = [
    {
      icon: <PercentIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Семейная ипотека" : "Family Mortgage",
      rate: lang === "ru" ? "6% годовых" : "6% per annum",
      description: lang === "ru" 
        ? "Для семей с детьми до 18 лет. Государственная поддержка."
        : "For families with children under 18. State support.",
      conditions: lang === "ru" 
        ? ["Первый взнос от 15%", "Срок до 30 лет", "Субсидия от государства"]
        : ["Down payment from 15%", "Term up to 30 years", "Government subsidy"],
    },
    {
      icon: <BuildingIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Ипотека для IT" : "IT Mortgage",
      rate: lang === "ru" ? "5% годовых" : "5% per annum",
      description: lang === "ru"
        ? "Специальная программа для IT-специалистов."
        : "Special program for IT professionals.",
      conditions: lang === "ru"
        ? ["Подтверждение дохода", "Возраст до 45 лет", "Работа в аккредитованной компании"]
        : ["Income verification", "Age under 45", "Work at accredited company"],
    },
    {
      icon: <ShieldIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Господдержка" : "State Support",
      rate: lang === "ru" ? "8% годовых" : "8% per annum",
      description: lang === "ru"
        ? "Базовая государственная программа для всех покупателей."
        : "Basic government program for all buyers.",
      conditions: lang === "ru"
        ? ["Первый взнос от 20%", "Срок до 25 лет", "Первичное жильё"]
        : ["Down payment from 20%", "Term up to 25 years", "Primary housing"],
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-bg to-bg">
        <Container className="text-center max-w-3xl">
          <Badge variant="tonal-static" className="mb-4 px-4 py-2">
            {lang === "ru" ? "Ипотечные программы" : "Mortgage Programs"}
          </Badge>
          <h1 className="text-display-1 font-bold">
            {lang === "ru" ? "Ипотека от 5%" : "Mortgage from 5%"}
          </h1>
          <p className="mt-4 text-body-2 text-muted-foreground">
            {lang === "ru"
              ? "Подберём оптимальную программу под вашу ситуацию. Расчёт за 5 минут."
              : "We'll find the best program for your situation. Calculation in 5 minutes."}
          </p>
        </Container>
      </section>

      {/* Programs */}
      <section className="py-16 bg-(--bg)">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mortgagePrograms.map((program, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="h-full p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                      {program.icon}
                    </div>
                    <CardTitle className="text-heading-3">{program.title}</CardTitle>
                    <CardDescription className="mt-2">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl bg-primary-card p-4 text-center mb-6">
                      <p className="text-display-3 font-bold text-primary">{program.rate}</p>
                    </div>
                    <ul className="space-y-2">
                      {program.conditions.map((condition) => (
                        <li key={condition} className="flex items-start gap-2 text-sm">
                          <CheckCircleIcon className="size-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Calculator CTA */}
      <section className="py-20 bg-(--card)">
        <Container className="text-center max-w-2xl">
          <h2 className="text-display-2 font-semibold">
            {lang === "ru" ? "Рассчитайте свою ипотеку" : "Calculate Your Mortgage"}
          </h2>
          <p className="mt-3 text-body-3 text-muted-foreground">
            {lang === "ru"
              ? "Свяжитесь с нашим специалистом и получите индивидуальный расчёт в течение 24 часов."
              : "Contact our specialist and get a personalized calculation within 24 hours."}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="/contacts" className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 font-medium hover:bg-primary/90 transition-colors">
              {lang === "ru" ? "Получить расчёт" : "Get Calculation"}
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
