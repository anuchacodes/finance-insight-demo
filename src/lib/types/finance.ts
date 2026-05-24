export type TrendDirection = "up" | "down" | "flat";

export type CurrencyCode = string;

export type HistoricalRange = "1W" | "1M" | "1Y";

export type CurrencyOption = {
  code: CurrencyCode;
  label: string;
};

export type OverviewMetric = {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: "globe" | "chart" | "clock" | "trend";
  badge?: string;
  trend?: TrendDirection;
};

export type HistoricalRatePoint = {
  date: string;
  rate: number;
};

export type CurrencyPair = {
  id: string;
  base: CurrencyCode;
  quote: CurrencyCode;
  name: string;
  rate: number;
  change24h: number;
  direction: TrendDirection;
};

export type ExchangeRate = {
  code: CurrencyCode;
  name: string;
  rate: number;
  change24h: number;
  direction: TrendDirection;
};

export type CurrencyListItem = {
  change24h: number;
  code: CurrencyCode;
  currentRate: number;
  direction: TrendDirection;
  name: string;
  symbol: string;
};

export type ConverterDefaults = {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
  currencyOptions: CurrencyOption[];
  rate: number;
};
