import { MetricCard } from "@/components/finance/metric-card";
import type { OverviewMetric } from "@/lib/types/finance";

type OverviewCardsProps = {
  metrics: OverviewMetric[];
};

export function OverviewCards({ metrics }: OverviewCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}
