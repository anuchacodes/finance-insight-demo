import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { SettingsPageClient } from "@/components/settings/settings-page-client";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <SettingsPageClient />
    </DashboardLayout>
  );
}
