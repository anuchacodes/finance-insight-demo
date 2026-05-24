import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/queryKeys";
import {
  getLatestRates,
  type LatestRatesParams,
} from "@/services/frankfurter-service";

type UseLatestRatesOptions = {
  enabled?: boolean;
  refetchInterval?: false | number;
};

export function useLatestRates(
  params: LatestRatesParams = {},
  options: UseLatestRatesOptions = {},
) {
  return useQuery({
    enabled: options.enabled ?? true,
    queryFn: () => getLatestRates(params),
    queryKey: queryKeys.exchangeRates.latest(params),
    refetchInterval: options.refetchInterval,
  });
}
