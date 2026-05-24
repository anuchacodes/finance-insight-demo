import { Plus } from "lucide-react";

import { CurrencyPairRow } from "@/components/finance/currency-pair-row";
import { Button } from "@/components/ui/button";
import type { CurrencyPair } from "@/lib/types/finance";

type WatchlistCardProps = {
  items: CurrencyPair[];
};

export function WatchlistCard({ items }: WatchlistCardProps) {
  return (
    <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
          Watchlist
        </h2>
        <Button aria-label="Add watchlist item" size="icon-sm" variant="ghost">
          <Plus className="size-4 text-[#0058be]" />
        </Button>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <CurrencyPairRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
