export type SettingsTab = {
  id: string;
  label: string;
};

export type SettingsOption = {
  label: string;
  value: string;
};

export const settingsTabs: SettingsTab[] = [
  { id: "general", label: "General" },
];

export const defaultCurrencyOptions: SettingsOption[] = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
];

export const refreshIntervalOptions: SettingsOption[] = [
  { label: "Manual (Off)", value: "0" },
  { label: "Every 30 seconds", value: "30" },
  { label: "Every 1 minute", value: "60" },
  { label: "Every 5 minutes", value: "300" },
];
