"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { saveAppSettings, useAppSettings } from "@/lib/settings/app-settings";

export function Topbar() {
  const appSettings = useAppSettings();
  const isDarkMode = appSettings.themeMode === "dark";
  const ThemeIcon = isDarkMode ? Sun : Moon;

  function handleThemeToggle() {
    saveAppSettings({
      ...appSettings,
      themeMode: isDarkMode ? "light" : "dark",
    });
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#c2c6d6] bg-[#f7f9fb]/95 px-4 backdrop-blur md:px-8">
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
  );
}
