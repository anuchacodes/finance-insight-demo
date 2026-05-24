import type { CurrencyCode, CurrencyOption } from "@/lib/types/finance";
import type {
  FrankfurterCurrency,
  FrankfurterRate,
} from "@/services/frankfurter-service";

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

function formatTimestamp(date?: string) {
  if (!date) {
    return "Live market rate";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function toConverterCurrencyOptions(
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

export function toConversionQuote(params: {
  amount: number;
  from: CurrencyCode;
  rate?: FrankfurterRate;
  to: CurrencyCode;
}): ConversionQuote {
  const resolvedRate =
    params.from === params.to ? 1 : params.rate?.rate ?? 0;

  return {
    amount: params.amount,
    from: params.from,
    inverseRate: resolvedRate ? 1 / resolvedRate : 0,
    rate: resolvedRate,
    result: params.amount * resolvedRate,
    timestamp: formatTimestamp(params.rate?.date),
    to: params.to,
  };
}

export function toRecentConversion(quote: ConversionQuote): RecentConversion {
  return {
    convertedAmount: quote.result,
    from: quote.from,
    id: `${quote.from}-${quote.to}-${Date.now()}`,
    inputAmount: quote.amount,
    rate: quote.rate,
    timestamp: quote.timestamp,
    to: quote.to,
  };
}
