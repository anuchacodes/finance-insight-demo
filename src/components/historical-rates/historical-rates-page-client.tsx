"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { DailyRatesTable } from "@/components/historical-rates/daily-rates-table";
import { HistoricalRateChartCard } from "@/components/historical-rates/historical-rate-chart-card";
import { HistoricalRatesFilters } from "@/components/historical-rates/historical-rates-filters";
import { HistoricalRatesSkeleton } from "@/components/historical-rates/historical-rates-skeleton";
import { RangeToggle } from "@/components/historical-rates/range-toggle";
import {
  getFirstDifferentCurrency,
  getHistoricalStartDate,
  getTodayDate,
  historicalAnalysisRanges,
  toDailyRateRows,
  toHistoricalChartPoints,
  toHistoricalCurrencyOptions,
  type HistoricalAnalysisRange,
} from "@/lib/adapters/historical-rates";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useCurrencies } from "@/lib/query/hooks/use-currencies";
import { useHistoricalRates } from "@/lib/query/hooks/use-historical-rates";
import { useAppSettings } from "@/lib/settings/app-settings";
import type { CurrencyCode } from "@/lib/types/finance";

const defaultBaseCurrency: CurrencyCode = "USD";
const defaultQuoteCurrency: CurrencyCode = "EUR";

export function HistoricalRatesPageClient() {
  const appSettings = useAppSettings();
  const t = useTranslations();
  const [selectedRange, setSelectedRange] =
    useState<HistoricalAnalysisRange>("30D");
  const [baseCurrency, setBaseCurrency] =
    useState<CurrencyCode>(defaultBaseCurrency);
  const [quoteCurrency, setQuoteCurrency] =
    useState<CurrencyCode>(defaultQuoteCurrency);
  const [fromDate, setFromDate] = useState(() =>
    getHistoricalStartDate("30D"),
  );

  const currenciesQuery = useCurrencies();
  const currencyOptions = useMemo(
    () => toHistoricalCurrencyOptions(currenciesQuery.data),
    [currenciesQuery.data],
  );
  const quoteOptions = useMemo(
    () => currencyOptions.filter((option) => option.code !== baseCurrency),
    [baseCurrency, currencyOptions],
  );

  const historicalRatesQuery = useHistoricalRates({
    base: baseCurrency,
    from: fromDate,
    quotes: quoteCurrency ? [quoteCurrency] : [],
    to: getTodayDate(),
  });

  const chartData = useMemo(
    () => toHistoricalChartPoints(historicalRatesQuery.data, appSettings.language),
    [appSettings.language, historicalRatesQuery.data],
  );
  const dailyRows = useMemo(
    () => toDailyRateRows(historicalRatesQuery.data),
    [historicalRatesQuery.data],
  );
  const isLoading =
    currenciesQuery.isLoading || historicalRatesQuery.isLoading;
  const error = currenciesQuery.error ?? historicalRatesQuery.error;
  const isEmpty = !isLoading && !error && !chartData.length;

  function handleRangeChange(range: HistoricalAnalysisRange) {
    setSelectedRange(range);
    setFromDate(getHistoricalStartDate(range));
  }

  function handleBaseCurrencyChange(value: CurrencyCode) {
    setBaseCurrency(value);

    if (value === quoteCurrency) {
      setQuoteCurrency(getFirstDifferentCurrency(currencyOptions, value));
    }
  }

  function handleQuoteCurrencyChange(value: CurrencyCode) {
    if (value === baseCurrency) {
      return;
    }

    setQuoteCurrency(value);
  }

  function handleDateRangeChange(value: string) {
    setFromDate(value);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
            {t.historicalRates.pageTitle}
          </h1>
          <p className="mt-3 text-lg text-[#424754]">
            {t.historicalRates.pageDescription}
          </p>
        </div>
        <RangeToggle
          ranges={historicalAnalysisRanges}
          value={selectedRange}
          onValueChange={handleRangeChange}
        />
      </header>

      <HistoricalRatesFilters
        baseCurrency={baseCurrency}
        baseOptions={currencyOptions}
        dateRange={fromDate}
        quoteCurrency={quoteCurrency}
        quoteOptions={quoteOptions}
        onBaseCurrencyChange={handleBaseCurrencyChange}
        onDateRangeChange={handleDateRangeChange}
        onQuoteCurrencyChange={handleQuoteCurrencyChange}
      />

      {isLoading ? <HistoricalRatesSkeleton /> : null}

      {error ? (
        <ErrorState
          description={
            error instanceof Error
              ? error.message
              : t.historicalRates.errorDescription
          }
          title={t.historicalRates.errorTitle}
          onRetry={() => {
            void currenciesQuery.refetch();
            void historicalRatesQuery.refetch();
          }}
        />
      ) : null}

      {isEmpty ? (
        <EmptyState
          description={t.historicalRates.emptyDescription}
          title={t.historicalRates.emptyTitle}
        />
      ) : null}

      {!isLoading && !error && !isEmpty ? (
        <>
          <HistoricalRateChartCard
            baseCurrency={baseCurrency}
            chartData={chartData}
            quoteCurrency={quoteCurrency}
          />
          <DailyRatesTable
            baseCurrency={baseCurrency}
            quoteCurrency={quoteCurrency}
            rows={dailyRows}
          />
        </>
      ) : null}
    </div>
  );
}
