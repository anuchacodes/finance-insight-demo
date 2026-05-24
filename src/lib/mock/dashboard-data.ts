import type {
  ConverterDefaults,
  ExchangeRate,
  HistoricalRatePoint,
  OverviewMetric,
  CurrencyPair,
} from "@/lib/types/finance";

export const overviewMetrics: OverviewMetric[] = [
  {
    id: "base-currency",
    label: "Base Currency",
    value: "USD",
    description: "US Dollar",
    icon: "globe",
  },
  {
    id: "tracked",
    label: "Total Currencies Tracked",
    value: "34",
    description: "Live market symbols",
    icon: "chart",
    badge: "Active",
  },
  {
    id: "updated",
    label: "Last Updated",
    value: "Just now",
    description: "Real-time sync active",
    icon: "clock",
  },
  {
    id: "trend",
    label: "Market Trend (24h)",
    value: "+1.2%",
    description: "Avg volatility",
    icon: "trend",
    trend: "up",
  },
];

export const historicalRates: HistoricalRatePoint[] = [
  { date: "Oct 01", rate: 1.071 },
  { date: "Oct 04", rate: 1.076 },
  { date: "Oct 07", rate: 1.074 },
  { date: "Oct 10", rate: 1.081 },
  { date: "Oct 13", rate: 1.089 },
  { date: "Oct 16", rate: 1.086 },
  { date: "Oct 19", rate: 1.088 },
  { date: "Oct 22", rate: 1.095 },
  { date: "Oct 25", rate: 1.101 },
];

export const watchlistItems: CurrencyPair[] = [
  {
    id: "eur-usd",
    base: "EUR",
    quote: "USD",
    name: "Euro",
    rate: 1.0845,
    change24h: 0.12,
    direction: "up",
  },
  {
    id: "gbp-usd",
    base: "GBP",
    quote: "USD",
    name: "British Pound",
    rate: 1.263,
    change24h: -0.05,
    direction: "down",
  },
  {
    id: "usd-jpy",
    base: "USD",
    quote: "JPY",
    name: "Japanese Yen",
    rate: 150.24,
    change24h: 0.31,
    direction: "up",
  },
];

export const exchangeRates: ExchangeRate[] = [
  {
    code: "EUR",
    name: "Euro",
    rate: 1.0845,
    change24h: 0.12,
    direction: "up",
  },
  {
    code: "GBP",
    name: "British Pound",
    rate: 1.263,
    change24h: -0.05,
    direction: "down",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    rate: 150.24,
    change24h: 0.31,
    direction: "up",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    rate: 1.354,
    change24h: 0.08,
    direction: "up",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    rate: 0.652,
    change24h: -0.15,
    direction: "down",
  },
];

export const converterDefaults: ConverterDefaults = {
  from: "USD",
  to: "EUR",
  amount: 1000,
  currencyOptions: [
    { code: "USD", label: "USD" },
    { code: "EUR", label: "EUR" },
    { code: "GBP", label: "GBP" },
    { code: "JPY", label: "JPY" },
    { code: "CAD", label: "CAD" },
    { code: "AUD", label: "AUD" },
  ],
  rate: 0.9221,
};
