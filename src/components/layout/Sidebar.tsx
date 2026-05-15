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
  ShieldAlert,
  ChevronRight,
  LogOut
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
      color: "text-blue-500",
    },
    {
      label: "Incidents",
      icon: AlertCircle,
      href: "/incidents",
      active: pathname.startsWith("/incidents"),
      color: "text-rose-500",
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

  if (role === "ADMIN" || role === "MANAGER") {
    routes.push({
      label: "Team",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
      color: "text-violet-500",
    });
  }

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border shadow-2xl shadow-black/50">
      <div className="px-6 py-8">
        <Link href="/dashboard" className="flex items-center gap-3 mb-10 group">
          <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
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
                "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                route.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <route.icon className={cn("h-5 w-5 mr-3 transition-colors", route.active ? route.color : "text-muted-foreground group-hover:text-foreground")} />
              {route.label}
              {route.active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4">
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-lg">
              <AvatarImage src={session?.user?.image || ""} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {getInitials(session?.user?.name || "U")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-foreground truncate">
                {session?.user?.name}
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest text-primary/70">
                {session?.user?.role}
              </span>
            </div>
          </div>
          <div className="h-px bg-border/50 mx-1" />
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground justify-start px-2"
              asChild
            >
              <Link href="/settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 justify-start px-2"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
