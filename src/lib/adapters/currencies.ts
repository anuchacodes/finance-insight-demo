import type {
  CurrencyCode,
  CurrencyListItem,
  CurrencyOption,
  TrendDirection,
} from "@/lib/types/finance";
import type {
  FrankfurterCurrency,
  FrankfurterRate,
} from "@/services/frankfurter-service";

export type CurrencySortKey = "code" | "name" | "rate" | "change";

export type CurrencyPagination = {
  from: number;
  page: number;
  pageSize: number;
  to: number;
  total: number;
};

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

export function getPreviousRateDate(date: string) {
  const previousDate = new Date(`${date}T00:00:00`);
  previousDate.setDate(previousDate.getDate() - 1);

  return previousDate.toISOString().slice(0, 10);
}

export function toMostRecentRates(rates: FrankfurterRate[] = []) {
  const latestDate = rates.reduce(
    (latest, rate) => (rate.date > latest ? rate.date : latest),
    "",
  );

  return latestDate ? rates.filter((rate) => rate.date === latestDate) : [];
}

export function toCurrencyBaseOptions(currencies: FrankfurterCurrency[] = []) {
  return currencies.map<CurrencyOption>((currency) => ({
    code: currency.iso_code,
    label: `${currency.iso_code} - ${currency.name}`,
  }));
}

export function toCurrencyListItems(params: {
  baseCurrency: CurrencyCode;
  currencies: FrankfurterCurrency[];
  latestRates: FrankfurterRate[];
  previousRates: FrankfurterRate[];
}) {
  const currencyMap = new Map(
    params.currencies.map((currency) => [currency.iso_code, currency] as const),
  );
  const previousRateMap = new Map(
    params.previousRates.map((rate) => [rate.quote, rate.rate] as const),
  );

  return params.latestRates.flatMap<CurrencyListItem>((rate) => {
    const currency = currencyMap.get(rate.quote);

    if (!currency || rate.quote === params.baseCurrency) {
      return [];
    }

    const change24h = calculateChange(rate.rate, previousRateMap.get(rate.quote));

    return {
      change24h,
      code: rate.quote,
      currentRate: rate.rate,
      direction: toDirection(change24h),
      name: currency.name,
      symbol: currency.symbol ?? "-",
    };
  });
}

export function filterCurrencyItems(items: CurrencyListItem[], search: string) {
  const query = search.trim().toLowerCase();

  if (!query) {
    return items;
  }

  return items.filter(
    (item) =>
      item.code.toLowerCase().includes(query) ||
      item.name.toLowerCase().includes(query),
  );
}

export function sortCurrencyItems(
  items: CurrencyListItem[],
  sortKey: CurrencySortKey,
) {
  return [...items].sort((first, second) => {
    if (sortKey === "rate") {
      return second.currentRate - first.currentRate;
    }

    if (sortKey === "change") {
      return second.change24h - first.change24h;
    }

    return first[sortKey].localeCompare(second[sortKey]);
  });
}

export function paginateCurrencyItems(
  items: CurrencyListItem[],
  page: number,
  pageSize: number,
) {
  const start = (page - 1) * pageSize;

  return items.slice(start, start + pageSize);
}

export function getCurrencyPagination(
  total: number,
  page: number,
  pageSize: number,
): CurrencyPagination {
  if (!total) {
    return {
      from: 0,
      page,
      pageSize,
      to: 0,
      total,
    };
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return {
    from,
    page,
    pageSize,
    to,
    total,
  };
}
