import type { TrendDirection } from "@/lib/types/finance";

type WatchlistSparklineProps = {
  direction: TrendDirection;
  values: number[];
};

export function WatchlistSparkline({
  direction,
  values,
}: WatchlistSparklineProps) {
  const stroke = direction === "down" ? "#ba1a1a" : "#00855b";
  const fill = direction === "down" ? "#ffdad6" : "#00855b";
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      return `${x.toFixed(2)},${value}`;
    })
    .join(" ");
  const areaPoints = `0,40 ${points} 100,40`;

  return (
    <div className="relative mt-auto h-20 w-full overflow-hidden rounded bg-[#f7f9fb]">
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 40"
      >
        <defs>
          <linearGradient id={`sparkline-${direction}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="0.22" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon fill={`url(#sparkline-${direction})`} points={areaPoints} />
        <polyline
          fill="none"
          points={points}
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
