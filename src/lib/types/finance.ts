export type TrendDirection = "up" | "down" | "flat";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD";

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

export type ConverterDefaults = {
  from: CurrencyCode;
  to: CurrencyCode;
  amount: number;
  rate: number;
};
