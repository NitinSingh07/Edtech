import prisma from "@/lib/prisma";
import { IncidentForm } from "@/components/incidents/IncidentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NewIncidentPage() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true },
    where: { role: { in: ["ADMIN", "MANAGER", "ENGINEER"] } }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Report New Incident</h1>
        <p className="text-muted-foreground">
          Provide details about the issue to alert the engineering team.
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Incident Details</CardTitle>
        </CardHeader>
        <CardContent>
          <IncidentForm users={users as any} />
        </CardContent>
      </Card>
    </div>
  );
}
