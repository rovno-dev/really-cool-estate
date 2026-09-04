"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo/logo";
import { Container } from "@/components/ui/container";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { NavLink } from "@/components/layout/nav/nav-link";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";
import { MapPinIcon } from "@phosphor-icons/react";

export function Footer() {
  const { t } = useLanguage();
  const { cities } = useCity();
  const year = new Date().getFullYear();

  const footerNavItems = [
    { label: t("footer.properties"), href: "/search" },
    { label: t("footer.mortgage"), href: "/mortgage" },
    { label: t("footer.about"), href: "/about" },
    { label: t("footer.contact"), href: "/contacts" },
    { label: t("footer.news"), href: "/news" },
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
  ];

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-lg">
      <Container className="py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <Link href="/" className="flex items-center">
            <Logo className="h-8 w-auto text-foreground" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Main nav grid */}
        <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4 mb-10">
          {footerNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="group relative inline-flex w-fit text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        {/* City links */}
        <div className="border-t border-border/50 pt-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <MapPinIcon className="size-4 text-primary" weight="fill" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {t("header.city_label")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
              >
                <MapPinIcon className="size-3.5 text-primary/60" />
                {city.name.en}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © {year} Realty Pro. All rights reserved.
          </p>
          <Link href={'https://amorfa.unidoka.com'}>
            <img src="/made-on-amorfa-badge-v0.svg" alt="amorfa-badge" />
          </Link>
          <p className="text-xs text-muted-foreground">
            Made with <span className="text-primary">♥</span> in{" "}
            <a href="https://rovno.dev" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Rovno.dev
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
