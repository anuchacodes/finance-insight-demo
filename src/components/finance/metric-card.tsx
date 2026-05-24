import {
  BarChart3,
  Clock3,
  Globe2,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import type { OverviewMetric } from "@/lib/types/finance";
import { cn } from "@/lib/utils";

const icons = {
  chart: BarChart3,
  clock: Clock3,
  globe: Globe2,
  trend: TrendingUp,
};

type MetricCardProps = {
  metric: OverviewMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
  const Icon =
    metric.icon === "trend" && metric.trend === "down"
      ? TrendingDown
      : metric.icon === "trend" && metric.trend === "flat"
        ? Minus
        : icons[metric.icon];
  const isPositiveTrend = metric.trend === "up";
  const isNegativeTrend = metric.trend === "down";

  return (
    <article className="relative overflow-hidden rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <p className="text-sm text-[#424754]">{metric.label}</p>
        <Icon
          className={cn(
            "size-5 text-[#2170e4]",
            isPositiveTrend && "text-[#00855b]",
            isNegativeTrend && "text-[#ba1a1a]",
          )}
        />
      </div>

      <div className="relative z-10 mt-8 flex items-baseline gap-3">
        <p
          className={cn(
            "text-3xl font-bold tracking-tight text-[#191c1e] md:text-4xl",
            isPositiveTrend && "text-[#00855b]",
            isNegativeTrend && "text-[#ba1a1a]",
          )}
        >
          {metric.value}
        </p>
        {metric.badge ? (
          <span className="rounded bg-[#00855b]/10 px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-wide text-[#00855b]">
            {metric.badge}
          </span>
        ) : (
          <p className="text-sm text-[#565e74]">{metric.description}</p>
        )}
      </div>

      {metric.badge ? (
        <p className="relative z-10 mt-2 text-sm text-[#565e74]">
          {metric.description}
        </p>
      ) : null}

      {isPositiveTrend ? (
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#00855b]/20 to-transparent" />
      ) : null}
      {isNegativeTrend ? (
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#ba1a1a]/15 to-transparent" />
      ) : null}
    </article>
  );
}
