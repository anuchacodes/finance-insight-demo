import type { CurrencyCode, CurrencyOption } from "@/lib/types/finance";
import type {
  FrankfurterCurrency,
  FrankfurterRate,
} from "@/services/frankfurter-service";

export type HistoricalAnalysisRange = "7D" | "30D" | "90D" | "1Y";

export type HistoricalChartPoint = {
  date: string;
  rate: number;
};

export type DailyRateRow = {
  change: number;
  date: string;
  rate: number;
};

export const historicalAnalysisRanges: HistoricalAnalysisRange[] = [
  "7D",
  "30D",
  "90D",
  "1Y",
];

function formatChartDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

function calculateChange(currentRate: number, previousRate?: number) {
  if (!previousRate) {
    return 0;
  }

  return ((currentRate - previousRate) / previousRate) * 100;
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function getHistoricalStartDate(range: HistoricalAnalysisRange) {
  const daysByRange: Record<HistoricalAnalysisRange, number> = {
    "1Y": 365,
    "30D": 30,
    "7D": 7,
    "90D": 90,
  };
  const date = new Date();
  date.setDate(date.getDate() - daysByRange[range]);

  return date.toISOString().slice(0, 10);
}

export function toHistoricalCurrencyOptions(
  currencies: FrankfurterCurrency[] = [],
) {
  return currencies.map<CurrencyOption>((currency) => ({
    code: currency.iso_code,
    label: `${currency.iso_code} - ${currency.name}`,
  }));
}

export function getFirstDifferentCurrency(
  options: CurrencyOption[],
  currency: CurrencyCode,
) {
  return options.find((option) => option.code !== currency)?.code ?? currency;
}

export function toSortedHistoricalRates(rates: FrankfurterRate[] = []) {
  return [...rates].sort((first, second) =>
    first.date.localeCompare(second.date),
  );
}

export function toHistoricalChartPoints(rates: FrankfurterRate[] = []) {
  return toSortedHistoricalRates(rates).map<HistoricalChartPoint>((rate) => ({
    date: formatChartDate(rate.date),
    rate: rate.rate,
  }));
}

export function toDailyRateRows(rates: FrankfurterRate[] = []) {
  const sortedRates = toSortedHistoricalRates(rates);

  return sortedRates
    .map<DailyRateRow>((rate, index) => ({
      change: calculateChange(rate.rate, sortedRates[index - 1]?.rate),
      date: rate.date,
      rate: rate.rate,
    }))
    .reverse();
}
