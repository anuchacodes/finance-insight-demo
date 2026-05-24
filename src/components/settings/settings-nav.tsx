"use client";

import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SettingsTab } from "@/lib/adapters/settings";
import { cn } from "@/lib/utils";

type SettingsNavProps = {
  activeTab: string;
  onTabChange?: (tab: string) => void;
  tabs: SettingsTab[];
};

export function SettingsNav({ activeTab, onTabChange, tabs }: SettingsNavProps) {
  return (
    <aside className="w-full shrink-0 md:w-64">
      <nav className="flex flex-col gap-1 md:sticky md:top-24">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <Button
              key={tab.id}
              className={cn(
                "h-12 justify-between rounded-lg px-4 text-left text-sm shadow-none",
                isActive
                  ? "bg-[#f2f4f6] font-bold text-[#0058be] hover:bg-[#f2f4f6]"
                  : "bg-transparent text-[#424754] hover:bg-white hover:text-[#191c1e]",
              )}
              variant="ghost"
              onClick={() => onTabChange?.(tab.id)}
            >
              {tab.label}
              <ChevronRight
                className={cn(
                  "size-4",
                  isActive ? "text-[#0058be]" : "text-[#c2c6d6]",
                )}
              />
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
