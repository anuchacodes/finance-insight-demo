"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { type UiStateKey, useUiStateStore } from "@/store/ui-state-store";

type LoadingStateProps = {
  className?: string;
  description?: string;
  stateKey?: UiStateKey;
  title?: string;
};

export function LoadingState({
  className,
  description = "Loading market data...",
  stateKey,
  title = "Please wait",
}: LoadingStateProps) {
  const isLoading = useUiStateStore((state) =>
    stateKey ? state.loading[stateKey] : true,
  );

  if (stateKey && !isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[#c2c6d6] bg-white/70 p-6 text-center",
        className,
      )}
    >
      <Loader2 className="mb-3 size-5 animate-spin text-[#0058be]" />
      <p className="text-sm font-semibold text-[#191c1e]">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-[#424754]">{description}</p>
    </div>
  );
}
