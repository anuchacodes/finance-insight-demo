import type { TrendDirection } from "@/lib/types/finance";

export type CurrencyListItem = {
  change24h: number;
  code: string;
  currentRate: number;
  direction: TrendDirection;
  name: string;
  symbol: string;
};

export const currencyBaseOptions = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
];

export const currencies: CurrencyListItem[] = [
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    currentRate: 1.0924,
    change24h: 0.42,
    direction: "up",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    currentRate: 1.265,
    change24h: -0.15,
    direction: "down",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    currentRate: 150.32,
    change24h: 0.1,
    direction: "up",
  },
];

export const currenciesPagination = {
  from: 1,
  page: 1,
  pageSize: 10,
  to: 10,
  total: 150,
};
