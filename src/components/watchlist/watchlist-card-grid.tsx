import { WatchlistPairCard } from "@/components/watchlist/watchlist-pair-card";
import type { WatchlistPair } from "@/lib/adapters/watchlist";

type WatchlistCardGridProps = {
  onRemove: (quote: string) => void;
  pairs: WatchlistPair[];
};

export function WatchlistCardGrid({ onRemove, pairs }: WatchlistCardGridProps) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {pairs.map((pair) => (
        <WatchlistPairCard
          key={pair.id}
          pair={pair}
          onRemove={() => onRemove(pair.quote)}
        />
      ))}
    </section>
  );
}
