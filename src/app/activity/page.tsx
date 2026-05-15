import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Activity, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  UserPlus 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ActivityPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      incident: true
    },
    take: 50
  });

  const getIcon = (action: string) => {
    switch (action) {
      case "COMMENT_ADDED": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "INCIDENT_CREATED": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "STATUS_CHANGE": return <Activity className="h-4 w-4 text-emerald-500" />;
      case "INCIDENT_RESOLVED": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "ASSIGNMENT": return <UserPlus className="h-4 w-4 text-violet-500" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Activity Stream</h1>
        <p className="text-muted-foreground">
          A real-time audit log of all actions across the platform.
        </p>
      </div>

      <div className="relative space-y-4">
        <div className="absolute left-6 top-2 bottom-0 w-px bg-border/50" />
        
        {logs.map((log) => (
          <div key={log.id} className="relative flex items-start gap-6 group">
            <div className="z-10 flex items-center justify-center h-12 w-12 rounded-full bg-background border border-border shadow-sm group-hover:border-primary/50 transition-colors shrink-0">
              {getIcon(log.action)}
            </div>
            
            <div className="flex-1 pt-1 pb-6 border-b border-border/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-bold text-foreground">{log.user.name}</span>
                    <span className="text-muted-foreground mx-1.5">
                      {log.details.replace(log.user.name || "", "").trim()}
                    </span>
                    {log.incident && (
                      <span className="font-medium text-primary hover:underline cursor-pointer">
                         #{log.incident.title.slice(0, 30)}...
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium uppercase tracking-tighter text-[10px] bg-muted px-1.5 py-0.5 rounded">
                       {log.action.replace("_", " ")}
                    </span>
                    <span>•</span>
                    <span>{formatDate(log.createdAt)}</span>
                  </div>
                </div>
                <Avatar className="h-7 w-7 border border-border/50">
                  <AvatarImage src={log.user.image || ""} />
                  <AvatarFallback className="text-[10px]">{log.user.name?.[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
            <Activity className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
