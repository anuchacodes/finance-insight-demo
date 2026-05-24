"use client";

import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type UiStateKey, useUiStateStore } from "@/store/ui-state-store";

type EmptyStateProps = {
  actionLabel?: string;
  className?: string;
  description?: string;
  onAction?: () => void;
  stateKey?: UiStateKey;
  title?: string;
};

export function EmptyState({
  actionLabel,
  className,
  description,
  onAction,
  stateKey,
  title,
}: EmptyStateProps) {
  const storeEmpty = useUiStateStore((state) =>
    stateKey ? state.empty[stateKey] : undefined,
  );
  const resolvedTitle = title ?? storeEmpty?.title ?? "No data yet";
  const resolvedDescription =
    description ??
    storeEmpty?.description ??
    "There is nothing to show for the current selection.";

  if (stateKey && !storeEmpty && !title) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-[#c2c6d6] bg-[#f7f9fb] p-6 text-center",
        className,
      )}
    >
      <Inbox className="mb-3 size-5 text-[#727785]" />
      <p className="text-sm font-semibold text-[#191c1e]">{resolvedTitle}</p>
      <p className="mt-1 max-w-sm text-sm text-[#424754]">
        {resolvedDescription}
      </p>
      {actionLabel && onAction ? (
        <Button className="mt-4" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
