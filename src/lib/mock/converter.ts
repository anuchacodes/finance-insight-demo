import type { CurrencyCode } from "@/lib/types/finance";

export type ConverterCurrencyOption = {
  code: CurrencyCode;
  label: string;
};

export type ConversionQuote = {
  amount: number;
  from: CurrencyCode;
  inverseRate: number;
  rate: number;
  result: number;
  timestamp: string;
  to: CurrencyCode;
};

export type RecentConversion = {
  convertedAmount: number;
  from: CurrencyCode;
  id: string;
  inputAmount: number;
  rate: number;
  timestamp: string;
  to: CurrencyCode;
};

export const converterCurrencyOptions: ConverterCurrencyOption[] = [
  { code: "USD", label: "USD - US Dollar" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - British Pound" },
  { code: "JPY", label: "JPY - Japanese Yen" },
  { code: "CAD", label: "CAD - Canadian Dollar" },
  { code: "AUD", label: "AUD - Australian Dollar" },
];

export const defaultConversionQuote: ConversionQuote = {
  amount: 1000,
  from: "USD",
  inverseRate: 1.08879,
  rate: 0.91845,
  result: 918.45,
  timestamp: "14:32 UTC",
  to: "EUR",
};

export const recentConversions: RecentConversion[] = [
  {
    id: "gbp-usd-10500",
    inputAmount: 10500,
    from: "GBP",
    to: "USD",
    convertedAmount: 12840.22,
    rate: 1.2228,
    timestamp: "Oct 24, 2023 • 09:15 AM",
  },
  {
    id: "eur-jpy-500",
    inputAmount: 500,
    from: "EUR",
    to: "JPY",
    convertedAmount: 79450,
    rate: 158.9,
    timestamp: "Oct 23, 2023 • 14:22 PM",
  },
  {
    id: "usd-cad-2000",
    inputAmount: 2000,
    from: "USD",
    to: "CAD",
    convertedAmount: 2740.1,
    rate: 1.37,
    timestamp: "Oct 22, 2023 • 11:05 AM",
  },
];
