"use client";

import { useState } from "react";

import { DailyRatesTable } from "@/components/historical-rates/daily-rates-table";
import { HistoricalRateChartCard } from "@/components/historical-rates/historical-rate-chart-card";
import { HistoricalRatesFilters } from "@/components/historical-rates/historical-rates-filters";
import { RangeToggle } from "@/components/historical-rates/range-toggle";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  dailyRates,
  historicalBaseOptions,
  historicalChartData,
  historicalQuoteOptions,
  historicalRanges,
  type HistoricalRange,
} from "@/lib/mock/historical-rates";
import type { CurrencyCode } from "@/lib/types/finance";

export default function HistoricalRatesPage() {
  const [selectedRange, setSelectedRange] = useState<HistoricalRange>("30D");
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>("USD");
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyCode>("EUR");
  const [dateRange, setDateRange] = useState("2023-09-01");

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
              Historical Analysis
            </h1>
            <p className="mt-3 text-lg text-[#424754]">
              Track performance trends over selected intervals.
            </p>
          </div>
          <RangeToggle
            ranges={historicalRanges}
            value={selectedRange}
            onValueChange={setSelectedRange}
          />
        </header>

        <HistoricalRatesFilters
          baseCurrency={baseCurrency}
          baseOptions={historicalBaseOptions}
          dateRange={dateRange}
          quoteCurrency={quoteCurrency}
          quoteOptions={historicalQuoteOptions}
          onBaseCurrencyChange={setBaseCurrency}
          onDateRangeChange={setDateRange}
          onQuoteCurrencyChange={setQuoteCurrency}
        />

        <HistoricalRateChartCard
          baseCurrency={baseCurrency}
          chartData={historicalChartData}
          quoteCurrency={quoteCurrency}
        />
        <DailyRatesTable rows={dailyRates} />
      </div>
    </DashboardLayout>
  );
}
