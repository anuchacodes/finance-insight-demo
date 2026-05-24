"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type UiStateKey, useUiStateStore } from "@/store/ui-state-store";

type ErrorStateProps = {
  className?: string;
  description?: string;
  onRetry?: () => void;
  stateKey?: UiStateKey;
  title?: string;
};

export function ErrorState({
  className,
  description,
  onRetry,
  stateKey,
  title,
}: ErrorStateProps) {
  const storeError = useUiStateStore((state) =>
    stateKey ? state.errors[stateKey] : undefined,
  );
  const resolvedTitle = title ?? storeError?.title ?? "Unable to load data";
  const resolvedDescription =
    description ??
    storeError?.description ??
    "The request could not be completed. Try again in a moment.";

  if (stateKey && !storeError && !title) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center rounded-lg border border-[#ffdad6] bg-[#ffdad6]/35 p-6 text-center",
        className,
      )}
    >
      <AlertTriangle className="mb-3 size-5 text-[#ba1a1a]" />
      <p className="text-sm font-semibold text-[#93000a]">{resolvedTitle}</p>
      <p className="mt-1 max-w-sm text-sm text-[#424754]">
        {resolvedDescription}
      </p>
      {onRetry ? (
        <Button className="mt-4" size="sm" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
