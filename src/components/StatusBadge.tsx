import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Approved: "bg-success text-success-foreground",
  Paid: "bg-success text-success-foreground",
  "Fully Paid": "bg-success text-success-foreground",
  Active: "bg-success text-success-foreground",
  Submitted: "bg-primary text-primary-foreground",
  Processing: "bg-warning text-warning-foreground",
  Pending: "bg-warning text-warning-foreground",
  "Partial Payment": "bg-warning text-warning-foreground",
  Maintenance: "bg-warning text-warning-foreground",
  Draft: "bg-muted text-muted-foreground",
  Unpaid: "bg-muted text-muted-foreground",
  Rejected: "bg-destructive text-destructive-foreground",
  Overdue: "bg-destructive text-destructive-foreground",
  Escalated: "bg-destructive text-destructive-foreground",
  Retired: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge className={cn("text-xs", statusColors[status] || "bg-secondary text-secondary-foreground")}>
      {status}
    </Badge>
  );
}
