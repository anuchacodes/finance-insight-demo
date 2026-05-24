import type { TrendDirection } from "@/lib/types/finance";

export type WatchlistPair = {
  change: number;
  changePercent: number;
  direction: TrendDirection;
  iconLabel: string;
  id: string;
  name: string;
  pair: string;
  rate: number;
  sparkline: number[];
};

export const watchlistPairs: WatchlistPair[] = [
  {
    id: "eur-usd",
    pair: "EUR/USD",
    name: "Euro / US Dollar",
    iconLabel: "€$",
    rate: 1.0845,
    change: 0.0032,
    changePercent: 0.3,
    direction: "up",
    sparkline: [30, 25, 28, 15, 20, 10, 18, 5, 12, 2, 8],
  },
  {
    id: "gbp-usd",
    pair: "GBP/USD",
    name: "British Pound / US Dollar",
    iconLabel: "£$",
    rate: 1.263,
    change: -0.0015,
    changePercent: -0.12,
    direction: "down",
    sparkline: [5, 12, 8, 18, 15, 25, 20, 32, 28, 38, 35],
  },
  {
    id: "usd-jpy",
    pair: "USD/JPY",
    name: "US Dollar / Japanese Yen",
    iconLabel: "$¥",
    rate: 150.25,
    change: 0.45,
    changePercent: 0.3,
    direction: "up",
    sparkline: [35, 38, 30, 32, 25, 28, 15, 20, 10, 12, 5],
  },
  {
    id: "aud-usd",
    pair: "AUD/USD",
    name: "Australian Dollar / US Dollar",
    iconLabel: "A$",
    rate: 0.6542,
    change: 0.0011,
    changePercent: 0.17,
    direction: "up",
    sparkline: [25, 22, 28, 20, 15, 18, 10, 12, 5, 8, 2],
  },
];
