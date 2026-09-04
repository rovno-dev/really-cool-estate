"use client"
import { useTheme } from "@/providers/theme-provider"
import { MonitorIcon, SunIcon, MoonIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const options = [
    { value: "system", icon: MonitorIcon, label: "Системная" },
    { value: "light", icon: SunIcon, label: "Светлая" },
    { value: "dark", icon: MoonIcon, label: "Тёмная" },
  ] as const

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-(--outline) bg-(--card) p-0.5 w-fit h-9">
      {options.map((opt) => {
        const Icon = opt.icon
        const isActive = mounted && theme === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            aria-label={opt.label}
            className={cn(
              "relative flex size-8 items-center justify-center rounded-full transition-all duration-200 outline-none cursor-pointer",
              isActive
                ? "bg-(--on-bg-high) text-(--bg) shadow-sm"
                : "text-(--on-bg-medium) hover:bg-(--state-hover) hover:text-(--on-bg-high)"
            )}
          >
            <Icon className="size-4!" weight="bold" />
          </button>
        )
      })}
    </div>
  )
}
