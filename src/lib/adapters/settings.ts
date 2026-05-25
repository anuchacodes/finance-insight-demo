import type { CurrencyCode, CurrencyOption } from "@/lib/types/finance";
import type { FrankfurterCurrency } from "@/services/frankfurter-service";

export type SettingsTab = {
  id: string;
  label: string;
  labelKey: "general";
};

export type SettingsOption = {
  label: string;
  value: string;
};

export type ThemeMode = "dark" | "light" | "system";
export type Language = "en" | "th";

export type AppSettings = {
  baseCurrency: CurrencyCode;
  language: Language;
  refreshInterval: string;
  themeMode: ThemeMode;
};

export const settingsStorageKey = "finance-insight-settings";
export const settingsChangeEvent = "finance-insight-settings-change";

export const settingsTabs: SettingsTab[] = [
  { id: "general", label: "General", labelKey: "general" },
];

export const defaultSettings: AppSettings = {
  baseCurrency: "USD",
  language: "en",
  refreshInterval: "60",
  themeMode: "light",
};

export const languageOptions: SettingsOption[] = [
  { label: "English", value: "en" },
  { label: "ไทย", value: "th" },
];

export const refreshIntervalOptions: SettingsOption[] = [
  { label: "Manual (Off)", value: "0" },
  { label: "Every 30 seconds", value: "30" },
  { label: "Every 1 minute", value: "60" },
  { label: "Every 5 minutes", value: "300" },
];

export function toSettingsCurrencyOptions(
  currencies: FrankfurterCurrency[] = [],
) {
  return currencies.map<CurrencyOption>((currency) => ({
    code: currency.iso_code,
    label: `${currency.iso_code} - ${currency.name}`,
  }));
}

export function normalizeSettings(
  settings: Partial<AppSettings>,
  currencyOptions: CurrencyOption[],
): AppSettings {
  const fallbackCurrency =
    currencyOptions.find((option) => option.code === defaultSettings.baseCurrency)
      ?.code ??
    currencyOptions[0]?.code ??
    defaultSettings.baseCurrency;
  const candidateBaseCurrency = settings.baseCurrency;
  const baseCurrency = currencyOptions.some(
    (option) => option.code === settings.baseCurrency,
  )
    ? candidateBaseCurrency
    : fallbackCurrency;

  return {
    baseCurrency: baseCurrency ?? fallbackCurrency,
    language:
      settings.language === "en" || settings.language === "th"
        ? settings.language
        : defaultSettings.language,
    refreshInterval:
      refreshIntervalOptions.find(
        (option) => option.value === settings.refreshInterval,
      )?.value ?? defaultSettings.refreshInterval,
    themeMode:
      settings.themeMode === "dark" ||
      settings.themeMode === "light" ||
      settings.themeMode === "system"
        ? settings.themeMode
        : defaultSettings.themeMode,
  };
}
