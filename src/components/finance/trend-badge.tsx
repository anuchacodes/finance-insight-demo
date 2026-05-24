import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { formatPercentage } from "@/lib/formatters/percentage";
import { cn } from "@/lib/utils";
import type { TrendDirection } from "@/lib/types/finance";

type TrendBadgeProps = {
  className?: string;
  direction: TrendDirection;
  value: number;
};

export function TrendBadge({ className, direction, value }: TrendBadgeProps) {
  const Icon =
    direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1 text-xs font-semibold tabular-nums",
        direction === "up" && "text-[#00855b]",
        direction === "down" && "text-[#ba1a1a]",
        direction === "flat" && "text-[#565e74]",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {formatPercentage(value)}
    </span>
  );
}
