import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CurrencyConverter } from "@/components/dashboard/currency-converter";
import { ExchangeRateTable } from "@/components/dashboard/exchange-rate-table";
import { HistoricalChart } from "@/components/dashboard/historical-chart";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { WatchlistCard } from "@/components/dashboard/watchlist-card";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  converterDefaults,
  exchangeRates,
  historicalRates,
  overviewMetrics,
  watchlistItems,
} from "@/lib/mock/dashboard-data";

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="flex flex-col gap-6">
        <OverviewCards metrics={overviewMetrics} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <HistoricalChart data={historicalRates} />
          </div>
          <div className="flex flex-col gap-6">
            <CurrencyConverter defaults={converterDefaults} />
            <WatchlistCard items={watchlistItems} />
          </div>
        </div>

        <ExchangeRateTable rates={exchangeRates} />
      </div>
    </DashboardLayout>
  );
}
