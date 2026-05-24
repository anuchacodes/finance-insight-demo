import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/queryKeys";
import type { CurrencyCode } from "@/lib/types/finance";
import { getSingleRate } from "@/services/frankfurter-service";

type UseSingleRateOptions = {
  enabled?: boolean;
};

export function useSingleRate(
  base: CurrencyCode,
  quote: CurrencyCode,
  options: UseSingleRateOptions = {},
) {
  return useQuery({
    enabled: options.enabled ?? Boolean(base && quote),
    queryFn: () => getSingleRate(base, quote),
    queryKey: queryKeys.exchangeRates.single(base, quote),
  });
}
