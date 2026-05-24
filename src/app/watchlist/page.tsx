import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { WatchlistCardGrid } from "@/components/watchlist/watchlist-card-grid";
import { watchlistPairs } from "@/lib/mock/watchlist";

export default function WatchlistPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
              My Watchlist
            </h1>
            <p className="mt-3 text-lg text-[#424754]">
              Monitor your pinned currency pairs and spot trends.
            </p>
          </div>
          <Button className="h-11 gap-2 px-4">
            <Plus className="size-4" />
            Add Pair
          </Button>
        </header>

        <WatchlistCardGrid pairs={watchlistPairs} />
      </div>
    </DashboardLayout>
  );
}
