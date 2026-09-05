"use client"
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { AssetCard } from "./asset-card";

export default function FeaturesSection() {
  const { lang } = useLanguage();
  const { city } = useCity();

  return (
    <section className="py-18 bg-[var(--bg)] transition-colors duration-300 relative overflow-hidden">
      {/* Abstract background grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-glass)] via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/5 blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        {/* Editorial Header - Short, bold */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">
              // {lang === "ru" ? "Экосистема" : "Ecosystem"}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--on-bg-high)] leading-[0.95]">
              {lang === "ru" ? "Всё в одном" : "One system."}
              <br />
              <span className="text-[var(--primary)]">{lang === "ru" ? "Без компромиссов." : "No compromises."}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-lg font-light text-[var(--on-bg-medium)]">
              {lang === "ru" ? "Селекция. Финансы. Право." : "Selection. Finance. Law."}
            </p>
          </div>
        </div>

        {/* Cards Grid - Short copy, strong hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* CARD 01 */}
          <AssetCard
            indexLabel="01 / 03"
            gridSpanClass="lg:col-span-3 bg-gradient-to-br from-[var(--card)] to-[var(--card)]/60"
            actionText={lang === "ru" ? "Каталог" : "Catalogue"}
            title={lang === "ru" ? "Селекция" : "Curation"}
            badgeContent={
              <div className="relative">
                <span className="text-8xl font-black tracking-tighter text-[var(--primary)]/10 absolute -top-8 left-0">01</span>
                <div className="relative">
                  <span className="block text-5xl font-bold tracking-tight text-[var(--on-bg-high)]">120+</span>
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--primary)]">
                    {lang === "ru" ? `Резиденций в г. ${city.name.ru}` : `Residences in ${city.name.en}`}
                  </span>
                </div>
              </div>
            }
            description={
              lang === "ru"
                ? "Только проверенные лоты."
                : "Only vetted lots."
            }
          />
          {/* CARD 02 */}
          <AssetCard
            indexLabel="02 / 03"
            gridSpanClass="lg:col-span-2 bg-[var(--card)]"
            actionText={lang === "ru" ? "Модель" : "Model"}
            title={lang === "ru" ? "Финансы" : "Leverage"}
            badgeContent={
              <div className="relative">
                <span className="text-8xl font-black tracking-tighter text-[var(--primary)]/10 absolute -top-8 left-0">02</span>
                <div className="relative">
                  <span className="block text-5xl font-bold tracking-tight text-[var(--on-bg-high)]">3.5%</span>
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--on-bg-low)]">Floor rate</span>
                </div>
              </div>
            }
            description={
              lang === "ru"
                ? "Ставка ниже рынка."
                : "Below market."
            }
          />
          {/* CARD 03 - Full width with gradient */}
          <AssetCard
            indexLabel="03 / 03"
            gridSpanClass="lg:col-span-5 bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-[var(--primary-glass)]"
            actionText={lang === "ru" ? "Протокол" : "Protocol"}
            title={lang === "ru" ? "Право" : "Compliance"}
            badgeContent={
              <div className="relative">
                <span className="text-8xl font-black tracking-tighter text-[var(--primary)]/10 absolute -top-8 left-0">03</span>
                <div className="relative">
                  <span className="block text-5xl font-bold tracking-tight text-[var(--on-bg-high)]">0.0%</span>
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--success)]">Risk</span>
                </div>
              </div>
            }
            description={
              lang === "ru"
                ? "Абсолютная чистота сделки."
                : "Absolute purity."
            }
          />
        </div>
      </Container>
    </section>
  )
}
