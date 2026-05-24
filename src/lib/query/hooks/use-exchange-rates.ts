import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/queryKeys";
import {
  getLatestRates,
  type LatestRatesParams,
} from "@/services/frankfurter-service";

export function useLatestRates(params: LatestRatesParams = {}) {
  return useQuery({
    queryFn: () => getLatestRates(params),
    queryKey: queryKeys.exchangeRates.latest(params),
  });
}
