"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/providers/language-provider";

// Placeholder bank logos (simple colored circles with letters)
// In production, replace these with actual bank logo assets (SVG/PNG)
const defaultBankLogos = [
  { name: "Alfa Bank", domain: "alfabank.ru" },
  { name: "Sber", domain: "sber.ru" },
  { name: "VTB", domain: "vtb.ru" },
];
interface MortgageCalculatorBannerProps {
  monthlyPayment?: string;
  onClick?: () => void;
  bankLogos?: React.ReactNode[];
  className?: string;
}

export function MortgageCalculatorBanner({
  monthlyPayment,
  onClick,
  bankLogos,
  className,
}: MortgageCalculatorBannerProps) {
  const { lang } = useLanguage();

  const payment = monthlyPayment || (lang === "ru" ? "от 112 978 ₽/мес." : "from 112,978 ₽/mo.");
  const title = lang === "ru" ? "Рассчитать ипотеку" : "Calculate mortgage";

  const logos = bankLogos || defaultBankLogos.map((bank) => (
    <img
      key={bank.name}
      src={`https://unavatar.io/domain/${bank.domain}`}
      alt={bank.name}
      className="size-9 rounded-full bg-white object-contain"
    />
  ));

  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center justify-between rounded-2xl border border-border bg-muted/50 px-4 py-3 text-left transition-all duration-200 hover:bg-muted hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col">
        <span className="text-[1rem] font-semibold text-foreground">{title}</span>
        <span className="mt-1 flex items-center gap-1 text-body-5 text-muted-foreground">
          {payment}
          <CaretRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <div className="flex shrink-0 -space-x-3 group-hover:space-x-1 transition-space duration-200">
        {logos}
      </div>
    </button>
  );
}
