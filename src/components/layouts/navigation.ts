import {
  ArrowLeftRight,
  Banknote,
  History,
  LayoutDashboard,
  Settings,
  Star,
} from "lucide-react";

export const dashboardNavigation = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/currencies", label: "Currencies", icon: Banknote },
  { href: "/converter", label: "Converter", icon: ArrowLeftRight },
  { href: "/historical-rates", label: "Historical Rates", icon: History },
  { href: "/watchlist", label: "Watchlist", icon: Star },
  { href: "/settings", label: "Settings", icon: Settings },
];
