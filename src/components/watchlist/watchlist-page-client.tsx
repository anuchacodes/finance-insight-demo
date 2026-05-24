"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WatchlistCardGrid } from "@/components/watchlist/watchlist-card-grid";
import {
  defaultWatchlistBase,
  getFirstAvailableQuote,
  getWatchlistStartDate,
  toWatchlistPairs,
  toWatchlistQuoteOptions,
} from "@/lib/adapters/watchlist";
import { useCurrencies } from "@/lib/query/hooks/use-currencies";
import { useLatestRates } from "@/lib/query/hooks/use-exchange-rates";
import { useHistoricalRates } from "@/lib/query/hooks/use-historical-rates";
import type { CurrencyCode } from "@/lib/types/finance";
import {
  addWatchlistQuote,
  removeWatchlistQuote,
  useWatchlistQuotes,
} from "@/lib/watchlist/watchlist-store";

export function WatchlistPageClient() {
  const [selectedQuoteOverride, setSelectedQuoteOverride] =
    useState<CurrencyCode>("");
  const watchlistQuotes = useWatchlistQuotes();

  const currenciesQuery = useCurrencies();
  const quoteOptions = useMemo(
    () => toWatchlistQuoteOptions(currenciesQuery.data, defaultWatchlistBase),
    [currenciesQuery.data],
  );
  const addableQuoteOptions = useMemo(
    () =>
      quoteOptions.filter((option) => !watchlistQuotes.includes(option.code)),
    [quoteOptions, watchlistQuotes],
  );
  const selectedQuote = useMemo(
    () =>
      addableQuoteOptions.some((option) => option.code === selectedQuoteOverride)
        ? selectedQuoteOverride
        : (addableQuoteOptions[0]?.code ?? ""),
    [addableQuoteOptions, selectedQuoteOverride],
  );

  const latestRatesQuery = useLatestRates(
    {
      base: defaultWatchlistBase,
      quotes: watchlistQuotes,
    },
    {
      enabled: Boolean(watchlistQuotes.length),
    },
  );
  const historicalRatesQuery = useHistoricalRates(
    {
      base: defaultWatchlistBase,
      from: getWatchlistStartDate(),
      quotes: watchlistQuotes,
    },
    {
      enabled: Boolean(watchlistQuotes.length),
    },
  );
  const pairs = useMemo(
    () =>
      toWatchlistPairs({
        base: defaultWatchlistBase,
        currencies: currenciesQuery.data ?? [],
        historicalRates: historicalRatesQuery.data ?? [],
        latestRates: latestRatesQuery.data ?? [],
        quotes: watchlistQuotes,
      }),
    [
      currenciesQuery.data,
      historicalRatesQuery.data,
      latestRatesQuery.data,
      watchlistQuotes,
    ],
  );
  const isLoading =
    currenciesQuery.isLoading ||
    latestRatesQuery.isLoading ||
    historicalRatesQuery.isLoading;
  const error =
    currenciesQuery.error ?? latestRatesQuery.error ?? historicalRatesQuery.error;
  const isEmpty = !isLoading && !error && !pairs.length;

  function handleAddPair() {
    if (!selectedQuote || watchlistQuotes.includes(selectedQuote)) {
      return;
    }

    const nextQuotes = addWatchlistQuote(selectedQuote);
    setSelectedQuoteOverride(getFirstAvailableQuote(quoteOptions, nextQuotes));
  }

  function handleRemovePair(quote: CurrencyCode) {
    const nextQuotes = removeWatchlistQuote(quote);

    setSelectedQuoteOverride((currentQuote) =>
      currentQuote === quote
        ? getFirstAvailableQuote(quoteOptions, nextQuotes)
        : currentQuote,
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
            My Watchlist
          </h1>
          <p className="mt-3 text-lg text-[#424754]">
            Monitor your pinned currency pairs and spot trends.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-[320px] sm:flex-row">
          <Select
            value={selectedQuote}
            onValueChange={setSelectedQuoteOverride}
            disabled={!addableQuoteOptions.length}
          >
            <SelectTrigger className="h-11 border-[#c2c6d6] bg-white shadow-none sm:flex-1">
              <SelectValue placeholder="Select quote" />
            </SelectTrigger>
            <SelectContent>
              {addableQuoteOptions.map((option) => (
                <SelectItem key={option.code} value={option.code}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="h-11 gap-2 px-4"
            disabled={!addableQuoteOptions.length}
            onClick={handleAddPair}
          >
            <Plus className="size-4" />
            Add Pair
          </Button>
        </div>
      </header>

      {isLoading ? <WatchlistSkeletonGrid /> : null}

      {error ? (
        <ErrorState
          description={
            error instanceof Error
              ? error.message
              : "The watchlist feed could not be loaded."
          }
          title="Unable to load watchlist"
          onRetry={() => {
            void currenciesQuery.refetch();
            void latestRatesQuery.refetch();
            void historicalRatesQuery.refetch();
          }}
        />
      ) : null}

      {isEmpty ? (
        <EmptyState
          description="Add a currency pair to start monitoring rates."
          title="No watchlist pairs"
        />
      ) : null}

      {!isLoading && !error && !isEmpty ? (
        <WatchlistCardGrid pairs={pairs} onRemove={handleRemovePair} />
      ) : null}
    </div>
  );
}

function WatchlistSkeletonGrid() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[300px] animate-pulse rounded-lg border border-[#c2c6d6] bg-white"
        />
      ))}
    </section>
  );
}
