import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function HistoricalRatesSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-lg border border-[#c2c6d6] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-7 w-20" />
        </div>
        <div className="h-[360px] rounded-lg border border-[#e0e3e5] bg-[#f7f9fb] p-3 md:h-[480px]">
          <Skeleton className="h-full w-full bg-[#d8dadc]" />
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[#c2c6d6] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-3 border-b border-[#c2c6d6] bg-[#f7f9fb] p-5 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Table className="min-w-[780px]">
          <TableHeader>
            <TableRow className="border-[#c2c6d6] bg-[#f2f4f6] hover:bg-[#f2f4f6]">
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="ml-auto h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="ml-auto h-4 w-20" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, index) => (
              <TableRow key={index} className="border-[#e0e3e5]">
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="ml-auto h-4 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
