import type { ReactNode } from "react";

import { Sidebar } from "@/components/layouts/sidebar";
import { Topbar } from "@/components/layouts/topbar";

type DashboardLayoutProps = {
  children: ReactNode;
  searchPlaceholder?: string;
};

export function DashboardLayout({
  children,
  searchPlaceholder,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Sidebar />
      <div className="min-h-screen md:pl-[260px]">
        <Topbar searchPlaceholder={searchPlaceholder} />
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
