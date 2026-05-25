"use client";

import { useTranslations } from "@/lib/i18n/use-translations";

export function DashboardHeader() {
  const t = useTranslations();

  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-[#191c1e] md:text-4xl">
        {t.dashboard.pageTitle}
      </h1>
      <p className="mt-2 text-base text-[#424754]">
        {t.dashboard.pageDescription}
      </p>
    </header>
  );
}
