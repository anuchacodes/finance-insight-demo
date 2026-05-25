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

function readLanguage() {
  return loadAppSettings().language;
}

function applyTheme(themeMode: ThemeMode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = themeMode === "dark" || (themeMode === "system" && prefersDark);

  document.documentElement.classList.toggle("dark", shouldUseDark);
  document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
}

function applyLanguage(language: string) {
  document.documentElement.lang = language;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSettings = () => {
      applyTheme(readThemeMode());
      applyLanguage(readLanguage());
    };

    syncSettings();
    window.addEventListener(settingsChangeEvent, syncSettings);
    mediaQuery.addEventListener("change", syncSettings);

    return () => {
      window.removeEventListener(settingsChangeEvent, syncSettings);
      mediaQuery.removeEventListener("change", syncSettings);
    };
  }, []);

  return children;
}
