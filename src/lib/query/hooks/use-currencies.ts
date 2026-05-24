import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query/queryKeys";
import { getCurrencies } from "@/services/frankfurter-service";

export function useCurrencies() {
  return useQuery({
    queryFn: getCurrencies,
    queryKey: queryKeys.currencies.all,
  });
}
