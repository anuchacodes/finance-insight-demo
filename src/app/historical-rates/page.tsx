import { HistoricalRatesPageClient } from "@/components/historical-rates/historical-rates-page-client";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function HistoricalRatesPage() {
  return (
    <DashboardLayout>
      <HistoricalRatesPageClient />
    </DashboardLayout>
  );
}
