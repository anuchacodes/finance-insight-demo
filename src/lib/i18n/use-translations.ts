"use client";

import { dictionaries } from "@/lib/i18n/dictionaries";
import { useAppSettings } from "@/lib/settings/app-settings";

export function useTranslations() {
  const { language } = useAppSettings();

  return dictionaries[language] ?? dictionaries.en;
}
