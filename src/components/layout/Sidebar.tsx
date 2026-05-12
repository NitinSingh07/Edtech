"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  AlertCircle, 
  BarChart3, 
  History, 
  Users, 
  Settings,
  ShieldAlert
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Role } from "@prisma/client";

interface SidebarProps {
  role?: Role;
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
      color: "text-sky-500",
    },
    {
      label: "Incidents",
      icon: AlertCircle,
      href: "/incidents",
      active: pathname.startsWith("/incidents"),
      color: "text-red-500",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
      color: "text-amber-500",
    },
    {
      label: "Activity Log",
      icon: History,
      href: "/activity",
      active: pathname === "/activity",
      color: "text-emerald-500",
    },
  ];

  // Admin/Manager only routes
  if (role === "ADMIN" || role === "MANAGER") {
    routes.push({
      label: "Team",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
      color: "text-purple-500",
    });
  }

  const footerRoutes = [
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-10">
          <div className="relative w-8 h-8 mr-4 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <ShieldAlert className="text-primary-foreground h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Resolv<span className="text-primary">X</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-foreground hover:bg-foreground/10 rounded-lg transition",
                route.active ? "text-foreground bg-foreground/10" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="space-y-1">
          {footerRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-foreground hover:bg-foreground/10 rounded-lg transition",
                route.active ? "text-foreground bg-foreground/10" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className="h-5 w-5 mr-3" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
