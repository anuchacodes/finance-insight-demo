import { History } from "lucide-react";

import { formatRate } from "@/lib/formatters/currency";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { RecentConversion } from "@/lib/adapters/converter";

type RecentConversionsCardProps = {
  conversions: RecentConversion[];
};

export function RecentConversionsCard({
  conversions,
}: RecentConversionsCardProps) {
  const t = useTranslations();
  return (
    <section className="rounded-lg border border-[#c2c6d6] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-[#191c1e]">
        {t.converter.recentTitle}
      </h2>

      <div className="divide-y divide-[#e0e3e5]">
        {conversions.length ? (
          conversions.map((conversion) => (
          <article
            key={conversion.id}
            className="flex flex-col gap-3 rounded-lg px-2 py-4 transition-colors hover:bg-[#f7f9fb] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f6] text-[#727785]">
                <History className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-mono text-sm font-medium text-[#191c1e]">
                  {formatRate(conversion.inputAmount, 2)} {conversion.from} →{" "}
                  {conversion.to}
                </p>
                <p className="mt-1 font-mono text-xs text-[#727785]">
                  {conversion.timestamp}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="font-mono text-sm font-medium text-[#191c1e]">
                {formatRate(conversion.convertedAmount, 2)} {conversion.to}
              </p>
              <p className="mt-1 font-mono text-xs text-[#727785]">
                {t.converter.rateLabel} {formatRate(conversion.rate, 4)}
              </p>
            </div>
          </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-[#c2c6d6] bg-[#f7f9fb] p-6 text-center">
            <p className="text-sm font-semibold text-[#191c1e]">
              {t.converter.noConversionsTitle}
            </p>
            <p className="mt-1 text-sm text-[#424754]">
              {t.converter.noConversionsDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
