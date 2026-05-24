"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { formatRate } from "@/lib/formatters/currency";
import type {
  CurrencyCode,
  HistoricalRange,
  HistoricalRatePoint,
} from "@/lib/types/finance";
import { cn } from "@/lib/utils";

type HistoricalChartProps = {
  base?: CurrencyCode;
  data: HistoricalRatePoint[];
  onRangeChange?: (range: HistoricalRange) => void;
  quote?: CurrencyCode;
  selectedRange?: HistoricalRange;
};

const ranges: HistoricalRange[] = ["1W", "1M", "1Y"];

const ClientRateAreaChart = dynamic(() => Promise.resolve(RateAreaChart), {
  loading: () => <div className="h-full animate-pulse rounded-md bg-white/60" />,
  ssr: false,
});

export function HistoricalChart({
  base = "EUR",
  data,
  onRangeChange,
  quote = "USD",
  selectedRange,
}: HistoricalChartProps) {
  const [internalRange, setInternalRange] = useState<HistoricalRange>("1M");
  const activeRange = selectedRange ?? internalRange;
  const latest = data.at(-1)?.rate ?? 0;
  const first = data[0]?.rate ?? latest;
  const change = first ? ((latest - first) / first) * 100 : 0;

  const domain = useMemo<[number, number]>(() => {
    const rates = data.map((point) => point.rate);
    if (!rates.length) {
      return [0, 1];
    }

    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const padding = (max - min) * 0.18 || 0.01;

    return [Number((min - padding).toFixed(4)), Number((max + padding).toFixed(4))];
  }, [data]);

  return (
    <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
          Historical Exchange Rate
        </h2>
        <div className="flex gap-2">
          {ranges.map((range) => (
            <Button
              key={range}
              size="sm"
              variant={activeRange === range ? "default" : "outline"}
              onClick={() => {
                setInternalRange(range);
                onRangeChange?.(range);
              }}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-baseline gap-3">
        <p className="text-2xl font-bold tracking-tight text-[#191c1e]">
          {base} / {quote}
        </p>
        <p className="font-mono text-lg font-medium text-[#00855b]">
          {formatRate(latest)}
        </p>
        <p
          className={cn(
            "text-sm font-semibold",
            change >= 0 ? "text-[#00855b]" : "text-[#ba1a1a]",
          )}
        >
          {change >= 0 ? "+" : ""}
          {change.toFixed(2)}%
        </p>
      </div>

      <div className="h-[320px] min-w-0 rounded-lg border border-[#e0e3e5] bg-[#f2f4f6] p-3 md:h-[420px]">
        <ClientRateAreaChart data={data} domain={domain} />
      </div>
    </section>
  );
}

type RateAreaChartProps = {
  data: HistoricalRatePoint[];
  domain: [number, number];
};

function RateAreaChart({ data, domain }: RateAreaChartProps) {
  return (
    <ResponsiveContainer height="100%" minWidth={0} width="100%">
      <AreaChart data={data} margin={{ bottom: 8, left: 0, right: 10, top: 8 }}>
        <defs>
          <linearGradient id="rateGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2170e4" stopOpacity={0.24} />
            <stop offset="100%" stopColor="#2170e4" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#d8dadc" strokeDasharray="0" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="date"
          tick={{ fill: "#727785", fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          domain={domain}
          tick={{ fill: "#727785", fontSize: 12 }}
          tickFormatter={(value) => Number(value).toFixed(3)}
          tickLine={false}
          width={46}
        />
        <Tooltip
          contentStyle={{
            border: "1px solid #c2c6d6",
            borderRadius: "8px",
            boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.1)",
          }}
          formatter={(value) => [formatRate(Number(value)), "Rate"]}
        />
        <Area
          dataKey="rate"
          fill="url(#rateGradient)"
          stroke="#2170e4"
          strokeWidth={4}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
