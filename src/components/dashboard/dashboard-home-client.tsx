"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { CurrencyConverter } from "@/components/dashboard/currency-converter";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { ExchangeRateTable } from "@/components/dashboard/exchange-rate-table";
import { HistoricalChart } from "@/components/dashboard/historical-chart";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { WatchlistCard } from "@/components/dashboard/watchlist-card";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getHistoricalRangeStartDate,
  getPreviousRateLookbackStartDate,
  getPreviousRateDate,
  toConverterDefaults,
  toCurrencyNameMap,
  toCurrencyOptions,
  toExchangeRates,
  toHistoricalRatePoints,
  toMostRecentRates,
  toOverviewMetrics,
  toRateChangeMap,
  toWatchlistItems,
} from "@/lib/adapters/dashboard";
import { useSingleRate } from "@/lib/query/hooks/use-converter";
import { useCurrencies } from "@/lib/query/hooks/use-currencies";
import { useLatestRates } from "@/lib/query/hooks/use-exchange-rates";
import { useHistoricalRates } from "@/lib/query/hooks/use-historical-rates";
import {
  getRefreshIntervalMs,
  useAppSettings,
} from "@/lib/settings/app-settings";
import type {
  CurrencyCode,
  CurrencyOption,
  HistoricalRange,
} from "@/lib/types/finance";
import { useWatchlistQuotes } from "@/lib/watchlist/watchlist-store";
import { useUiStateStore } from "@/store/ui-state-store";

const defaultConversionAmount = 1000;
const dashboardQuoteUniverse: CurrencyCode[] = [
  "EUR",
  "GBP",
  "JPY",
  "THB",
  "AUD",
  "CAD",
];

