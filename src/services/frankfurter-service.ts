import { httpClient } from "@/lib/http/http-client";
import type { CurrencyCode } from "@/lib/types/finance";

export type FrankfurterCurrency = {
  end_date: string | null;
  iso_code: CurrencyCode;
  iso_numeric: string | null;
  name: string;
  start_date: string | null;
  symbol: string | null;
};

export type FrankfurterRate = {
  base: CurrencyCode;
  date: string;
  quote: CurrencyCode;
  rate: number;
};

export type LatestRatesParams = {
  base?: CurrencyCode;
  quotes?: CurrencyCode[];
};

export type HistoricalRatesParams = {
  base: CurrencyCode;
  from: string;
  group?: "week" | "month";
  quotes: CurrencyCode[];
  to?: string;
};

function joinQuotes(quotes?: CurrencyCode[]) {
  return quotes?.filter(Boolean).join(",");
}

export function getCurrencies() {
  return httpClient.get<FrankfurterCurrency[]>("/currencies");
}

export function getLatestRates(params: LatestRatesParams = {}) {
  return httpClient.get<FrankfurterRate[]>("/rates", {
    params: {
      base: params.base,
      quotes: joinQuotes(params.quotes),
    },
  });
}

export function getSingleRate(base: CurrencyCode, quote: CurrencyCode) {
  return httpClient.get<FrankfurterRate>(`/rate/${base}/${quote}`);
}

export function getHistoricalRates(params: HistoricalRatesParams) {
  return httpClient.get<FrankfurterRate[]>("/rates", {
    params: {
      base: params.base,
      from: params.from,
      group: params.group,
      quotes: joinQuotes(params.quotes),
      to: params.to,
    },
  });
}
