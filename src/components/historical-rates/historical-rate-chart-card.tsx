"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { formatRate } from "@/lib/formatters/currency";
import { formatPercentage } from "@/lib/formatters/percentage";
import type { HistoricalChartPoint } from "@/lib/adapters/historical-rates";
import { useTranslations } from "@/lib/i18n/use-translations";
import { cn } from "@/lib/utils";

type HistoricalRateChartCardProps = {
  baseCurrency: string;
  chartData: HistoricalChartPoint[];
  quoteCurrency: string;
};

const ClientHistoricalAreaChart = dynamic(
  () => Promise.resolve(HistoricalAreaChart),
  {
    loading: () => <div className="h-full animate-pulse rounded-md bg-white/70" />,
    ssr: false,
  },
);

export function HistoricalRateChartCard({
  baseCurrency,
  chartData,
  quoteCurrency,
}: HistoricalRateChartCardProps) {
  const t = useTranslations();
  const first = chartData[0]?.rate ?? 0;
  const latest = chartData.at(-1)?.rate ?? first;
  const change = first ? ((latest - first) / first) * 100 : 0;

  const domain = useMemo<[number, number]>(() => {
    const rates = chartData.map((point) => point.rate);
    if (!rates.length) {
      return [0, 1];
    }

    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const padding = (max - min) * 0.18 || 0.01;

    return [Number((min - padding).toFixed(4)), Number((max + padding).toFixed(4))];
  }, [chartData]);
  const TrendIcon =
    change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;

  return (
    <section className="rounded-lg border border-[#c2c6d6] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-[#191c1e]">
          {baseCurrency} {t.historicalRates.chartTitleConnector} {quoteCurrency}{" "}
          {t.historicalRates.tableRate}
        </h2>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-xs font-bold uppercase tracking-wide",
            change > 0 && "bg-[#00855b]/10 text-[#00855b]",
            change < 0 && "bg-[#ba1a1a]/10 text-[#ba1a1a]",
            change === 0 && "bg-[#e0e3e5] text-[#424754]",
          )}
        >
          <TrendIcon className="size-3.5" />
          {formatPercentage(change)}
        </span>
      </div>

      <div className="h-[360px] min-w-0 rounded-lg border border-[#e0e3e5] bg-[#f7f9fb] p-3 md:h-[480px]">
        <ClientHistoricalAreaChart data={chartData} domain={domain} />
      </div>
    </section>
  );
}

type HistoricalAreaChartProps = {
  data: HistoricalChartPoint[];
  domain: [number, number];
};

function HistoricalAreaChart({ data, domain }: HistoricalAreaChartProps) {
  const t = useTranslations();

  return (
    <ResponsiveContainer height="100%" minWidth={0} width="100%">
      <AreaChart data={data} margin={{ bottom: 8, left: 0, right: 12, top: 8 }}>
        <defs>
          <linearGradient id="historicalRateGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0058be" stopOpacity={0.24} />
            <stop offset="100%" stopColor="#0058be" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="#e6e8ea"
          strokeDasharray="4 4"
          vertical={false}
        />
        <XAxis
          axisLine={false}
          dataKey="date"
          tick={{ fill: "#727785", fontSize: 12, fontWeight: 600 }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          domain={domain}
          tick={{ fill: "#727785", fontSize: 12, fontWeight: 600 }}
          tickFormatter={(value) => Number(value).toFixed(2)}
          tickLine={false}
          width={50}
        />
        <Tooltip
          contentStyle={{
            border: "1px solid #c2c6d6",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.1)",
          }}
          formatter={(value) => [
            formatRate(Number(value), 3),
            t.historicalRates.tooltipRateLabel,
          ]}
        />
        <Area
          activeDot={{ fill: "#0058be", r: 5, stroke: "#ffffff", strokeWidth: 2 }}
          dataKey="rate"
          fill="url(#historicalRateGradient)"
          stroke="#0058be"
          strokeWidth={3}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
