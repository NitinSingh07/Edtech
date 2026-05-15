import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { SEVERITIES, STATUSES, PRIORITIES } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";
import { 
  Clock, 
  User as UserIcon, 
  AlertTriangle, 
  Activity,
  MessageSquare,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { CommentSection } from "@/components/incidents/CommentSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function IncidentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const incident = await prisma.incident.findUnique({
    where: { id: params.id },
    include: {
      reportedBy: true,
      assignedTo: true,
      comments: {
        include: { user: true },
        orderBy: { createdAt: "asc" }
      },
      activityLogs: {
        include: { user: true },
        orderBy: { createdAt: "desc" }
      },
      aiSuggestions: true
    }
  });

  if (!incident) notFound();

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/incidents" className="hover:text-primary transition-colors">Incidents</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{incident.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Main Content */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{incident.title}</h1>
            <div className="flex flex-wrap gap-3">
              <Badge className={cn("px-2.5 py-0.5", STATUSES[incident.status].bgClass)}>
                {STATUSES[incident.status].label}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5">
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: SEVERITIES[incident.severity].color }}
                />
                {SEVERITIES[incident.severity].label}
              </Badge>
              <Badge variant="secondary">{PRIORITIES[incident.priority].label}</Badge>
              <Badge variant="secondary" className="bg-muted/50">{incident.category}</Badge>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Description
            </h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {incident.description}
            </p>
          </div>

          {/* AI Insights Section */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="h-24 w-24 text-primary" />
            </div>
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              AI Investigation Insights
            </h3>
            {incident.aiSuggestions.length > 0 ? (
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-muted-foreground">Detected Root Cause:</span>
                  <span className="text-foreground">{incident.aiSuggestions[0].rootCause}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Recommended Steps:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {(() => {
                      try {
                        const steps = typeof incident.aiSuggestions[0].suggestions === 'string' 
                          ? JSON.parse(incident.aiSuggestions[0].suggestions) 
                          : incident.aiSuggestions[0].suggestions;
                        return Array.isArray(steps) ? steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        )) : null;
                      } catch (e) {
                        return <li>{incident.aiSuggestions[0].suggestions}</li>;
                      }
                    })()}
                  </ul>
                </div>
              </div>
            ) : (

              <p className="text-sm text-muted-foreground italic">
                AI is analyzing this incident. Insights will appear here shortly.
              </p>
            )}
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Timeline & Comments
            </h3>
            <CommentSection 
              incidentId={incident.id}
              comments={incident.comments}
              currentUser={session?.user}
            />
          </div>

        </div>

        {/* Right Column: Metadata & Actions */}
        <div className="w-full lg:w-80 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base">Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reporter</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{incident.reportedBy.name}</span>
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={incident.reportedBy.image || ""} />
                      <AvatarFallback className="text-[10px]">{incident.reportedBy.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assigned To</span>
                  <div className="flex items-center gap-2">
                    {incident.assignedTo ? (
                      <>
                        <span className="font-medium">{incident.assignedTo.name}</span>
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={incident.assignedTo.image || ""} />
                          <AvatarFallback className="text-[10px]">{incident.assignedTo.name?.[0]}</AvatarFallback>
                        </Avatar>
                      </>
                    ) : (
                      <span className="text-muted-foreground italic">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Created: {formatDate(incident.createdAt)}
                 </div>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Activity className="h-3 w-3" />
                    Last Updated: {formatDate(incident.updatedAt)}
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
              Resolve Incident
            </Button>
            <Button variant="outline" className="w-full">
              Assign to me
            </Button>
            <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
              Delete Record
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components can be extracted later
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
