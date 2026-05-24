import { Trash2, TrendingDown, TrendingUp } from "lucide-react";

import { WatchlistSparkline } from "@/components/watchlist/watchlist-sparkline";
import { Button } from "@/components/ui/button";
import { formatRate } from "@/lib/formatters/currency";
import { formatPercentage } from "@/lib/formatters/percentage";
import type { WatchlistPair } from "@/lib/adapters/watchlist";
import { cn } from "@/lib/utils";

type WatchlistPairCardProps = {
  onRemove: () => void;
  pair: WatchlistPair;
};

export function WatchlistPairCard({ onRemove, pair }: WatchlistPairCardProps) {
  const isDown = pair.direction === "down";
  const TrendIcon = isDown ? TrendingDown : TrendingUp;

  return (
    <article className="relative flex min-h-[300px] flex-col rounded-lg border border-[#c2c6d6] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <Button
        aria-label={`Remove ${pair.pair} from watchlist`}
        className="absolute right-4 top-4 text-[#0058be] hover:text-[#727785]"
        size="icon-sm"
        variant="ghost"
        onClick={onRemove}
      >
        <Trash2 className="size-4" />
      </Button>

      <div className="mb-6 flex items-start gap-3 pr-9">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-[#c2c6d6] bg-[#f2f4f6] text-xl font-bold text-[#191c1e]">
          {pair.iconLabel}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-2xl font-semibold tracking-tight text-[#191c1e]">
            {pair.pair}
          </h2>
          <p className="mt-1 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
            {pair.name}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="break-words text-3xl font-bold tracking-tight text-[#191c1e] sm:text-4xl">
          {formatRate(pair.rate)}
        </p>
        <span
          className={cn(
            "mt-3 inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-sm font-medium",
            isDown ? "bg-[#ba1a1a]/10 text-[#ba1a1a]" : "bg-[#00855b]/10 text-[#00855b]",
          )}
        >
          <TrendIcon className="size-4" />
          {pair.change > 0 ? "+" : ""}
          {pair.change.toFixed(4)} ({formatPercentage(pair.changePercent)})
        </span>
      </div>

      <WatchlistSparkline direction={pair.direction} values={pair.sparkline} />
    </article>
  );
}
