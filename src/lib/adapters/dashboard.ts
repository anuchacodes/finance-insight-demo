import type {
  ConverterDefaults,
  CurrencyCode,
  CurrencyOption,
  CurrencyPair,
  ExchangeRate,
  HistoricalRange,
  HistoricalRatePoint,
  OverviewMetric,
  TrendDirection,
} from "@/lib/types/finance";
import type {
  FrankfurterCurrency,
  FrankfurterRate,
} from "@/services/frankfurter-service";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type CurrencyNameMap = Map<CurrencyCode, string>;
type RateChangeMap = Map<
  CurrencyCode,
  {
    change24h: number;
    direction: TrendDirection;
  }
>;

function getCurrencyName(code: CurrencyCode, currencyNames: CurrencyNameMap) {
  return currencyNames.get(code) ?? code;
}

function formatDateLabel(date: string, lang = "en") {
  const locale = lang === "th" ? "th-TH" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

function toDirection(change: number): TrendDirection {
  if (change > 0) {
    return "up";
  }

  if (change < 0) {
    return "down";
  }

  return "flat";
}

function calculateChange(currentRate: number, previousRate?: number) {
  if (!previousRate) {
    return 0;
  }

  return ((currentRate - previousRate) / previousRate) * 100;
}

export function getHistoricalRangeStartDate(range: HistoricalRange) {
  const daysByRange: Record<HistoricalRange, number> = {
    "1M": 30,
    "1W": 7,
    "1Y": 365,
  };
  const date = new Date();
  date.setDate(date.getDate() - daysByRange[range]);

  return date.toISOString().slice(0, 10);
}

export function getPreviousRateDate(date: string) {
  const previousDate = new Date(`${date}T00:00:00`);
  previousDate.setDate(previousDate.getDate() - 1);

  return previousDate.toISOString().slice(0, 10);
}

export function getPreviousRateLookbackStartDate(date: string) {
  const previousDate = new Date(`${date}T00:00:00`);
  previousDate.setDate(previousDate.getDate() - 7);

  return previousDate.toISOString().slice(0, 10);
}

export function toCurrencyOptions(currencies: FrankfurterCurrency[] = []) {
  return currencies.map<CurrencyOption>((currency) => ({
    code: currency.iso_code,
    label: currency.iso_code,
  }));
}

export function toCurrencyNameMap(currencies: FrankfurterCurrency[] = []) {
  return new Map(
    currencies.map((currency) => [currency.iso_code, currency.name] as const),
  );
}

export function toMostRecentRates(rates: FrankfurterRate[] = []) {
  const latestDate = rates.reduce(
    (latest, rate) => (rate.date > latest ? rate.date : latest),
    "",
  );

  return latestDate ? rates.filter((rate) => rate.date === latestDate) : [];
}

export function toRateChangeMap(
  latestRates: FrankfurterRate[] = [],
  previousRates: FrankfurterRate[] = [],
) {
  const previousRateMap = new Map(
    previousRates.map((rate) => [rate.quote, rate.rate] as const),
  );

  return new Map(
    latestRates.map((rate) => {
      const change24h = calculateChange(rate.rate, previousRateMap.get(rate.quote));

      return [
        rate.quote,
        {
          change24h,
          direction: toDirection(change24h),
        },
      ] as const;
    }),
  );
}

export function toOverviewMetrics(params: {
  baseCurrency: CurrencyCode;
  currencies: FrankfurterCurrency[];
  latestRates: FrankfurterRate[];
  rateChanges: RateChangeMap;
  t: Dictionary;
  language: string;
}): OverviewMetric[] {
  const updatedDate = params.latestRates[0]?.date;
  const averageChange =
    params.rateChanges.size > 0
      ? Array.from(params.rateChanges.values()).reduce(
          (total, item) => total + item.change24h,
          0,
        ) / params.rateChanges.size
      : 0;

  return [
    {
      description: getCurrencyName(
        params.baseCurrency,
        toCurrencyNameMap(params.currencies),
      ),
      icon: "globe",
      id: "base-currency",
      label: params.t.dashboard.baseCurrencyLabel,
      value: params.baseCurrency,
    },
    {
      badge: params.latestRates.length ? params.t.dashboard.activeBadge : undefined,
      description: params.t.dashboard.liveMarketSymbols,
      icon: "chart",
      id: "tracked",
      label: params.t.dashboard.currenciesTrackedLabel,
      value: String(params.latestRates.length),
    },
    {
      description: params.t.dashboard.marketFeedDesc,
      icon: "clock",
      id: "updated",
      label: params.t.dashboard.lastUpdatedLabel,
      value: updatedDate ? formatDateLabel(updatedDate, params.language) : params.t.dashboard.noData,
    },
    {
      description: params.t.dashboard.averageMoveDesc,
      icon: "trend",
      id: "trend",
      label: params.t.dashboard.marketTrendLabel,
      trend: toDirection(averageChange),
      value: `${averageChange >= 0 ? "+" : ""}${averageChange.toFixed(2)}%`,
    },
  ];
}

export function toExchangeRates(
  latestRates: FrankfurterRate[] = [],
  currencyNames: CurrencyNameMap,
  rateChanges: RateChangeMap,
) {
  return latestRates.map<ExchangeRate>((rate) => ({
    change24h: rateChanges.get(rate.quote)?.change24h ?? 0,
    code: rate.quote,
    direction: rateChanges.get(rate.quote)?.direction ?? "flat",
    name: getCurrencyName(rate.quote, currencyNames),
    rate: rate.rate,
  }));
}

export function toWatchlistItems(
  latestRates: FrankfurterRate[] = [],
  currencyNames: CurrencyNameMap,
  rateChanges: RateChangeMap,
  watchlistQuotes: CurrencyCode[],
) {
  const latestRateMap = new Map(
    latestRates.map((rate) => [rate.quote, rate] as const),
  );

  return watchlistQuotes.flatMap<CurrencyPair>((quote) => {
    const rate = latestRateMap.get(quote);

    if (!rate) {
      return [];
    }

    return {
      base: rate.base,
      change24h: rateChanges.get(rate.quote)?.change24h ?? 0,
      direction: rateChanges.get(rate.quote)?.direction ?? "flat",
      id: `${rate.base}-${rate.quote}`,
      name: getCurrencyName(rate.quote, currencyNames),
      quote: rate.quote,
      rate: rate.rate,
    };
  });
}

export function toHistoricalRatePoints(rates: FrankfurterRate[] = [], language = "en") {
  return rates.map<HistoricalRatePoint>((rate) => ({
    date: formatDateLabel(rate.date, language),
    rate: rate.rate,
  }));
}

export function toConverterDefaults(params: {
  amount: number;
  currencyOptions: CurrencyOption[];
  fallbackRate?: FrankfurterRate;
  from: CurrencyCode;
  quoteRate?: FrankfurterRate;
  to: CurrencyCode;
}): ConverterDefaults {
  return {
    amount: params.amount,
    currencyOptions: params.currencyOptions,
    from: params.from,
    rate:
      params.from === params.to
        ? 1
        : params.quoteRate?.rate ?? params.fallbackRate?.rate ?? 1,
    to: params.to,
  };
}
