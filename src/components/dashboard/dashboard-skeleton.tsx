import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-label="Loading dashboard">
      <section className="flex flex-col gap-3 rounded-lg border border-[#e0e3e5] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.05)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-11 w-full sm:w-[180px]" />
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <MetricSkeleton key={index} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)] xl:col-span-2">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-7 w-56" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-12" />
              <Skeleton className="h-9 w-12" />
              <Skeleton className="h-9 w-12" />
            </div>
          </div>
          <div className="mb-6 flex flex-wrap items-baseline gap-3">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="h-[320px] rounded-lg border border-[#e0e3e5] bg-[#f2f4f6] p-3 md:h-[420px]">
            <Skeleton className="h-full w-full bg-[#d8dadc]" />
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <ConverterSkeleton />
          <WatchlistSkeleton />
        </div>
      </div>

      <ExchangeRateTableSkeleton />
    </div>
  );
}

function MetricSkeleton() {
  return (
    <article className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="size-5 rounded-full" />
      </div>
      <div className="mt-8 flex items-baseline gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>
      <Skeleton className="mt-3 h-4 w-32" />
    </article>
  );
}

function ConverterSkeleton() {
  return (
    <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <Skeleton className="mb-6 h-7 w-40" />
      <div className="flex flex-col gap-4">
        <FieldSkeleton />
        <Skeleton className="mx-auto size-10 rounded-lg" />
        <FieldSkeleton />
        <Skeleton className="mt-2 h-11 w-full" />
        <Skeleton className="mx-auto h-4 w-44" />
      </div>
    </section>
  );
}

function FieldSkeleton() {
  return (
    <div>
      <Skeleton className="mb-2 h-4 w-16" />
      <div className="flex">
        <Skeleton className="h-11 w-[104px] rounded-r-none" />
        <Skeleton className="h-11 flex-1 rounded-l-none" />
      </div>
    </div>
  );
}

function WatchlistSkeleton() {
  return (
    <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="mb-5 flex items-center justify-between">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-[#e0e3e5] p-3"
          >
            <div>
              <Skeleton className="h-5 w-20" />
              <Skeleton className="mt-2 h-4 w-28" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExchangeRateTableSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border border-[#e0e3e5] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between border-b border-[#e0e3e5] bg-[#f7f9fb] p-5">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-5 w-16" />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[96px_1fr_140px_140px_64px] gap-4 border-b border-[#e0e3e5] px-4 py-3">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="ml-auto h-4 w-20" />
            <Skeleton className="ml-auto h-4 w-24" />
            <Skeleton className="mx-auto h-4 w-10" />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[96px_1fr_140px_140px_64px] gap-4 border-b border-[#e0e3e5] px-4 py-3 last:border-b-0"
            >
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="ml-auto h-5 w-24" />
              <Skeleton className="ml-auto h-7 w-24" />
              <Skeleton className="mx-auto size-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
