import { CurrenciesPageClient } from "@/components/currencies/currencies-page-client";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function CurrencyPage() {
  return (
    <DashboardLayout>
      <CurrenciesPageClient />
    </DashboardLayout>
  );
}
