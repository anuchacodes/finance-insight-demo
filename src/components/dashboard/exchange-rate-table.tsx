import Link from "next/link";
import { MoreVertical } from "lucide-react";

import { TrendBadge } from "@/components/finance/trend-badge";
import { Button } from "@/components/ui/button";
import { formatRate } from "@/lib/formatters/currency";
import type { ExchangeRate } from "@/lib/types/finance";

type ExchangeRateTableProps = {
  rates: ExchangeRate[];
};

export function ExchangeRateTable({ rates }: ExchangeRateTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#e0e3e5] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between border-b border-[#e0e3e5] bg-[#f7f9fb] p-5">
        <h2 className="text-xl font-semibold tracking-tight text-[#191c1e]">
          Latest Exchange Rates
        </h2>
        <Button asChild variant="link">
          <Link href="/currencies">View All</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#e0e3e5] bg-white">
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
                Code
              </th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
                Currency Name
              </th>
              <th className="px-4 py-3 text-right font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
                Rate (USD)
              </th>
              <th className="px-4 py-3 text-right font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
                Change (24h)
              </th>
              <th className="w-16 px-4 py-3 text-center font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e0e3e5] font-mono text-[#191c1e]">
            {rates.map((rate) => (
              <tr
                key={rate.code}
                className="group transition-colors hover:bg-[#f2f4f6]"
              >
                <td className="px-4 py-3 font-semibold">{rate.code}</td>
                <td className="px-4 py-3 font-sans">{rate.name}</td>
                <td className="px-4 py-3 text-right">{formatRate(rate.rate)}</td>
                <td className="px-4 py-3 text-right">
                  <TrendBadge
                    className="w-full"
                    direction={rate.direction}
                    value={rate.change24h}
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <Button
                    aria-label={`Open ${rate.code} actions`}
                    className="opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    size="icon-sm"
                    variant="ghost"
                  >
                    <MoreVertical className="size-4 text-[#727785]" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
