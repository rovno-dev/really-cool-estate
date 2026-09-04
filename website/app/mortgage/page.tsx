"use client";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/providers/language-provider";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import {
  UsersIcon,
  CodeIcon,
  MapPinIcon,
  HouseIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { MortgageCalculatorBanner } from "@/components/mortgage/mortgage-calculator-banner";

export default function MortgagePage() {
  const { lang } = useLanguage();

  // Real mortgage programs data as of 2026
  const mortgagePrograms = [
    {
      icon: <CodeIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "ИТ-ипотека" : "IT Mortgage",
      rate: lang === "ru" ? "до 6% годовых" : "up to 6% per annum",
      description:
        lang === "ru"
          ? "Для IT-специалистов в регионах (Москва и СПб исключены)."
          : "For IT specialists in regions (Moscow and SPb excluded).",
      details: lang === "ru"
        ? [
          "Первый взнос от 20%",
          "Максимум: 9 млн ₽ (до 18 млн ₽ с комбо)",
          "Срок до 30 лет",
          "Возраст 18–50 лет, работа в аккредитованной IT-компании",
          "Зарплата от 150 тыс. ₽ (миллионники) или от 90 тыс. ₽ (другие)",
          "Только новостройки, дома от юрлиц или участки под ИЖС",
        ]
        : [
          "Down payment from 20%",
          "Max: 9M ₽ (up to 18M ₽ with combo)",
          "Term up to 30 years",
          "Age 18–50, work at accredited IT company",
          "Salary from 150K ₽ (million+ cities) or 90K ₽ (others)",
          "Only new builds, houses from legal entities or land for IHC",
        ],
    },
    {
      icon: <HouseIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Сельская ипотека" : "Rural Mortgage",
      rate: lang === "ru" ? "от 0,1% до 3% годовых" : "from 0.1% to 3% per annum",
      description:
        lang === "ru"
          ? "Для покупки жилья в малых населённых пунктах."
          : "For buying housing in small settlements.",
      details: lang === "ru"
        ? [
          "Первый взнос от 30%",
          "Максимум: 6 млн ₽ (до 12 млн ₽ на семью)",
          "Срок до 25 лет",
          "Любой гражданин РФ; приоритет для работников АПК и соцсферы",
          "Дома в населённых пунктах до 30 тыс. человек, новостройки в опорных пунктах",
        ]
        : [
          "Down payment from 30%",
          "Max: 6M ₽ (up to 12M ₽ per family)",
          "Term up to 25 years",
          "Any RF citizen; priority for agricultural and social sector workers",
          "Houses in settlements up to 30K people, new builds in key points",
        ],
    },
    {
      icon: <UsersIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Семейная ипотека" : "Family Mortgage",
      rate: lang === "ru" ? "до 6% годовых" : "up to 6% per annum",
      description:
        lang === "ru"
          ? "Для семей с детьми. Продлена до 2030 года."
          : "For families with children. Extended until 2030.",
      details: lang === "ru"
        ? [
          "Первый взнос от 20%",
          "Максимум: 12 млн ₽ (Москва/СПб) или 6 млн ₽ (регионы)",
          "Срок до 30 лет",
          "Ребёнок до 6 лет, двое детей (малые города) или ребёнок-инвалид",
          "Новостройки по ДДУ, частные дома от аккредитованных застройщиков",
        ]
        : [
          "Down payment from 20%",
          "Max: 12M ₽ (Moscow/SPb) or 6M ₽ (regions)",
          "Term up to 30 years",
          "Child under 6, two children (small towns) or child with disability",
          "New builds (DDU), private houses from accredited developers",
        ],
    },
    {
      icon: <MapPinIcon className="size-8" weight="duotone" />,
      title: lang === "ru" ? "Дальневосточная и Арктическая" : "Far East & Arctic",
      rate: lang === "ru" ? "до 2% годовых" : "up to 2% per annum",
      description:
        lang === "ru"
          ? "Самая дешёвая программа для ДФО и Арктики."
          : "The cheapest program for Far East & Arctic.",
      details: lang === "ru"
        ? [
          "Первый взнос от 20%",
          "Максимум: 9 млн ₽ (жильё >60 м²) или 6 млн ₽",
          "Срок до 20 лет",
          "Молодые семьи до 35 лет, учителя, медики, участники СВО",
          "Новостройки в ДФО/Арктике; вторичка в сельской местности",
        ]
        : [
          "Down payment from 20%",
          "Max: 9M ₽ (housing >60 m²) or 6M ₽",
          "Term up to 20 years",
          "Young families under 35, teachers, doctors, SVO participants",
          "New builds in Far East/Arctic; secondary in rural areas",
        ],
    },
  ];

  return (
    <>
      <section className="pb-10 pt-12 bg-(--bg)">
        <Container>
          <div>
            <h1 className="text-display-2 sm:text-display-1">
              {lang === "ru" ? "Ипотека от 0,1%" : "Mortgage from 0.1%"}
            </h1>
            <p className="mt-4 text-body-2 text-muted-foreground">
              {lang === "ru"
                ? "Актуальные условия государственных программ с учётом изменений 2026 года."
                : "Current terms of state programs with 2026 updates."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {mortgagePrograms.map((program, index) => (
              <ScrollReveal key={index} delay={index * 80}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="h-[64px] flex size-14 items-center justify-center rounded-xl bg-muted text-foreground">
                        {program.icon}
                      </div>
                      <div className="w-full flex items-center justify-center rounded-xl bg-muted p-3 h-[64px]">
                        <p className="text-display-5 font-bold text-foreground">{program.rate}</p>
                      </div>
                    </div>
                    <CardTitle className="text-heading-3">{program.title}</CardTitle>
                    <CardDescription className="mt-2">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MortgageCalculatorBanner />
                    <ul className="space-y-2 mt-6">
                      {program.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2 text-sm">
                          <CheckCircleIcon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {lang === "ru"
              ? "Условия могут отличаться в зависимости от банка и региона. Уточняйте у специалиста."
              : "Terms may vary by bank and region. Consult a specialist."}
          </p>
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
            <RequestDialog>
              <Button size={'large'}>
                {lang === "ru" ? "Получить расчёт" : "Get Calculation"}
              </Button>
            </RequestDialog>
          </div>
        </Container>
      </section>
    </>
  );
}
