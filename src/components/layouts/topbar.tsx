"use client";

import { Bell, CircleUserRound, Moon, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

type TopbarProps = {
  searchPlaceholder?: string;
};

export function Topbar({
  searchPlaceholder = "Search currencies, symbols...",
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#c2c6d6] bg-[#f7f9fb]/95 px-4 backdrop-blur md:px-8">
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-bold text-[#0058be] md:text-xl">
          Finance Insight Demo
        </p>
      </div>

      <label className="relative hidden w-full max-w-xl md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-[#727785]" />
        <span className="sr-only">{searchPlaceholder}</span>
        <input
          className="h-11 w-full rounded-lg border border-[#c2c6d6] bg-white py-2 pl-10 pr-4 text-sm text-[#191c1e] outline-none transition focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20"
          placeholder={searchPlaceholder}
          type="search"
        />
      </label>

      <div className="flex items-center gap-2">
        <Button aria-label="Notifications" size="icon" variant="ghost">
          <Bell className="size-5" />
        </Button>
        <Button aria-label="Toggle contrast" size="icon" variant="ghost">
          <Moon className="size-5" />
        </Button>
        <Button aria-label="Account" size="icon" variant="ghost">
          <CircleUserRound className="size-6 text-[#0058be]" />
        </Button>
      </div>
    </header>
  );
}
