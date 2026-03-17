import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { leaveData, leaveBalances, type LeaveRecord } from "@/data/mockData";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LeaveManagement() {
  const { toast } = useToast();
  const [leaves, setLeaves] = useState<LeaveRecord[]>(leaveData);
  const [requestOpen, setRequestOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({ type: "", startDate: "", endDate: "", reason: "" });

  const handleRequest = () => {
    if (!newLeave.type || !newLeave.startDate || !newLeave.endDate) {
      toast({ title: "Fill Required Fields", variant: "destructive" }); return;
    }
    const start = new Date(newLeave.startDate);
    const end = new Date(newLeave.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const leave: LeaveRecord = {
      id: `LV-${String(leaves.length + 1).padStart(3, "0")}`,
      type: newLeave.type as LeaveRecord["type"],
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      totalDays: days,
      status: "Pending",
      approver: "Manager Naidoo",
      reason: newLeave.reason,
    };
    setLeaves(prev => [leave, ...prev]);
    setNewLeave({ type: "", startDate: "", endDate: "", reason: "" });
    setRequestOpen(false);
    toast({ title: "Leave Requested", description: `${days}-day ${leave.type} leave submitted for approval` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Leave Management</h1><p className="text-muted-foreground">Request and track leave</p></div>
        <Button onClick={() => setRequestOpen(true)}><Plus className="h-4 w-4 mr-2" />Request Leave</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Annual</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{leaveBalances.annual} days</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Sick</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{leaveBalances.sick} days</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Family</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{leaveBalances.familyResponsibility} days</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Study</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{leaveBalances.study} days</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Leave History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Type</TableHead><TableHead>Start</TableHead><TableHead>End</TableHead><TableHead>Days</TableHead><TableHead>Status</TableHead><TableHead>Approver</TableHead><TableHead>Reason</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {leaves.map(l => (
                <TableRow key={l.id}>
                  <TableCell>{l.type}</TableCell>
                  <TableCell className="text-xs">{l.startDate}</TableCell>
                  <TableCell className="text-xs">{l.endDate}</TableCell>
                  <TableCell>{l.totalDays}</TableCell>
                  <TableCell><StatusBadge status={l.status} /></TableCell>
                  <TableCell className="text-xs">{l.approver}</TableCell>
                  <TableCell className="text-xs max-w-[150px] truncate">{l.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Request Leave</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Leave Type *</Label>
              <Select value={newLeave.type} onValueChange={v => setNewLeave(p => ({ ...p, type: v }))}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="Sick">Sick</SelectItem>
                  <SelectItem value="Family Responsibility">Family Responsibility</SelectItem>
                  <SelectItem value="Study">Study</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Start Date *</Label><Input type="date" value={newLeave.startDate} onChange={e => setNewLeave(p => ({ ...p, startDate: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>End Date *</Label><Input type="date" value={newLeave.endDate} onChange={e => setNewLeave(p => ({ ...p, endDate: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Reason</Label><Textarea value={newLeave.reason} onChange={e => setNewLeave(p => ({ ...p, reason: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleRequest}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
