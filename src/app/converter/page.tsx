import { ConverterFormCard } from "@/components/converter/converter-form-card";
import { RecentConversionsCard } from "@/components/converter/recent-conversions-card";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  converterCurrencyOptions,
  defaultConversionQuote,
  recentConversions,
} from "@/lib/mock/converter";

export default function ConverterPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="mb-2">
          <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
            Currency Converter
          </h1>
          <p className="mt-3 text-base text-[#424754]">
            Real-time exchange rates and historical conversion data.
          </p>
        </header>

        <ConverterFormCard
          currencyOptions={converterCurrencyOptions}
          quote={defaultConversionQuote}
        />
        <RecentConversionsCard conversions={recentConversions} />
      </div>
    </DashboardLayout>
  );
}
