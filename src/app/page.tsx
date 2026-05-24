import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardHomeClient } from "@/components/dashboard/dashboard-home-client";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardHomeClient />
    </DashboardLayout>
  );
}
