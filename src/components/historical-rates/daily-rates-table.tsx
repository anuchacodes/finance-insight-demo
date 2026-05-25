"use client";

import { Download } from "lucide-react";

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
import type { DailyRateRow } from "@/lib/adapters/historical-rates";
import { useTranslations } from "@/lib/i18n/use-translations";
import { cn } from "@/lib/utils";

type DailyRatesTableProps = {
  baseCurrency: string;
  quoteCurrency: string;
  rows: DailyRateRow[];
};

function escapeCsvValue(value: string | number) {
  const stringValue = String(value);

  if (!/[",\n]/.test(stringValue)) {
    return stringValue;
  }

  return `"${stringValue.replaceAll('"', '""')}"`;
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function DailyRatesTable({
  baseCurrency,
  quoteCurrency,
  rows,
}: DailyRatesTableProps) {
  const t = useTranslations();

  function handleExportCsv() {
    const header = [
      t.historicalRates.csvDate,
      t.historicalRates.csvRate,
      t.historicalRates.csvChange,
    ];
    const body = rows.map((row) => [
      row.date,
      row.rate.toFixed(6),
      row.change.toFixed(4),
    ]);
    const csv = [header, ...body]
      .map((line) => line.map(escapeCsvValue).join(","))
      .join("\n");

    downloadCsv(
      `historical-rates-${baseCurrency}-${quoteCurrency}.csv`,
      csv,
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-3 border-b border-[#c2c6d6] bg-[#f7f9fb] p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-[#191c1e]">
          {t.historicalRates.dailyDataTitle}
        </h2>
        <Button
          className="gap-2 text-[#0058be]"
          disabled={!rows.length}
          variant="ghost"
          onClick={handleExportCsv}
        >
          <Download className="size-4" />
          {t.historicalRates.exportCsv}
        </Button>
      </div>

      <Table className="min-w-[780px]">
        <TableHeader>
          <TableRow className="border-[#c2c6d6] bg-[#f2f4f6] hover:bg-[#f2f4f6]">
            {[
              t.historicalRates.tableDate,
              t.historicalRates.tableRate,
              t.historicalRates.tableChange,
            ].map((label) => (
              <TableHead
                key={label}
                className={cn(
                  "font-mono text-xs font-medium uppercase tracking-wide text-[#424754]",
                  label !== t.historicalRates.tableDate && "text-right",
                )}
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="font-mono">
          {rows.map((row) => (
            <TableRow
              key={row.date}
              className="border-[#e0e3e5] hover:bg-[#f7f9fb]"
            >
              <TableCell className="text-[#191c1e]">{row.date}</TableCell>
              <TableCell className="text-right font-semibold">
                {formatRate(row.rate, 4)}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-semibold",
                  row.change >= 0 ? "text-[#00855b]" : "text-[#ba1a1a]",
                )}
              >
                {formatPercentage(row.change)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
