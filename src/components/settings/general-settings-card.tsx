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
  SettingsOption,
  ThemeMode,
} from "@/lib/adapters/settings";
import type { CurrencyCode, CurrencyOption } from "@/lib/types/finance";
import { cn } from "@/lib/utils";

type GeneralSettingsCardProps = {
  currencyOptions: CurrencyOption[];
  onBaseCurrencyChange: (value: CurrencyCode) => void;
  onRefreshIntervalChange: (value: string) => void;
  onThemeModeChange: (value: ThemeMode) => void;
  refreshOptions: SettingsOption[];
  settings: AppSettings;
};

const themeOptions = [
  { icon: Sun, label: "Light", value: "light" },
  { icon: Moon, label: "Dark", value: "dark" },
  { icon: Monitor, label: "System", value: "system" },
];

export function GeneralSettingsCard({
  currencyOptions,
  onBaseCurrencyChange,
  onRefreshIntervalChange,
  onThemeModeChange,
  refreshOptions,
  settings,
}: GeneralSettingsCardProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="border-b border-[#e0e3e5] p-5">
        <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
          General Settings
        </h2>
        <p className="mt-1 text-sm text-[#424754]">
          Configure your default workspace environment.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-[#e0e3e5] p-5">
        <SettingRow
          description="Used for initial dashboard loads and conversions."
          title="Default Base Currency"
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
          description="Select your preferred visual appearance."
          title="Theme Mode"
        >
          <div className="inline-flex rounded-lg border border-[#c2c6d6] bg-[#f2f4f6] p-1">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = option.value === settings.themeMode;

              return (
                <Button
                  key={option.value}
                  className={cn(
                    "h-9 gap-2 rounded-md border border-transparent px-3 shadow-none",
                    isActive
                      ? "border-[#c2c6d6] bg-white text-[#0058be] hover:bg-white"
                      : "bg-transparent text-[#424754] hover:bg-white/70",
                  )}
                  variant="ghost"
                  onClick={() => onThemeModeChange(option.value as ThemeMode)}
                >
                  <Icon className="size-4" />
                  {option.label}
                </Button>
              );
            })}
          </div>
        </SettingRow>

        <SettingRow
          description="How often live rates are updated."
          title="Auto-refresh Interval"
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
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>
      </div>
    </section>
  );
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
