import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import type { CurrencyPagination } from "@/lib/adapters/currencies";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { CurrencyListItem } from "@/lib/types/finance";
import { cn } from "@/lib/utils";

type CurrencyTableProps = {
  currencies: CurrencyListItem[];
  onNextPage: () => void;
  onPreviousPage: () => void;
  pagination: CurrencyPagination;
};

export function CurrencyTable({
  currencies,
  onNextPage,
  onPreviousPage,
  pagination,
}: CurrencyTableProps) {
  const t = useTranslations();
  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = pagination.to < pagination.total;

  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="border-[#e0e3e5] bg-[#f7f9fb] hover:bg-[#f7f9fb]">
            <TableHead className="w-24 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              {t.currencies.tableCode}
            </TableHead>
            <TableHead className="font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              {t.currencies.tableName}
            </TableHead>
            <TableHead className="w-24 font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              {t.currencies.tableSymbol}
            </TableHead>
            <TableHead className="text-right font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              {t.currencies.tableCurrentRate}
            </TableHead>
            <TableHead className="w-36 text-right font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
              {t.currencies.tableChange24h}
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
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 border-t border-[#e0e3e5] bg-[#f7f9fb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#424754]">
          {t.currencies.paginationShowing} {pagination.from}{" "}
          {t.currencies.paginationTo} {pagination.to}{" "}
          {t.currencies.paginationOf} {pagination.total}{" "}
          {t.currencies.paginationResults}
        </p>
        <div className="flex items-center gap-2">
          <Button
            disabled={!hasPreviousPage}
            variant="outline"
            onClick={onPreviousPage}
          >
            {t.currencies.previous}
          </Button>
          <Button disabled={!hasNextPage} variant="outline" onClick={onNextPage}>
            {t.currencies.next}
          </Button>
        </div>
      </div>
    </section>
  );
}

function CurrencyChangeBadge({ item }: { item: CurrencyListItem }) {
  const Icon =
    item.direction === "down"
      ? TrendingDown
      : item.direction === "up"
        ? TrendingUp
        : Minus;
  const isDown = item.direction === "down";
  const isFlat = item.direction === "flat";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-end gap-1 rounded px-2 py-1 text-sm font-medium",
        isFlat && "bg-[#e0e3e5] text-[#424754]",
        isDown && "bg-[#ba1a1a]/10 text-[#ba1a1a]",
        !isDown && !isFlat && "bg-[#00855b]/10 text-[#00855b]",
      )}
    >
      <Icon className="size-3.5" />
      {formatPercentage(item.change24h)}
    </span>
  );
}

export function CurrencyTableSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="border-[#e0e3e5] bg-[#f7f9fb] hover:bg-[#f7f9fb]">
            <TableHead className="w-24">
              <Skeleton className="h-4 w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-24" />
            </TableHead>
            <TableHead className="w-24">
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="ml-auto h-4 w-24" />
            </TableHead>
            <TableHead className="w-36">
              <Skeleton className="ml-auto h-4 w-24" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <CurrencySkeletonRow key={index} compact={index % 2 === 1} />
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-3 border-t border-[#e0e3e5] bg-[#f7f9fb] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-5 w-56" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </section>
  );
}

function CurrencySkeletonRow({ compact = false }: { compact?: boolean }) {
  return (
    <TableRow className="border-[#e0e3e5] hover:bg-transparent">
      <TableCell>
        <Skeleton className={cn("h-4", compact ? "w-10" : "w-14")} />
      </TableCell>
      <TableCell>
        <Skeleton className={cn("h-4", compact ? "w-28" : "w-40")} />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-7" />
      </TableCell>
      <TableCell>
        <Skeleton className={cn("ml-auto h-4", compact ? "w-20" : "w-24")} />
      </TableCell>
      <TableCell>
        <Skeleton className="ml-auto h-7 w-24" />
      </TableCell>
    </TableRow>
  );
}
