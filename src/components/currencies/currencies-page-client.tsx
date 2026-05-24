"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { CurrencyFilter } from "@/components/currencies/currency-filter";
import {
  CurrencyTable,
  CurrencyTableSkeleton,
} from "@/components/currencies/currency-table";
import {
  filterCurrencyItems,
  getCurrencyPagination,
  getPreviousRateDate,
  paginateCurrencyItems,
  sortCurrencyItems,
  toCurrencyBaseOptions,
  toCurrencyListItems,
  toMostRecentRates,
  type CurrencySortKey,
} from "@/lib/adapters/currencies";
import { useCurrencies } from "@/lib/query/hooks/use-currencies";
import { useLatestRates } from "@/lib/query/hooks/use-exchange-rates";
import { useHistoricalRates } from "@/lib/query/hooks/use-historical-rates";
import type { CurrencyCode } from "@/lib/types/finance";

const defaultBaseCurrency: CurrencyCode = "USD";
const pageSize = 10;
const sortSequence: CurrencySortKey[] = ["code", "name", "rate", "change"];

export function CurrenciesPageClient() {
  const [baseCurrency, setBaseCurrency] =
    useState<CurrencyCode>(defaultBaseCurrency);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<CurrencySortKey>("code");

  const currenciesQuery = useCurrencies();
  const latestRatesQuery = useLatestRates({ base: baseCurrency });

  const latestRates = useMemo(
    () => toMostRecentRates(latestRatesQuery.data),
    [latestRatesQuery.data],
  );
  const latestDate = latestRates[0]?.date;
  const previousRateDate = latestDate ? getPreviousRateDate(latestDate) : "";
  const previousRatesParams = useMemo(
    () => ({
      base: baseCurrency,
      from: previousRateDate,
      quotes: latestRates.map((rate) => rate.quote),
      to: previousRateDate,
    }),
    [baseCurrency, latestRates, previousRateDate],
  );
  const previousRatesQuery = useHistoricalRates(previousRatesParams, {
    enabled: Boolean(previousRateDate && latestRates.length),
  });

  const baseOptions = useMemo(
    () => toCurrencyBaseOptions(currenciesQuery.data),
    [currenciesQuery.data],
  );
  const currencyItems = useMemo(
    () =>
      toCurrencyListItems({
        baseCurrency,
        currencies: currenciesQuery.data ?? [],
        latestRates,
        previousRates: toMostRecentRates(previousRatesQuery.data),
      }),
    [baseCurrency, currenciesQuery.data, latestRates, previousRatesQuery.data],
  );
  const visibleItems = useMemo(() => {
    const filteredItems = filterCurrencyItems(currencyItems, search);

    return sortCurrencyItems(filteredItems, sortKey);
  }, [currencyItems, search, sortKey]);
  const paginatedItems = useMemo(
    () => paginateCurrencyItems(visibleItems, page, pageSize),
    [page, visibleItems],
  );
  const pagination = getCurrencyPagination(visibleItems.length, page, pageSize);

  const isLoading =
    currenciesQuery.isLoading ||
    latestRatesQuery.isLoading ||
    (Boolean(previousRateDate && latestRates.length) && previousRatesQuery.isLoading);
  const error =
    currenciesQuery.error ?? latestRatesQuery.error ?? previousRatesQuery.error;
  const isEmpty = !isLoading && !error && !visibleItems.length;

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleBaseCurrencyChange(value: CurrencyCode) {
    setBaseCurrency(value);
    setPage(1);
  }

  function handleSortChange() {
    setSortKey((currentKey) => {
      const currentIndex = sortSequence.indexOf(currentKey);
      const nextIndex = (currentIndex + 1) % sortSequence.length;

      return sortSequence[nextIndex];
    });
    setPage(1);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#191c1e]">
          All Currencies
        </h1>
        <CurrencyFilter
          baseCurrency={baseCurrency}
          baseOptions={baseOptions}
          search={search}
          sortKey={sortKey}
          onBaseCurrencyChange={handleBaseCurrencyChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />
      </div>

      {isLoading ? <CurrencyTableSkeleton /> : null}

      {error ? (
        <ErrorState
          description={
            error instanceof Error
              ? error.message
              : "The currency list could not be loaded."
          }
          title="Unable to load currencies"
          onRetry={() => {
            void currenciesQuery.refetch();
            void latestRatesQuery.refetch();
            void previousRatesQuery.refetch();
          }}
        />
      ) : null}

      {isEmpty ? (
        <EmptyState
          description="Try another search term or base currency."
          title="No currencies found"
        />
      ) : null}

      {!isLoading && !error && !isEmpty ? (
        <CurrencyTable
          currencies={paginatedItems}
          pagination={pagination}
          onNextPage={() => setPage((currentPage) => currentPage + 1)}
          onPreviousPage={() =>
            setPage((currentPage) => Math.max(1, currentPage - 1))
          }
        />
      ) : null}
    </div>
  );
}
