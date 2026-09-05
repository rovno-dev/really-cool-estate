// website/app/_components/features-section.tsx
"use client"
import { Container } from "@/components/ui/container";
import { useLanguage } from "@/providers/language-provider";
import { AssetCard } from "./asset-card";

const featuresData = [
  {
    metric: {
      value: "120+",
      label: {
        en: "CURATED",
        ru: "ОТОБРАНО"
      }
    },
    title: {
      en: "We handpick every listing",
      ru: "Мы вручную отбираем каждое объявление"
    },
    description: {
      en: "No filler. Only places we’d live in ourselves. You get a shortlist that fits your life, not a database dump.",
      ru: "Никакого спама. Только места, где мы жили бы сами. Вы получаете подборку, которая подходит для вашей жизни, а не выгрузку из базы данных."
    },
    actionText: {
      en: "Explore",
      ru: "Исследовать"
    },
    accentColor: "var(--primary)",
    gridSpanClass: "lg:col-span-3", // 3/6 width
  },
  {
    metric: {
      value: "3.5%",
      label: {
        en: "RATE",
        ru: "СТАВКА"
      }
    },
    title: {
      en: "You get the best rate",
      ru: "Вы получаете лучшую ставку"
    },
    description: {
      en: "We talk to the banks so you don’t have to. Your mortgage comes with the lowest numbers we can find.",
      ru: "Мы сами ведем переговоры с банками. Ваша ипотека будет одобрена на самых выгодных условиях, которые мы сможем найти."
    },
    actionText: {
      en: "Simulate",
      ru: "Рассчитать"
    },
    accentColor: "var(--success)",
    gridSpanClass: "lg:col-span-2", // 2/6 width
  },
  {
    metric: {
      value: "0.0%",
      label: {
        en: "RISK",
        ru: "РИСК"
      }
    },
    title: {
      en: "We handle the legal stuff",
      ru: "Мы берем на себя юридические вопросы"
    },
    description: {
      en: "Contracts, inspections, title checks – all taken care of. You just sign where we tell you.",
      ru: "Договоры, проверки, экспертиза прав собственности — обо всем уже позаботились. Вам останется только поставить подпись."
    },
    actionText: {
      en: "Learn more",
      ru: "Узнать больше"
    },
    accentColor: "var(--warning)",
    gridSpanClass: "lg:col-span-1", // 1/6 width
  },

];

export default function FeaturesSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-18 bg-[var(--bg)] transition-colors duration-300 overflow-hidden">
      {/* Abstract map background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,var(--primary)/10,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,var(--primary)/5,transparent_50%)]" />
        {/* Stylized map lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1600 800" fill="none" preserveAspectRatio="none">
          <path d="M0 200 Q400 150, 800 250 T1600 200" stroke="var(--primary)" strokeWidth="0.5" opacity="0.3" />
          <path d="M0 500 Q400 550, 800 450 T1600 500" stroke="var(--primary)" strokeWidth="0.5" opacity="0.2" />
          <path d="M400 0 Q450 400, 350 800" stroke="var(--primary)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="800" cy="200" r="4" fill="var(--primary)" opacity="0.4" />
          <circle cx="200" cy="500" r="3" fill="var(--primary)" opacity="0.3" />
          <circle cx="1200" cy="450" r="5" fill="var(--primary)" opacity="0.5" />
          <circle cx="1400" cy="150" r="3" fill="var(--primary)" opacity="0.2" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--on-bg-high)] leading-[0.95]">
              {lang === "ru" ? "Без суеты." : "No fuss."}
              <br />
              <span className="text-[var(--primary)]">{lang === "ru" ? "Просто решение." : "Just results."}</span>
            </h2>
          </div>
        </div>

        {/* Cards from array */}
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr_2fr] gap-6">
          {featuresData.map((feature, i) => (
            <AssetCard
              key={i}
              metric={{ value: feature.metric.value, label: feature.metric.label[lang] }}
              title={feature.title[lang]}
              description={feature.description[lang]}
              actionText={feature.actionText[lang]}
              accentColor={feature.accentColor}
            // gridSpanClass={feature.gridSpanClass}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}