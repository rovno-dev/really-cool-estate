"use client";
import { ScrollReveal } from "@/components/layout/animation/scroll-reveal";
import { PropertyGrid } from "@/components/real-estate/property-grid";
import { PropertySearch } from "@/components/real-estate/property-search";
import { Container } from "@/components/ui/container";
import { useCity } from "@/providers/city-provider";
import { useLanguage } from "@/providers/language-provider";
import { getPropertiesByCity } from "@/utils/constants/properties";
import CitiesGridSection from "./_components/cities-grid-section";
import CityStatsSection from "./_components/city-stats-section";
import CtaSection from "./_components/cta-section";
import FeaturesSection from "./_components/features-section";
import HeroSection from "./_components/hero-section";

export default function Home() {
  const { lang, t } = useLanguage();
  const { city } = useCity();

  const cityProperties = getPropertiesByCity(city.slug);

  return (
    <>
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-20 -mt-16 pb-10">
          <Container className="max-w-5xl">
            <PropertySearch heroImage="" />
          </Container>
        </section>
      </ScrollReveal>

      {/* FEATURES */}
      <ScrollReveal>
        <FeaturesSection />
      </ScrollReveal>

      {/* PROPERTIES */}
      <ScrollReveal>
        <div id="properties">
          <PropertyGrid
            properties={cityProperties.length > 0 ? cityProperties : getPropertiesByCity("moscow")}
            title={lang === "ru" ? `Новостройки в г. ${city.name.ru}` : `New Buildings in ${city.name.en}`}
            subtitle={lang === "ru" ? "Специальные условия для покупателей" : "Special conditions for buyers"}
            limit={8}
            showViewAll={true}
          />
        </div>
      </ScrollReveal>

      {/* <ScrollReveal>
        <CityStatsSection />
      </ScrollReveal> */}

      {/* CITIES GRID */}
      <ScrollReveal>
        <CitiesGridSection />
      </ScrollReveal>

      <ScrollReveal>
        <CtaSection />
      </ScrollReveal>
    </>
  )
}
