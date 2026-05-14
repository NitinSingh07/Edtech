import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentIncidents } from "@/components/dashboard/RecentIncidents";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Zap
} from "lucide-react";
import { Severity, Status } from "@prisma/client";

export default async function DashboardPage() {
  const session = await auth();

  // Fetch real data from database
  const [
    totalCount,
    openCount,
    criticalCount,
    recentIncidents,
    severityStats
  ] = await Promise.all([
    prisma.incident.count(),
    prisma.incident.count({ where: { status: Status.OPEN } }),
    prisma.incident.count({ where: { severity: Severity.CRITICAL } }),
    prisma.incident.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        reportedBy: true,
        assignedTo: true,
      }
    }),
    prisma.incident.groupBy({
      by: ["severity"],
      _count: { _all: true }
    })
  ]);

  // Mock trends (in a real app, you'd compare with last month/week)
  const stats = [
    {
      title: "Total Incidents",
      value: totalCount,
      description: "from last month",
      icon: ShieldAlert,
      trend: { value: 12, isUp: true }
    },
    {
      title: "Active Issues",
      value: openCount,
      description: "requires attention",
      icon: AlertCircle,
      trend: { value: 5, isUp: false }
    },
    {
      title: "Critical Failures",
      value: criticalCount,
      description: "P1 incidents",
      icon: Zap,
      trend: { value: 2, isUp: false }
    },
    {
      title: "Avg Resolution",
      value: "4.2h",
      description: "MTTR average",
      icon: Clock,
      trend: { value: 15, isUp: true }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.name}. Here's an overview of the current system state.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentIncidents incidents={recentIncidents as any} />
        </div>
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="font-semibold text-lg self-start mb-6">Severity Distribution</h3>
          <div className="flex-1 w-full flex items-center justify-center text-muted-foreground">
             {/* Chart will go here in next commit */}
             <div className="flex flex-col items-center gap-2">
                <BarChart3 className="h-10 w-10 opacity-20" />
                <span className="text-sm">Distribution visualization</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon for placeholder
import { BarChart3 } from "lucide-react";
