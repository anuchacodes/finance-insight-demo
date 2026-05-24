"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import { dashboardNavigation } from "@/components/layouts/navigation";
import { Button } from "@/components/ui/button";
import { saveAppSettings, useAppSettings } from "@/lib/settings/app-settings";
import { cn } from "@/lib/utils";

export function Topbar() {
  const appSettings = useAppSettings();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDarkMode = appSettings.themeMode === "dark";
  const ThemeIcon = isDarkMode ? Sun : Moon;

  function handleThemeToggle() {
    saveAppSettings({
      ...appSettings,
      themeMode: isDarkMode ? "light" : "dark",
    });
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#c2c6d6] bg-[#f7f9fb]/95 px-4 backdrop-blur md:gap-4 md:px-8">
        <Button
          aria-label="Open navigation menu"
          className="md:hidden"
          size="icon"
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="size-5" />
        </Button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-[#0058be] md:text-xl">
            Finance Insight Demo
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            size="icon"
            variant="ghost"
            onClick={handleThemeToggle}
          >
            <ThemeIcon className="size-5" />
          </Button>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close navigation menu"
            className="absolute inset-0 bg-[#191c1e]/45"
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative flex h-full w-[min(82vw,320px)] flex-col bg-[#2d3133] px-4 py-5 text-[#eff1f3] shadow-2xl">
            <div className="mb-7 flex items-start justify-between gap-4">
              <Link
                href="/"
                className="min-w-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <p className="truncate text-2xl font-bold tracking-tight text-white">
                  Finance Insight
                </p>
                <p className="mt-1 text-sm text-[#bec6e0]">SaaS Analytics</p>
              </Link>
              <Button
                aria-label="Close navigation menu"
                className="shrink-0 text-[#eff1f3] hover:bg-[#3f465c] hover:text-white"
                size="icon"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <nav className="flex flex-1 flex-col gap-2">
              {dashboardNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#d8dadc] transition-colors hover:bg-[#3f465c] hover:text-white",
                      isActive && "bg-[#3f465c] text-[#adc6ff]",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
