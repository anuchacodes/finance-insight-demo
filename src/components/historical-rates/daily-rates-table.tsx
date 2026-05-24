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
import type { DailyRateRow } from "@/lib/mock/historical-rates";
import { cn } from "@/lib/utils";

type DailyRatesTableProps = {
  rows: DailyRateRow[];
};

export function DailyRatesTable({ rows }: DailyRatesTableProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex flex-col gap-3 border-b border-[#c2c6d6] bg-[#f7f9fb] p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-[#191c1e]">
          Daily Data
        </h2>
        <Button className="gap-2 text-[#0058be]" variant="ghost">
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      <Table className="min-w-[780px]">
        <TableHeader>
          <TableRow className="border-[#c2c6d6] bg-[#f2f4f6] hover:bg-[#f2f4f6]">
            {["Date", "Open", "High", "Low", "Close", "Change"].map((label) => (
              <TableHead
                key={label}
                className={cn(
                  "font-mono text-xs font-medium uppercase tracking-wide text-[#424754]",
                  label === "Change" && "text-right",
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
              <TableCell>{formatRate(row.open, 4)}</TableCell>
              <TableCell>{formatRate(row.high, 4)}</TableCell>
              <TableCell>{formatRate(row.low, 4)}</TableCell>
              <TableCell className="font-semibold">{formatRate(row.close, 4)}</TableCell>
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
