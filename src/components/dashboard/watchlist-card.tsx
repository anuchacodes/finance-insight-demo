import { Plus } from "lucide-react";
import Link from "next/link";

import { CurrencyPairRow } from "@/components/finance/currency-pair-row";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { CurrencyPair } from "@/lib/types/finance";

type WatchlistCardProps = {
  items: CurrencyPair[];
};

export function WatchlistCard({ items }: WatchlistCardProps) {
  const t = useTranslations();
  return (
    <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
          {t.dashboard.watchlistTitle}
        </h2>
        <Button asChild aria-label={t.dashboard.addWatchlistItemAria} size="icon-sm" variant="ghost">
          <Link href="/watchlist">
            <Plus className="size-4 text-[#0058be]" />
          </Link>
        </Button>
      </div>

      {items.length ? (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <CurrencyPairRow key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-[#c2c6d6] bg-[#f7f9fb] px-4 py-5 text-center">
          <p className="text-sm font-medium text-[#191c1e]">{t.dashboard.noPinnedPairs}</p>
          <Button asChild className="mt-2 h-auto p-0" size="sm" variant="link">
            <Link href="/watchlist">{t.dashboard.manageWatchlistLink}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
