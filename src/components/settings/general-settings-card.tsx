"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  AppSettings,
  Language,
  SettingsOption,
  ThemeMode,
} from "@/lib/adapters/settings";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { CurrencyCode, CurrencyOption } from "@/lib/types/finance";
import { cn } from "@/lib/utils";

type GeneralSettingsCardProps = {
  currencyOptions: CurrencyOption[];
  languageOptions: SettingsOption[];
  onBaseCurrencyChange: (value: CurrencyCode) => void;
  onLanguageChange: (value: Language) => void;
  onRefreshIntervalChange: (value: string) => void;
  onThemeModeChange: (value: ThemeMode) => void;
  refreshOptions: SettingsOption[];
  settings: AppSettings;
};

const themeOptions = [
  { icon: Sun, labelKey: "light", value: "light" },
  { icon: Moon, labelKey: "dark", value: "dark" },
  { icon: Monitor, labelKey: "system", value: "system" },
] as const;

export function GeneralSettingsCard({
  currencyOptions,
  languageOptions,
  onBaseCurrencyChange,
  onLanguageChange,
  onRefreshIntervalChange,
  onThemeModeChange,
  refreshOptions,
  settings,
}: GeneralSettingsCardProps) {
  const t = useTranslations();

  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="border-b border-[#e0e3e5] p-5">
        <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
          {t.settings.cardTitle}
        </h2>
        <p className="mt-1 text-sm text-[#424754]">
          {t.settings.cardDescription}
        </p>
      </div>

      <div className="flex flex-col divide-y divide-[#e0e3e5] p-5">
        <SettingRow
          description={t.settings.baseCurrencyDescription}
          title={t.settings.baseCurrencyTitle}
        >
          <Select
            value={settings.baseCurrency}
            onValueChange={onBaseCurrencyChange}
          >
            <SelectTrigger className="h-11 w-full border-[#c2c6d6] bg-[#f7f9fb] shadow-none sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencyOptions.map((option) => (
                <SelectItem key={option.code} value={option.code}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>

        <SettingRow
          description={t.settings.languageDescription}
          title={t.settings.languageTitle}
        >
          <Select
            value={settings.language}
            onValueChange={(value) => onLanguageChange(value as Language)}
          >
            <SelectTrigger className="h-11 w-full border-[#c2c6d6] bg-[#f7f9fb] shadow-none sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>

        <SettingRow
          description={t.settings.themeDescription}
          title={t.settings.themeTitle}
        >
          <div className="grid w-full grid-cols-3 rounded-lg border border-[#c2c6d6] bg-[#f2f4f6] p-1 sm:inline-grid sm:w-auto">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = option.value === settings.themeMode;

              return (
                <Button
                  key={option.value}
                  className={cn(
                    "h-9 min-w-0 gap-1 rounded-md border border-transparent px-2 shadow-none sm:gap-2 sm:px-3",
                    isActive
                      ? "border-[#c2c6d6] bg-white text-[#0058be] hover:bg-white"
                      : "bg-transparent text-[#424754] hover:bg-white/70",
                  )}
                  variant="ghost"
                  onClick={() => onThemeModeChange(option.value as ThemeMode)}
                >
                  <Icon className="size-4" />
                  {t.settingsOptions[option.labelKey]}
                </Button>
              );
            })}
          </div>
        </SettingRow>

        <SettingRow
          description={t.settings.autoRefreshDescription}
          title={t.settings.autoRefreshTitle}
        >
          <Select
            value={settings.refreshInterval}
            onValueChange={onRefreshIntervalChange}
          >
            <SelectTrigger className="h-11 w-full border-[#c2c6d6] bg-[#f7f9fb] shadow-none sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {refreshOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {getRefreshOptionLabel(option.value, t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>
      </div>
    </section>
  );
}

function getRefreshOptionLabel(
  value: string,
  t: ReturnType<typeof useTranslations>,
) {
  const labels = {
    "0": t.settingsOptions.manual,
    "30": t.settingsOptions.every30Seconds,
    "60": t.settingsOptions.everyMinute,
    "300": t.settingsOptions.every5Minutes,
  };

  return labels[value as keyof typeof labels] ?? value;
}

type SettingRowProps = {
  children: ReactNode;
  description: string;
  title: string;
};

function SettingRow({ children, description, title }: SettingRowProps) {
  return (
    <div className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-sm font-medium text-[#191c1e]">{title}</p>
        <p className="mt-1 text-sm text-[#424754]">{description}</p>
      </div>
      <div className="w-full sm:flex sm:w-auto sm:justify-end">{children}</div>
    </div>
  );
}
