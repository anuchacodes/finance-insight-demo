import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { WatchlistPageClient } from "@/components/watchlist/watchlist-page-client";

export default function WatchlistPage() {
  return (
    <DashboardLayout>
      <WatchlistPageClient />
    </DashboardLayout>
  );
}
