import { WatchlistPairCard } from "@/components/watchlist/watchlist-pair-card";
import type { WatchlistPair } from "@/lib/mock/watchlist";

type WatchlistCardGridProps = {
  pairs: WatchlistPair[];
};

export function WatchlistCardGrid({ pairs }: WatchlistCardGridProps) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {pairs.map((pair) => (
        <WatchlistPairCard key={pair.id} pair={pair} />
      ))}
    </section>
  );
}
