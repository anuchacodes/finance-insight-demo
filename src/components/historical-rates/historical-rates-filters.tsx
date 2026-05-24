"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { HistoricalCurrencyOption } from "@/lib/mock/historical-rates";
import type { CurrencyCode } from "@/lib/types/finance";

type HistoricalRatesFiltersProps = {
  baseCurrency: CurrencyCode;
  baseOptions: HistoricalCurrencyOption[];
  dateRange: string;
  onBaseCurrencyChange: (value: CurrencyCode) => void;
  onDateRangeChange: (value: string) => void;
  onQuoteCurrencyChange: (value: CurrencyCode) => void;
  quoteCurrency: CurrencyCode;
  quoteOptions: HistoricalCurrencyOption[];
};

export function HistoricalRatesFilters({
  baseCurrency,
  baseOptions,
  dateRange,
  onBaseCurrencyChange,
  onDateRangeChange,
  onQuoteCurrencyChange,
  quoteCurrency,
  quoteOptions,
}: HistoricalRatesFiltersProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <CurrencySelect
        label="Base Currency"
        options={baseOptions}
        value={baseCurrency}
        onValueChange={onBaseCurrencyChange}
      />
      <CurrencySelect
        label="Quote Currency"
        options={quoteOptions}
        value={quoteCurrency}
        onValueChange={onQuoteCurrencyChange}
      />
      <label className="block">
        <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
          Date Range
        </span>
        <Input
          className="h-12 border-[#c2c6d6] bg-white shadow-none"
          type="date"
          value={dateRange}
          onChange={(event) => onDateRangeChange(event.target.value)}
        />
      </label>
    </section>
  );
}

type CurrencySelectProps = {
  label: string;
  onValueChange: (value: CurrencyCode) => void;
  options: HistoricalCurrencyOption[];
  value: CurrencyCode;
};

function CurrencySelect({
  label,
  onValueChange,
  options,
  value,
}: CurrencySelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
        {label}
      </span>
      <Select
        value={value}
        onValueChange={(nextValue) => onValueChange(nextValue as CurrencyCode)}
      >
        <SelectTrigger className="h-12 w-full border-[#c2c6d6] bg-white text-[#191c1e] shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.code} value={option.code}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
