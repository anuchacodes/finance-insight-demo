import { GeneralSettingsCard } from "@/components/settings/general-settings-card";
import { SettingsNav } from "@/components/settings/settings-nav";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  defaultCurrencyOptions,
  refreshIntervalOptions,
  settingsTabs,
} from "@/lib/mock/settings";

export default function SettingsPage() {
  return (
    <DashboardLayout searchPlaceholder="Search settings...">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-[#191c1e] md:text-5xl">
            Settings
          </h1>
          <p className="mt-3 text-lg text-[#424754]">
            Manage your account preferences and system configurations.
          </p>
        </header>

        <div className="flex flex-col gap-8 md:flex-row">
          <SettingsNav
            activeTab="general"
            tabs={settingsTabs}
          />

          <div className="flex flex-1 flex-col gap-6">
            <GeneralSettingsCard
              currencyOptions={defaultCurrencyOptions}
              refreshOptions={refreshIntervalOptions}
            />
            <div className="flex justify-end">
              <Button className="h-12 px-6">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
