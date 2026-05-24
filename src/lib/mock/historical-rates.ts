import type { CurrencyCode } from "@/lib/types/finance";

export type HistoricalRange = "7D" | "30D" | "90D" | "1Y";

export type HistoricalCurrencyOption = {
  code: CurrencyCode;
  label: string;
};

export type HistoricalChartPoint = {
  date: string;
  rate: number;
};

export type DailyRateRow = {
  change: number;
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
};

export const historicalRanges: HistoricalRange[] = ["7D", "30D", "90D", "1Y"];

export const historicalBaseOptions: HistoricalCurrencyOption[] = [
  { code: "USD", label: "USD - US Dollar" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - British Pound" },
];

export const historicalQuoteOptions: HistoricalCurrencyOption[] = [
  { code: "EUR", label: "EUR - Euro" },
  { code: "JPY", label: "JPY - Japanese Yen" },
  { code: "CAD", label: "CAD - Canadian Dollar" },
];

export const historicalChartData: HistoricalChartPoint[] = [
  { date: "Oct 1", rate: 0.9108 },
  { date: "Oct 4", rate: 0.9094 },
  { date: "Oct 8", rate: 0.9188 },
  { date: "Oct 11", rate: 0.9141 },
  { date: "Oct 15", rate: 0.9219 },
  { date: "Oct 18", rate: 0.9238 },
  { date: "Oct 22", rate: 0.9326 },
  { date: "Oct 25", rate: 0.9401 },
  { date: "Oct 29", rate: 0.9372 },
];

export const dailyRates: DailyRateRow[] = [
  {
    date: "2023-10-31",
    open: 0.9412,
    high: 0.945,
    low: 0.939,
    close: 0.9435,
    change: 0.24,
  },
  {
    date: "2023-10-30",
    open: 0.9455,
    high: 0.948,
    low: 0.9405,
    close: 0.9412,
    change: -0.45,
  },
  {
    date: "2023-10-27",
    open: 0.948,
    high: 0.951,
    low: 0.945,
    close: 0.9455,
    change: -0.26,
  },
  {
    date: "2023-10-26",
    open: 0.943,
    high: 0.949,
    low: 0.942,
    close: 0.948,
    change: 0.53,
  },
];
