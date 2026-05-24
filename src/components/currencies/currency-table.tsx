import { TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRate } from "@/lib/formatters/currency";
import { formatPercentage } from "@/lib/formatters/percentage";
import type { CurrencyListItem } from "@/lib/mock/currencies";
import { cn } from "@/lib/utils";

type CurrencyTableProps = {
  currencies: CurrencyListItem[];
  pagination: {
    from: number;
    to: number;
    total: number;
  };
};

export function CurrencyTable({ currencies, pagination }: CurrencyTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="border-[#e0e3e5] bg-[#f7f9fb] hover:bg-[#f7f9fb]">
            <TableHead className="w-24 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              Code
            </TableHead>
            <TableHead className="font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              Name
            </TableHead>
            <TableHead className="w-24 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              Symbol
            </TableHead>
            <TableHead className="text-right font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              Current Rate
            </TableHead>
            <TableHead className="w-36 text-right font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              24h Change
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-mono">
          {currencies.map((currency) => (
            <TableRow
              key={currency.code}
              className="border-[#e0e3e5] hover:bg-[#f7f9fb]"
            >
              <TableCell className="font-semibold text-[#191c1e]">
                {currency.code}
              </TableCell>
              <TableCell className="font-sans text-[#424754]">
                {currency.name}
              </TableCell>
              <TableCell className="text-[#424754]">{currency.symbol}</TableCell>
              <TableCell className="text-right text-[#191c1e]">
                {formatRate(currency.currentRate)}
              </TableCell>
              <TableCell className="text-right">
                <CurrencyChangeBadge item={currency} />
              </TableCell>
            </TableRow>
          ))}
          <CurrencySkeletonRow />
          <CurrencySkeletonRow compact />
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-[#e0e3e5] bg-[#f7f9fb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#424754]">
          Showing {pagination.from} to {pagination.to} of {pagination.total} results
        </p>
        <div className="flex items-center gap-2">
          <Button disabled variant="outline">
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </section>
  );
}

function CurrencyChangeBadge({ item }: { item: CurrencyListItem }) {
  const Icon = item.direction === "down" ? TrendingDown : TrendingUp;
  const isDown = item.direction === "down";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1 rounded px-2 py-1 text-sm font-medium",
        isDown ? "bg-[#ba1a1a]/10 text-[#ba1a1a]" : "bg-[#00855b]/10 text-[#00855b]",
      )}
    >
      <Icon className="size-3.5" />
      {formatPercentage(item.change24h)}
    </span>
  );
}

function CurrencySkeletonRow({ compact = false }: { compact?: boolean }) {
  return (
    <TableRow className="border-[#e0e3e5] hover:bg-transparent">
      <TableCell>
        <div className={cn("h-4 rounded bg-[#e0e3e5]", compact ? "w-10" : "w-14")} />
      </TableCell>
      <TableCell>
        <div className={cn("h-4 rounded bg-[#e0e3e5]", compact ? "w-28" : "w-40")} />
      </TableCell>
      <TableCell>
        <div className="h-4 w-7 rounded bg-[#e0e3e5]" />
      </TableCell>
      <TableCell>
        <div className={cn("ml-auto h-4 rounded bg-[#e0e3e5]", compact ? "w-20" : "w-24")} />
      </TableCell>
      <TableCell>
        <div className="ml-auto h-7 w-24 rounded bg-[#e0e3e5]" />
      </TableCell>
    </TableRow>
  );
}
