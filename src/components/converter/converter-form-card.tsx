"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRate } from "@/lib/formatters/currency";
import type {
  ConversionQuote,
  ConverterCurrencyOption,
} from "@/lib/mock/converter";
import type { CurrencyCode } from "@/lib/types/finance";

type ConverterFormCardProps = {
  currencyOptions: ConverterCurrencyOption[];
  quote: ConversionQuote;
};

export function ConverterFormCard({
  currencyOptions,
  quote,
}: ConverterFormCardProps) {
  const [amount, setAmount] = useState(String(quote.amount));
  const [from, setFrom] = useState<CurrencyCode>(quote.from);
  const [to, setTo] = useState<CurrencyCode>(quote.to);

  const numericAmount = Number(amount.replaceAll(",", "")) || 0;
  const result = useMemo(
    () => numericAmount * quote.rate,
    [numericAmount, quote.rate],
  );

  return (
    <section className="rounded-lg border border-[#c2c6d6] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="space-y-6">
        <label className="block">
          <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
            Amount
          </span>
          <Input
            className="h-14 border-[#c2c6d6] bg-[#f7f9fb] px-4 font-mono text-2xl font-semibold text-[#191c1e] shadow-none"
            inputMode="decimal"
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
          <CurrencySelectField
            label="From"
            options={currencyOptions}
            value={from}
            onValueChange={(value) => setFrom(value as CurrencyCode)}
          />

          <Button
            aria-label="Swap currencies"
            className="mx-auto size-12 rounded-full border-[#c2c6d6] bg-[#f2f4f6] md:mb-0"
            size="icon"
            variant="outline"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
          >
            <ArrowLeftRight className="size-5 text-[#0058be]" />
          </Button>

          <CurrencySelectField
            label="To"
            options={currencyOptions}
            value={to}
            onValueChange={(value) => setTo(value as CurrencyCode)}
          />
        </div>

        <Button className="h-12 w-full text-base">Convert</Button>
      </div>

      <hr className="my-8 border-[#e0e3e5]" />

      <div className="flex flex-col items-center justify-center py-4 text-center">
        <p className="mb-2 text-xl font-semibold text-[#424754]">
          {formatRate(numericAmount, 2)} {from} =
        </p>
        <p className="mb-3 text-4xl font-bold tracking-tight text-[#0058be] md:text-5xl">
          {formatRate(result, 2)} {to}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm text-[#727785]">
          <span>
            1 {from} = {formatRate(quote.rate, 5)} {to}
          </span>
          <span className="size-1 rounded-full bg-[#c2c6d6]" />
          <span>
            1 {to} = {formatRate(quote.inverseRate, 5)} {from}
          </span>
        </div>
        <p className="mt-3 flex items-center gap-1 font-mono text-xs font-medium text-[#727785]">
          <Info className="size-3.5" />
          Mid-market exchange rate at {quote.timestamp}
        </p>
      </div>
    </section>
  );
}

type CurrencySelectFieldProps = {
  label: string;
  onValueChange: (value: string) => void;
  options: ConverterCurrencyOption[];
  value: CurrencyCode;
};

function CurrencySelectField({
  label,
  onValueChange,
  options,
  value,
}: CurrencySelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
        {label}
      </span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-12 w-full border-[#c2c6d6] bg-[#f7f9fb] text-[#191c1e] shadow-none">
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
