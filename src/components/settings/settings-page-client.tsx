"use client";

import { useMemo, useState } from "react";

import { ErrorState } from "@/components/common/error-state";
import { GeneralSettingsCard } from "@/components/settings/general-settings-card";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  normalizeSettings,
  refreshIntervalOptions,
  settingsTabs,
  toSettingsCurrencyOptions,
  type AppSettings,
  type ThemeMode,
} from "@/lib/adapters/settings";
import { useCurrencies } from "@/lib/query/hooks/use-currencies";
import { loadAppSettings, saveAppSettings } from "@/lib/settings/app-settings";
import type { CurrencyCode } from "@/lib/types/finance";

export function SettingsPageClient() {
  const [savedSettings, setSavedSettings] = useState<AppSettings>(() =>
    loadAppSettings(),
  );
  const [settings, setSettings] = useState<AppSettings>(() =>
    loadAppSettings(),
  );
  const [isSaved, setIsSaved] = useState(false);
  const currenciesQuery = useCurrencies();
  const currencyOptions = useMemo(
    () => toSettingsCurrencyOptions(currenciesQuery.data),
    [currenciesQuery.data],
  );
  const normalizedSettings = useMemo(
    () => normalizeSettings(settings, currencyOptions),
    [currencyOptions, settings],
  );
  const normalizedSavedSettings = useMemo(
    () => normalizeSettings(savedSettings, currencyOptions),
    [currencyOptions, savedSettings],
  );
  const hasChanges =
    JSON.stringify(normalizedSettings) !==
    JSON.stringify(normalizedSavedSettings);

  function updateSettings(nextSettings: Partial<AppSettings>) {
    setIsSaved(false);
    setSettings((currentSettings) => ({
      ...currentSettings,
      ...nextSettings,
    }));
  }

  function handleSave() {
    const nextSettings = normalizeSettings(settings, currencyOptions);

    saveAppSettings(nextSettings);
    setSettings(nextSettings);
    setSavedSettings(nextSettings);
    setIsSaved(true);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
          Settings
        </h1>
        <p className="mt-3 text-lg text-[#424754]">
          Manage your account preferences and system configurations.
        </p>
      </header>

      <div className="flex flex-col gap-8 md:flex-row">
        <SettingsNav activeTab="general" tabs={settingsTabs} />

        <div className="flex flex-1 flex-col gap-6">
          {currenciesQuery.isLoading ? (
            <SettingsSkeleton />
          ) : (
            <GeneralSettingsCard
              currencyOptions={currencyOptions}
              refreshOptions={refreshIntervalOptions}
              settings={normalizedSettings}
              onBaseCurrencyChange={(baseCurrency: CurrencyCode) =>
                updateSettings({ baseCurrency })
              }
              onRefreshIntervalChange={(refreshInterval) =>
                updateSettings({ refreshInterval })
              }
              onThemeModeChange={(themeMode: ThemeMode) =>
                updateSettings({ themeMode })
              }
            />
          )}

          {currenciesQuery.error ? (
            <ErrorState
              description={
                currenciesQuery.error instanceof Error
                  ? currenciesQuery.error.message
                  : "Currency preferences could not be loaded."
              }
              title="Unable to load currency options"
              onRetry={() => {
                void currenciesQuery.refetch();
              }}
            />
          ) : null}

          <div className="flex items-center justify-end gap-3">
            {isSaved ? (
              <p className="text-sm font-medium text-[#00855b]">Saved</p>
            ) : null}
            <Button
              className="h-12 px-6"
              disabled={currenciesQuery.isLoading || !hasChanges}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="border-b border-[#e0e3e5] p-5">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="mt-2 h-4 w-72 max-w-full" />
      </div>
      <div className="flex flex-col gap-5 p-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-b border-[#e0e3e5] pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Skeleton className="h-5 w-44" />
              <Skeleton className="mt-2 h-4 w-64 max-w-full" />
            </div>
            <Skeleton className="h-11 w-full sm:w-64" />
          </div>
        ))}
      </div>
    </section>
  );
}
