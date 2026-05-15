import prisma from "@/lib/prisma";
import { RecentIncidents } from "@/components/dashboard/RecentIncidents";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import Link from "next/link";

export default async function IncidentsPage() {
  const incidents = await prisma.incident.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      reportedBy: true,
      assignedTo: true,
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Incidents</h1>
          <p className="text-muted-foreground">
            Monitor and manage all active and resolved technical issues.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" asChild>
            <Link href="/incidents/new">
              <Plus className="h-4 w-4 mr-2" />
              New Incident
            </Link>
          </Button>
        </div>
      </div>

      <RecentIncidents incidents={incidents as any} />
    </div>
  );
}
