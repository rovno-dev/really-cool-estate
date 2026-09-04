"use client";
import Link from "next/link";
import Logo from "@/components/layout/logo/logo";
import { Container } from "@/components/ui/container";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { NavLink } from "@/components/layout/nav/nav-link";
import { useLanguage } from "@/providers/language-provider";
import { useCity } from "@/providers/city-provider";

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <Link href="/" className="flex items-center">
            <Logo className="h-8 w-auto text-foreground" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {footerNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        {/* City links */}
        <div className="border-t border-border/50 py-6 mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            {t("header.city_label")}
          </p>
          <div className="flex flex-wrap gap-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/cities/${city.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {city.name.en}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © {year} Realty Pro. {new Date().getFullYear() === 2026 ? "All rights reserved." : "All rights reserved."}
          </p>
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
