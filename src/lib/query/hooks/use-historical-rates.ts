import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/queryKeys";
import {
  getHistoricalRates,
  type HistoricalRatesParams,
} from "@/services/frankfurter-service";

type UseHistoricalRatesOptions = {
  enabled?: boolean;
};

export function useHistoricalRates(
  params: HistoricalRatesParams,
  options: UseHistoricalRatesOptions = {},
) {
  return useQuery({
    enabled: options.enabled ?? Boolean(params.base && params.quotes.length),
    queryFn: () => getHistoricalRates(params),
    queryKey: queryKeys.exchangeRates.historical(params),
  });
}
