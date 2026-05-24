"use client";

import { useEffect } from "react";

import {
  settingsChangeEvent,
  type ThemeMode,
} from "@/lib/adapters/settings";
import { loadAppSettings } from "@/lib/settings/app-settings";

function readThemeMode(): ThemeMode {
  return loadAppSettings().themeMode;
}

function applyTheme(themeMode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = themeMode === "dark" || (themeMode === "system" && prefersDark);

  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => applyTheme(readThemeMode());

    syncTheme();
    window.addEventListener(settingsChangeEvent, syncTheme);
    mediaQuery.addEventListener("change", syncTheme);

    return () => {
      window.removeEventListener(settingsChangeEvent, syncTheme);
      mediaQuery.removeEventListener("change", syncTheme);
    };
  }, []);

  return children;
}
