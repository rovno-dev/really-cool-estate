"use client"

import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { AssetCard } from "./asset-card"; // Import your child component file here
import {
  ShieldCheck,
  TrendUp,
  Fingerprint,
  Compass
} from "@phosphor-icons/react";

export default function FeaturesSection() {
  const { lang } = useLanguage();
  const { city } = useCity();

  return (
    <section className="py-18 bg-[var(--bg)] transition-colors duration-300 relative overflow-hidden">

      {/* Blueprint Structural Grid Overlay Line elements */}
      <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-40 border-x border-[var(--outline)] max-w-7xl mx-auto z-0">
        <div className="border-r border-[var(--outline)]/50" />
        <div className="border-r border-[var(--outline)]/50" />
        <div className="border-r border-[var(--outline)]/50" />
      </div>

      <Container className="relative z-10">

        {/* Editorial Layout Page Typography Header */}
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">
              // {lang === "ru" ? "Управление активами" : "Asset Architecture"}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[var(--on-bg-high)] leading-[1.1]">
              {lang === "ru" ? (
                <>Новый регламент<br /><span className="font-semibold text-[var(--on-bg-high)]">выбора недвижимости</span></>
              ) : (
                <>A new framework for<br /><span className="font-semibold text-[var(--on-bg-high)]">acquiring premium assets</span></>
              )}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 border-l border-[var(--outline)] p-8 bg-(--primary-glass) backdrop-glass rounded-xl">
            <p className="text-base font-light leading-relaxed text-[var(--on-bg-medium)] max-w-md">
              {lang === "ru"
                ? "Мы отказались от компромиссного поиска. Мы анализируем урбанистическую ценность, финансовое плечо и юридическую безупречность для формирования вашего портфеля."
                : "We move past typical database searches. We analyze urban value indices, structured financial leverage, and absolute compliance stability to solidify your legacy portfolio."}
            </p>
          </div>
        </div>

        {/* Separated Component Grid List Matrix layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* CARD 01 */}
          <AssetCard
            indexLabel="STRATUM_01"
            gridSpanClass="lg:col-span-3"
            icon={<Compass className="size-6 transition-transform duration-500 group-hover:rotate-45" weight="light" />}
            actionText={lang === "ru" ? "Изучить лоты" : "Explore Inventory"}
            title={lang === "ru" ? "Архитектурная селекция" : "Architectural Curation"}
            badgeContent={
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--on-bg-high)]">120+</span>
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--primary)] font-medium">
                  {lang === "ru" ? `Резиденций в г. ${city.name.ru}` : `Residences in ${city.name.en}`}
                </span>
              </div>
            }
            description={
              lang === "ru"
                ? "Прямой доступ к закрытым пулам лотов, недоступных на массовом рынке. От премиальных коллекционных пентхаусов до высокодоходных коммерческих активов."
                : "Direct alignment with off-market real estate matrixes. From collection-class penthouses to institutional high-yield units, fully audited prior to listing."
            }
          />

          {/* CARD 02 */}
          <AssetCard
            indexLabel="LEVERAGE_02"
            gridSpanClass="lg:col-span-2"
            icon={<TrendUp className="size-6 transition-transform duration-500 group-hover:scale-110" weight="light" />}
            actionText={lang === "ru" ? "Рассчитать ликвидность" : "Simulate Yield"}
            title={lang === "ru" ? "Субсидированный капитал" : "Subsidized Leverage"}
            badgeContent={
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--on-bg-high)]">3.5%</span>
                <span className="text-xs uppercase font-mono tracking-wider text-[var(--on-bg-low)]">Floor Rate</span>
              </div>
            }
            description={
              lang === "ru"
                ? "Управление стоимостью денег. Индивидуальные беспроцентные векторы рассрочки до 5 лет и эксклюзивные банковские лимиты без наценок на квадратный метр."
                : "Maximizing financial velocity. Custom 0% installment matrixes up to 5 years and subsidized mortgage lending lines secured via partner-bank relationships."
            }
          />

          {/* CARD 03 — PRESTIGE BANNER WITH SPECIAL SIDE CONTROLS INTERACTIVE AREA */}
          <AssetCard
            indexLabel="COMPLIANCE_03"
            gridSpanClass="lg:col-span-5 bg-gradient-to-br from-[var(--card)] to-[var(--sidebar-accent)]"
            icon={<ShieldCheck className="size-6" weight="light" />}
            actionText={lang === "ru" ? "Правовой регламент" : "Review Protocols"}
            title={lang === "ru" ? "Юридический суверенитет и аудит рисков" : "Absolute Fiduciary Risk Mitigation"}
            description={
              lang === "ru"
                ? "Каждая транзакция проходит трёхэтапную независимую валидацию. Мы контролируем финансовую устойчивость эскроу-счетов девелопера, проводим аудит прав собственности и обеспечиваем полное титульное страхование сделки."
                : "Every capital transaction goes through three separate layers of validation. We check developer escrow capitalization metrics, run automated forensic land audits, and institute complete protection security."
            }
            sideControl={
              <>
                <div className="hidden md:block text-right">
                  <div className="text-xs font-mono text-[var(--on-bg-low)]">RISK INDEX</div>
                  <div className="text-sm font-semibold text-[var(--success)]">0.0% COEFF</div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--outline)] text-xs font-medium text-[var(--on-bg-high)]">
                  <Fingerprint className="size-4 text-[var(--primary)] animate-pulse" />
                  <span>SECURE_ID</span>
                </div>
              </>
            }
          />

        </div>
      </Container>
    </section>
  )
}
