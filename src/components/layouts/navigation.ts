import {
  ArrowLeftRight,
  Banknote,
  History,
  LayoutDashboard,
  Settings,
  Star,
} from "lucide-react";

export const dashboardNavigation = [
  { href: "/", labelKey: "dashboard", icon: LayoutDashboard },
  { href: "/currencies", labelKey: "currencies", icon: Banknote },
  { href: "/converter", labelKey: "converter", icon: ArrowLeftRight },
  { href: "/historical-rates", labelKey: "historicalRates", icon: History },
  { href: "/watchlist", labelKey: "watchlist", icon: Star },
  { href: "/settings", labelKey: "settings", icon: Settings },
] as const;
