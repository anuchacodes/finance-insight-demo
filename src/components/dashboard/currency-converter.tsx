"use client";

import { useMemo } from "react";
import { ArrowUpDown } from "lucide-react";

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
  ConverterDefaults,
  CurrencyCode,
  CurrencyOption,
} from "@/lib/types/finance";

type CurrencyConverterProps = {
  defaults: ConverterDefaults;
  isRateLoading?: boolean;
  onAmountChange?: (amount: number) => void;
  onCurrencyPairChange?: (pair: {
    from: CurrencyCode;
    to: CurrencyCode;
  }) => void;
};

export function CurrencyConverter({
  defaults,
  isRateLoading = false,
  onAmountChange,
  onCurrencyPairChange,
}: CurrencyConverterProps) {
  const amount = defaults.amount;
  const from = defaults.from;
  const to = defaults.to;

  const converted = useMemo(() => amount * defaults.rate, [amount, defaults.rate]);

  return (
    <section className="rounded-lg border border-[#e0e3e5] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <h2 className="mb-6 text-xl font-semibold tracking-tight text-[#191c1e]">
        Quick Converter
      </h2>

      <div className="flex flex-col gap-4">
        <CurrencyAmountField
          label="From"
          amount={amount}
          currencyOptions={defaults.currencyOptions}
          currency={from}
          onAmountChange={onAmountChange}
          onCurrencyChange={(nextFrom) =>
            onCurrencyPairChange?.({ from: nextFrom, to })
          }
        />

        <div className="flex justify-center">
          <Button
            aria-label="Swap currencies"
            size="icon"
            variant="outline"
            onClick={() => onCurrencyPairChange?.({ from: to, to: from })}
          >
            <ArrowUpDown className="size-4 text-[#0058be]" />
          </Button>
        </div>

        <CurrencyAmountField
          label="To"
          amount={Number(converted.toFixed(2))}
          currencyOptions={defaults.currencyOptions}
          currency={to}
          onCurrencyChange={(nextTo) =>
            onCurrencyPairChange?.({ from, to: nextTo })
          }
          readOnly
        />

        <Button className="mt-2 h-11" disabled={isRateLoading}>
          {isRateLoading ? "Updating..." : "Convert"}
        </Button>
        <p className="text-center text-xs text-[#424754]">
          1 {from} equals {formatRate(defaults.rate)} {to}
        </p>
      </div>
    </section>
  );
}

type CurrencyAmountFieldProps = {
  amount: number;
  currency: CurrencyCode;
  currencyOptions: CurrencyOption[];
  label: string;
  onAmountChange?: (value: number) => void;
  onCurrencyChange: (value: CurrencyCode) => void;
  readOnly?: boolean;
};

function CurrencyAmountField({
  amount,
  currency,
  currencyOptions,
  label,
  onAmountChange,
  onCurrencyChange,
  readOnly = false,
}: CurrencyAmountFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs font-medium uppercase tracking-wide text-[#424754]">
        {label}
      </span>
      <div className="flex">
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="h-11 w-[104px] rounded-r-none border-[#c2c6d6] bg-[#f2f4f6] text-[#191c1e] shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencyOptions.map((item) => (
              <SelectItem key={item.code} value={item.code}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          className="h-11 min-w-0 flex-1 rounded-l-none border-[#c2c6d6] bg-white text-right font-mono text-sm text-[#191c1e] shadow-none disabled:bg-[#f2f4f6] disabled:text-[#424754]"
          disabled={readOnly}
          inputMode="decimal"
          type="number"
          value={amount}
          onChange={(event) => onAmountChange?.(Number(event.target.value))}
        />
      </div>
    </label>
  );
}
