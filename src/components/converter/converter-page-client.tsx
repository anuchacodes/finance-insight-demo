"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";
import { ConverterFormCard } from "@/components/converter/converter-form-card";
import { RecentConversionsCard } from "@/components/converter/recent-conversions-card";
import {
  getFirstDifferentCurrency,
  toConversionQuote,
  toConverterCurrencyOptions,
  toRecentConversion,
  type RecentConversion,
} from "@/lib/adapters/converter";
import { useSingleRate } from "@/lib/query/hooks/use-converter";
import { useCurrencies } from "@/lib/query/hooks/use-currencies";
import type { CurrencyCode } from "@/lib/types/finance";

const defaultFromCurrency: CurrencyCode = "USD";
const defaultToCurrency: CurrencyCode = "EUR";

export function ConverterPageClient() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState<CurrencyCode>(defaultFromCurrency);
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>(
    [],
  );
  const [to, setTo] = useState<CurrencyCode>(defaultToCurrency);

  const currenciesQuery = useCurrencies();
  const currencyOptions = useMemo(
    () => toConverterCurrencyOptions(currenciesQuery.data),
    [currenciesQuery.data],
  );
  const rateQuery = useSingleRate(from, to, {
    enabled: Boolean(from && to && from !== to),
  });
  const numericAmount = Number(amount.replaceAll(",", "")) || 0;
  const quote = toConversionQuote({
    amount: numericAmount,
    from,
    rate: rateQuery.data,
    to,
  });
  const isLoading = currenciesQuery.isLoading;
  const error = currenciesQuery.error;
  const rateError = rateQuery.error;
  const isEmpty = !isLoading && !error && !currencyOptions.length;

  function handleFromChange(value: CurrencyCode) {
    setFrom(value);

    if (value === to) {
      setTo(getFirstDifferentCurrency(currencyOptions, value));
    }
  }

  function handleToChange(value: CurrencyCode) {
    setTo(value);

    if (value === from) {
      setFrom(getFirstDifferentCurrency(currencyOptions, value));
    }
  }

  function handleSwap() {
    setFrom(to);
    setTo(from);
  }

  function handleConvert() {
    setRecentConversions((currentConversions) => [
      toRecentConversion(quote),
      ...currentConversions,
    ].slice(0, 5));
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <ConverterHeader />
        <div className="h-[420px] animate-pulse rounded-lg border border-[#c2c6d6] bg-white" />
        <div className="h-[240px] animate-pulse rounded-lg border border-[#c2c6d6] bg-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <ConverterHeader />
        <ErrorState
          description={
            error instanceof Error
              ? error.message
              : "The currency list could not be loaded."
          }
          title="Unable to load converter"
          onRetry={() => {
            void currenciesQuery.refetch();
          }}
        />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <ConverterHeader />
        <EmptyState
          description="Frankfurter did not return currencies for the converter."
          title="No currencies available"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <ConverterHeader />

      {rateError ? (
        <ErrorState
          description={
            rateError instanceof Error
              ? rateError.message
              : "The conversion rate could not be loaded."
          }
          title="Unable to load conversion rate"
          onRetry={() => {
            void rateQuery.refetch();
          }}
        />
      ) : null}

      <ConverterFormCard
        amount={amount}
        currencyOptions={currencyOptions}
        isRateLoading={rateQuery.isFetching}
        quote={quote}
        onAmountChange={setAmount}
        onConvert={handleConvert}
        onFromChange={handleFromChange}
        onSwap={handleSwap}
        onToChange={handleToChange}
      />
      <RecentConversionsCard conversions={recentConversions} />
    </div>
  );
}

function ConverterHeader() {
  return (
    <header className="mb-2">
      <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
        Currency Converter
      </h1>
      <p className="mt-3 text-base text-[#424754]">
        Real-time exchange rates and historical conversion data.
      </p>
    </header>
  );
}
