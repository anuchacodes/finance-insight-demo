import type { CurrencyCode } from "@/lib/types/finance";
import type {
  HistoricalRatesParams,
  LatestRatesParams,
} from "@/services/frankfurter-service";

export const queryKeys = {
  currencies: {
    all: ["currencies"] as const,
  },
  exchangeRates: {
    all: ["exchange-rates"] as const,
    historical: (params: HistoricalRatesParams) =>
      [
        ...queryKeys.exchangeRates.all,
        "historical",
        params.base,
        params.quotes.join(","),
        params.from,
        params.to ?? null,
        params.group ?? null,
      ] as const,
    latest: (params: LatestRatesParams = {}) =>
      [
        ...queryKeys.exchangeRates.all,
        "latest",
        params.base ?? null,
        params.quotes?.join(",") ?? null,
      ] as const,
    single: (base: CurrencyCode, quote: CurrencyCode) =>
      [...queryKeys.exchangeRates.all, "single", base, quote] as const,
  },
};
