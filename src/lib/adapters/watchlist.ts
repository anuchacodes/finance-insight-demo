import type {
  CurrencyCode,
  CurrencyOption,
  TrendDirection,
} from "@/lib/types/finance";
import type {
  FrankfurterCurrency,
  FrankfurterRate,
} from "@/services/frankfurter-service";

export type WatchlistPair = {
  base: CurrencyCode;
  change: number;
  changePercent: number;
  direction: TrendDirection;
  iconLabel: string;
  id: string;
  name: string;
  pair: string;
  quote: CurrencyCode;
  rate: number;
  sparkline: number[];
};

export type WatchlistQuote = CurrencyCode;

export const watchlistStorageKey = "finance-insight-watchlist-quotes";
export const watchlistChangeEvent = "finance-insight-watchlist-change";
export const defaultWatchlistBase: CurrencyCode = "USD";
export const defaultWatchlistQuotes: CurrencyCode[] = [
  "EUR",
  "GBP",
  "JPY",
  "AUD",
];

function toDirection(change: number): TrendDirection {
  if (change > 0) {
    return "up";
  }

  if (change < 0) {
    return "down";
  }

  return "flat";
}

function formatIconLabel(base: CurrencyCode, quote: CurrencyCode) {
  return `${base.slice(0, 1)}${quote.slice(0, 1)}`;
}

function calculateChange(currentRate: number, previousRate?: number) {
  if (!previousRate) {
    return {
      change: 0,
      changePercent: 0,
    };
  }

  const change = currentRate - previousRate;

  return {
    change,
    changePercent: (change / previousRate) * 100,
  };
}

export function getWatchlistStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  return date.toISOString().slice(0, 10);
}

export function toWatchlistQuoteOptions(
  currencies: FrankfurterCurrency[] = [],
  base: CurrencyCode,
) {
  return currencies
    .filter((currency) => currency.iso_code !== base)
    .map<CurrencyOption>((currency) => ({
      code: currency.iso_code,
      label: `${currency.iso_code} - ${currency.name}`,
    }));
}

export function getFirstAvailableQuote(
  options: CurrencyOption[],
  selectedQuotes: CurrencyCode[],
) {
  return (
    options.find((option) => !selectedQuotes.includes(option.code))?.code ??
    options[0]?.code ??
    ""
  );
}

function normalizeSparkline(rates: FrankfurterRate[]) {
  const values = rates.map((rate) => rate.rate);

  if (!values.length) {
    return [20, 20];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values.map((value) => {
    const normalized = (value - min) / range;

    return Number((36 - normalized * 32).toFixed(2));
  });
}

export function toWatchlistPairs(params: {
  base: CurrencyCode;
  currencies: FrankfurterCurrency[];
  historicalRates: FrankfurterRate[];
  latestRates: FrankfurterRate[];
  quotes: CurrencyCode[];
}) {
  const currencyNameMap = new Map(
    params.currencies.map((currency) => [currency.iso_code, currency.name] as const),
  );
  const latestRateMap = new Map(
    params.latestRates.map((rate) => [rate.quote, rate] as const),
  );

  return params.quotes.flatMap<WatchlistPair>((quote) => {
    const latestRate = latestRateMap.get(quote);

    if (!latestRate) {
      return [];
    }

    const quoteHistory = params.historicalRates
      .filter((rate) => rate.quote === quote)
      .sort((first, second) => first.date.localeCompare(second.date));
    const firstHistoricalRate = quoteHistory[0]?.rate;
    const { change, changePercent } = calculateChange(
      latestRate.rate,
      firstHistoricalRate,
    );

    return {
      base: params.base,
      change,
      changePercent,
      direction: toDirection(change),
      iconLabel: formatIconLabel(params.base, quote),
      id: `${params.base}-${quote}`,
      name: `${currencyNameMap.get(params.base) ?? params.base} / ${
        currencyNameMap.get(quote) ?? quote
      }`,
      pair: `${params.base}/${quote}`,
      quote,
      rate: latestRate.rate,
      sparkline: normalizeSparkline(quoteHistory),
    };
  });
}
