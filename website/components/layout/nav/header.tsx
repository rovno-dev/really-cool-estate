"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/logo/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CitySwitcher } from "@/components/real-estate/city-switcher";
import { useLanguage } from "@/providers/language-provider";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, t } = useLanguage();
  const navItems = useMemo(
    () => [
      { label: t("nav.home"), href: "/" },
      { label: t("nav.properties"), href: "/search" },
      { label: t("nav.mortgage"), href: "/mortgage" },
    ],
    [lang, t]
  );
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
    return () => {
      document.body.style.overflowY = "";
    };
  }, [isMobileMenuOpen]);
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };
  return (
    <>
      {/* Header - fixed to always stay on top */}
      <header className="fixed top-0 left-0 right-0 z-[999] bg-bg/40 backdrop-blur-lg">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo className="h-auto w-[8rem]! md:w-[10rem]! xl:w-[12rem]!" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-4 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <CitySwitcher className="hidden sm:flex" />
            <LanguageSwitcher className="hidden sm:flex" />
            <RequestDialog>
              <Button
                size="small"
                shape="round"
                className="hidden sm:flex bg-primary text-primary-foreground"
              >
                {t("nav.make_request")}
              </Button>
            </RequestDialog>
            <Button
              variant="text"
              size="icon-medium"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="size-6!" />
              ) : (
                <ListIcon className="size-6!" />
              )}
            </Button>
          </div>
        </Container>
      </header>
      {/* Spacer to offset fixed header height */}
      <div className="h-16" aria-hidden="true" />
      {/* Mobile Menu Sheet - starts below header, close button hidden */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full! max-w-[360px] !top-16 !h-[calc(100vh-64px)] !border-r border-border/40 shadow-xl z-[998]"
        >
          <div className="flex h-full flex-col py-6 px-5">
            <div className="flex flex-col items-start gap-2 mb-6">
              <CitySwitcher className="flex sm:hidden" />
              <LanguageSwitcher className="flex sm:hidden" />
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-body-2 transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-primary/5 font-medium"
                      : "text-foreground/80 hover:bg-muted/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8">
              <RequestDialog>
                <Button
                  size="large"
                  shape="round"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.make_request")}
                </Button>
              </RequestDialog>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