export function DashboardHomeClient() {
  const appSettings = useAppSettings();
  const watchlistQuotes = useWatchlistQuotes();
  const refreshInterval = getRefreshIntervalMs(appSettings);
  const [baseCurrencyOverride, setBaseCurrencyOverride] =
    useState<CurrencyCode | null>(null);
  const baseCurrency = baseCurrencyOverride ?? appSettings.baseCurrency;
  const [historicalRange, setHistoricalRange] =
    useState<HistoricalRange>("1M");
  const [converterPairOverride, setConverterPairOverride] = useState<{
    from: CurrencyCode;
    to: CurrencyCode;
  } | null>(null);
  const [converterAmount, setConverterAmount] = useState(defaultConversionAmount);
  const setEmpty = useUiStateStore((state) => state.setEmpty);
  const setError = useUiStateStore((state) => state.setError);
  const setLoading = useUiStateStore((state) => state.setLoading);

  const currenciesQuery = useCurrencies();
  const activeQuotes = useMemo(
    () =>
      Array.from(new Set([...dashboardQuoteUniverse, ...watchlistQuotes])).filter(
        (quote) => quote !== baseCurrency,
      ),
    [baseCurrency, watchlistQuotes],
  );
  const latestRatesQuery = useLatestRates(
    {
      base: baseCurrency,
      quotes: activeQuotes,
    },
    { refetchInterval: refreshInterval },
  );

  const currencyOptions = useMemo(
    () => toCurrencyOptions(currenciesQuery.data),
    [currenciesQuery.data],
  );
  const currencyNames = useMemo(
    () => toCurrencyNameMap(currenciesQuery.data),
    [currenciesQuery.data],
  );
  const latestRates = useMemo(
    () => toMostRecentRates(latestRatesQuery.data),
    [latestRatesQuery.data],
  );

  const primaryQuote = latestRates[0]?.quote ?? "";
  const converterPair = converterPairOverride ?? {
    from: baseCurrency,
    to: primaryQuote || activeQuotes[0] || baseCurrency,
  };
  const selectedPairRate = latestRates.find((rate) => rate.quote === primaryQuote);
  const converterFallbackRate = useMemo(() => {
    if (converterPair.from === baseCurrency) {
      return latestRates.find((rate) => rate.quote === converterPair.to);
    }

    if (converterPair.to === baseCurrency) {
      const inverseRate = latestRates.find(
        (rate) => rate.quote === converterPair.from,
      );

      return inverseRate
        ? {
            ...inverseRate,
            base: converterPair.from,
            quote: converterPair.to,
            rate: 1 / inverseRate.rate,
          }
        : undefined;
    }

    return undefined;
  }, [baseCurrency, converterPair.from, converterPair.to, latestRates]);
  const latestDate = latestRates[0]?.date;
  const previousRateDate = latestDate ? getPreviousRateDate(latestDate) : "";
  const previousRateStartDate = latestDate
    ? getPreviousRateLookbackStartDate(latestDate)
    : "";

  const previousRatesParams = useMemo(
    () => ({
      base: baseCurrency,
      from: previousRateStartDate,
      quotes: latestRates.map((rate) => rate.quote),
      to: previousRateDate,
    }),
    [baseCurrency, latestRates, previousRateDate, previousRateStartDate],
  );

  const previousRatesQuery = useHistoricalRates(previousRatesParams, {
    enabled: Boolean(previousRateStartDate && previousRateDate && latestRates.length),
  });

  const singleRateQuery = useSingleRate(converterPair.from, converterPair.to, {
    enabled: Boolean(
      converterPair.from && converterPair.to && converterPair.from !== converterPair.to,
    ),
    refetchInterval: refreshInterval,
  });

  const historicalParams = useMemo(
    () => ({
      base: baseCurrency,
      from: getHistoricalRangeStartDate(historicalRange),
      quotes: primaryQuote ? [primaryQuote] : [],
    }),
    [baseCurrency, historicalRange, primaryQuote],
  );

  const historicalRatesQuery = useHistoricalRates(historicalParams, {
    enabled: Boolean(primaryQuote),
  });

  const isLoading =
    currenciesQuery.isLoading ||
    latestRatesQuery.isLoading ||
    (Boolean(previousRateStartDate && previousRateDate && latestRates.length) &&
      previousRatesQuery.isLoading) ||
    (Boolean(primaryQuote) && historicalRatesQuery.isLoading);
  const error =
    currenciesQuery.error ??
    latestRatesQuery.error ??
    previousRatesQuery.error ??
    historicalRatesQuery.error;
  const isEmpty =
    !isLoading &&
    !error &&
    (!latestRates.length || !currencyOptions.length);

  useEffect(() => {
    setLoading("dashboard", isLoading);
    setError(
      "dashboard",
      error
        ? {
            description:
              error instanceof Error
                ? error.message
                : "The market feed could not be loaded.",
            title: "Unable to load dashboard data",
          }
        : undefined,
    );
    setEmpty(
      "dashboard",
      isEmpty
        ? {
            description:
              "Frankfurter did not return exchange rates for the current dashboard base.",
            title: "No dashboard data",
          }
        : undefined,
    );
  }, [error, isEmpty, isLoading, setEmpty, setError, setLoading]);

  const handleBaseCurrencyChange = useCallback((nextBase: CurrencyCode) => {
    setBaseCurrencyOverride(nextBase);
    setConverterPairOverride({
      from: nextBase,
      to: dashboardQuoteUniverse.find((quote) => quote !== nextBase) ?? nextBase,
    });
  }, []);

  const handleConverterPairChange = useCallback(
    (pair: { from: CurrencyCode; to: CurrencyCode }) => {
      setConverterPairOverride((currentPair) => {
        if (
          currentPair?.from === pair.from &&
          currentPair?.to === pair.to
        ) {
          return currentPair;
        }

        return pair;
      });
    },
    [],
  );

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        stateKey="dashboard"
        onRetry={() => {
          void currenciesQuery.refetch();
          void latestRatesQuery.refetch();
          void previousRatesQuery.refetch();
          void historicalRatesQuery.refetch();
        }}
      />
    );
  }

  if (isEmpty) {
    return <EmptyState stateKey="dashboard" />;
  }

  const rateChanges = toRateChangeMap(
    latestRates,
    toMostRecentRates(previousRatesQuery.data),
  );
  const overviewMetrics = toOverviewMetrics({
    baseCurrency,
    currencies: currenciesQuery.data ?? [],
    latestRates,
    rateChanges,
  });
  const historicalRates = toHistoricalRatePoints(
    historicalRatesQuery.data?.length
      ? historicalRatesQuery.data
      : selectedPairRate
        ? [selectedPairRate]
        : [],
  );
  const exchangeRates = toExchangeRates(latestRates, currencyNames, rateChanges);
  const watchlistItems = toWatchlistItems(
    latestRates,
    currencyNames,
    rateChanges,
    watchlistQuotes.filter((quote) => quote !== baseCurrency).slice(0, 3),
  );
  const converterDefaults = toConverterDefaults({
    amount: converterAmount,
    currencyOptions,
    fallbackRate: converterFallbackRate ?? selectedPairRate,
    from: converterPair.from,
    quoteRate: singleRateQuery.data,
    to: converterPair.to,
  });

  return (
    <div className="flex flex-col gap-6">
      <DashboardControls
        baseCurrency={baseCurrency}
        currencyOptions={currencyOptions}
        onBaseCurrencyChange={handleBaseCurrencyChange}
      />
      <OverviewCards metrics={overviewMetrics} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <HistoricalChart
            base={baseCurrency}
            data={historicalRates}
            selectedRange={historicalRange}
            quote={primaryQuote}
            onRangeChange={setHistoricalRange}
          />
        </div>
        <div className="flex flex-col gap-6">
          <CurrencyConverter
            defaults={converterDefaults}
            isRateLoading={singleRateQuery.isFetching}
            onAmountChange={setConverterAmount}
            onCurrencyPairChange={handleConverterPairChange}
          />
          <WatchlistCard items={watchlistItems} />
        </div>
      </div>

      <ExchangeRateTable rates={exchangeRates} />
    </div>
  );
}

type DashboardControlsProps = {
  baseCurrency: CurrencyCode;
  currencyOptions: CurrencyOption[];
  onBaseCurrencyChange: (value: CurrencyCode) => void;
};

function DashboardControls({
  baseCurrency,
  currencyOptions,
  onBaseCurrencyChange,
}: DashboardControlsProps) {
  return (
    <section className="flex flex-col gap-3 rounded-lg border border-[#e0e3e5] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#191c1e]">Dashboard base</p>
        <p className="text-sm text-[#424754]">
          Rates, trends, chart, and converter defaults follow this currency.
        </p>
      </div>
      <Select value={baseCurrency} onValueChange={onBaseCurrencyChange}>
        <SelectTrigger className="h-11 w-full border-[#c2c6d6] bg-[#f7f9fb] text-[#191c1e] shadow-none sm:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencyOptions.map((option) => (
            <SelectItem key={option.code} value={option.code}>
              {option.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  );
}
