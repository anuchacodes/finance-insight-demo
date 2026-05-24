"use client";

import { useMemo, useState } from "react";

import { CurrencyFilter } from "@/components/currencies/currency-filter";
import { CurrencyTable } from "@/components/currencies/currency-table";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  currencies,
  currenciesPagination,
} from "@/lib/mock/currencies";

export default function CurrencyPage() {
  const [search, setSearch] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");

  const filteredCurrencies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return currencies;
    }

    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <DashboardLayout>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-[#191c1e]">
            All Currencies
          </h1>
          <CurrencyFilter
            baseCurrency={baseCurrency}
            search={search}
            onBaseCurrencyChange={setBaseCurrency}
            onSearchChange={setSearch}
          />
        </div>

        <CurrencyTable
          currencies={filteredCurrencies}
          pagination={currenciesPagination}
        />
      </div>
    </DashboardLayout>
  );
}
