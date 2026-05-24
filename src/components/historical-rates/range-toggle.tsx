"use client";

import { Button } from "@/components/ui/button";
import type { HistoricalAnalysisRange } from "@/lib/adapters/historical-rates";
import { cn } from "@/lib/utils";

type RangeToggleProps = {
  onValueChange: (range: HistoricalAnalysisRange) => void;
  ranges: HistoricalAnalysisRange[];
  value: HistoricalAnalysisRange;
};

export function RangeToggle({ onValueChange, ranges, value }: RangeToggleProps) {
  return (
    <div className="flex items-center rounded-lg border border-[#c2c6d6] bg-[#f2f4f6] p-1">
      {ranges.map((range) => (
        <Button
          key={range}
          className={cn(
            "h-9 rounded-md border border-transparent px-3 text-sm shadow-none",
            value === range
              ? "border-[#c2c6d6] bg-white text-[#0058be] hover:bg-white"
              : "bg-transparent text-[#424754] hover:bg-white/70 hover:text-[#0058be]",
          )}
          variant="ghost"
          onClick={() => onValueChange(range)}
        >
          {range}
        </Button>
      ))}
    </div>
  );
}
