"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavigation } from "@/components/layouts/navigation";
import { useTranslations } from "@/lib/i18n/use-translations";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col bg-[#2d3133] px-4 py-6 text-[#eff1f3] md:flex">
      <div className="mb-9 px-1">
        <Link href="/" className="block">
          <p className="text-2xl font-bold tracking-tight text-white">
            {t.layout.brandName}
          </p>
          <p className="mt-1 text-sm text-[#bec6e0]">
            {t.layout.navigationSubtitle}
          </p>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {dashboardNavigation.map((item) => {
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
              {t.navigation[item.labelKey]}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
