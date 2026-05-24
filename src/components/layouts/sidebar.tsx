"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  Banknote,
  History,
  LayoutDashboard,
  Settings,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/currencies", label: "Currencies", icon: Banknote },
  { href: "/converter", label: "Converter", icon: ArrowLeftRight },
  { href: "/historical-rates", label: "Historical Rates", icon: History },
  { href: "/watchlist", label: "Watchlist", icon: Star },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-[#2d3133] px-4 py-6 text-[#eff1f3] md:flex">
      <div className="mb-9 px-1">
        <Link href="/" className="block">
          <p className="text-2xl font-bold tracking-tight text-white">
            Finance Insight
          </p>
          <p className="mt-1 text-sm text-[#bec6e0]">SaaS Analytics</p>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-[#d8dadc] transition-colors hover:bg-[#3f465c] hover:text-white",
                isActive && "bg-[#3f465c] text-[#adc6ff]",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
