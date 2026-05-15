import prisma from "@/lib/prisma";
import { SeverityChart, ActivityChart } from "@/components/analytics/Charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SEVERITIES } from "@/lib/constants";

export default async function AnalyticsPage() {
  const [severityStats, categoryStats] = await Promise.all([
    prisma.incident.groupBy({
      by: ["severity"],
      _count: { severity: true },
    }),
    prisma.incident.groupBy({
      by: ["category"],
      _count: { category: true },
    }),
  ]);

  const severityData = severityStats.map((stat) => ({
    name: SEVERITIES[stat.severity as keyof typeof SEVERITIES]?.label || stat.severity,
    value: stat._count.severity,
  }));

  const categoryData = categoryStats.map((stat) => ({
    name: stat.category,
    count: stat._count.category,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="text-muted-foreground">
          Detailed metrics on system reliability, incident distribution, and resolution performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
            <CardDescription>Breakdown of incidents by business impact</CardDescription>
          </CardHeader>
          <CardContent>
            <SeverityChart data={severityData} />
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Incidents by Category</CardTitle>
            <CardDescription>Frequency of issues across different subsystems</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityChart data={categoryData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
