import Link from "next/link";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SEVERITIES, STATUSES } from "@/lib/constants";
import { cn, formatDate, getInitials } from "@/lib/utils";

interface RecentIncidentsProps {
  incidents: any[];
}

export const RecentIncidents = ({ incidents }: RecentIncidentsProps) => {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Recent Incidents</h3>
        <Link 
          href="/incidents" 
          className="text-sm text-primary hover:underline font-medium"
        >
          View all
        </Link>
      </div>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[300px]">Incident</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                No incidents found.
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((incident) => (
              <TableRow key={incident.id} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                <TableCell className="font-medium">
                  <Link href={`/incidents/${incident.id}`} className="flex flex-col group-hover:text-primary transition-colors">
                    <span>{incident.title}</span>
                    <span className="text-xs text-muted-foreground font-normal mt-0.5">
                      {incident.category}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge className={cn("font-medium", STATUSES[incident.status as keyof typeof STATUSES]?.bgClass)}>
                    {STATUSES[incident.status as keyof typeof STATUSES]?.label || incident.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-2 w-2 rounded-full" 
                      style={{ backgroundColor: SEVERITIES[incident.severity as keyof typeof SEVERITIES]?.color }}
                    />
                    <span className="text-sm font-medium">
                      {SEVERITIES[incident.severity as keyof typeof SEVERITIES]?.label || incident.severity}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {incident.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarImage src={incident.assignedTo.image || ""} />
                        <AvatarFallback className="text-[10px]">
                          {getInitials(incident.assignedTo.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{incident.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {formatDate(incident.createdAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
