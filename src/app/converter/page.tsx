import { ConverterPageClient } from "@/components/converter/converter-page-client";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function ConverterPage() {
  return (
    <DashboardLayout>
      <ConverterPageClient />
    </DashboardLayout>
  );
}
