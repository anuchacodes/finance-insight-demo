"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n/use-translations";
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
  const t = useTranslations();
  const storeError = useUiStateStore((state) =>
    stateKey ? state.errors[stateKey] : undefined,
  );
  const resolvedTitle = title ?? storeError?.title ?? t.common.unableToLoadData;
  const resolvedDescription =
    description ??
    storeError?.description ??
    t.common.unableToLoadDescription;

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
          {t.common.retry}
        </Button>
      ) : null}
    </div>
  );
}
