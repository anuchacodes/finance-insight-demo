import { TrendBadge } from "@/components/finance/trend-badge";
import { formatRate } from "@/lib/formatters/currency";
import type { CurrencyPair } from "@/lib/types/finance";

type CurrencyPairRowProps = {
  item: CurrencyPair;
};

export function CurrencyPairRow({ item }: CurrencyPairRowProps) {
  return (
    <li className="group flex items-center justify-between rounded-lg border border-[#e0e3e5] p-3 transition-colors hover:bg-[#f2f4f6]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f6] font-mono text-xs font-bold text-[#191c1e]">
          {item.base.slice(0, 2)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#191c1e] transition-colors group-hover:text-[#0058be]">
            {item.base}/{item.quote}
          </p>
          <p className="truncate text-xs text-[#424754]">{item.name}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-mono text-sm font-medium text-[#191c1e]">
          {formatRate(item.rate)}
        </p>
        <TrendBadge direction={item.direction} value={item.change24h} />
      </div>
    </li>
  );
}
