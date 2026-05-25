"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CurrencySortKey } from "@/lib/adapters/currencies";
import { useTranslations } from "@/lib/i18n/use-translations";
import type { CurrencyCode, CurrencyOption } from "@/lib/types/finance";

type CurrencyFilterProps = {
  baseCurrency: CurrencyCode;
  baseOptions: CurrencyOption[];
  onBaseCurrencyChange: (value: CurrencyCode) => void;
  onSearchChange: (value: string) => void;
  onSortChange: () => void;
  search: string;
  sortKey: CurrencySortKey;
};

export function CurrencyFilter({
  baseCurrency,
  baseOptions,
  onBaseCurrencyChange,
  onSearchChange,
  onSortChange,
  search,
  sortKey,
}: CurrencyFilterProps) {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#727785]" />
        <span className="sr-only">{t.currencies.searchLabel}</span>
        <Input
          className="h-11 border-[#c2c6d6] bg-white pl-9 shadow-none"
          placeholder={t.currencies.searchPlaceholder}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Select value={baseCurrency} onValueChange={onBaseCurrencyChange}>
          <SelectTrigger className="h-11 w-full border-[#c2c6d6] bg-white shadow-none sm:w-[228px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {baseOptions.map((option) => (
              <SelectItem key={option.code} value={option.code}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="h-11 gap-2 border-[#c2c6d6] bg-white"
          variant="outline"
          onClick={onSortChange}
        >
          <SlidersHorizontal className="size-4" />
          {t.currencies.sortLabel}: {t.currencies.sortOptions[sortKey]}
        </Button>
      </div>
    </div>
  );
}
