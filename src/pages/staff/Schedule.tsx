import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { scheduleData, type ShiftSchedule } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Schedule() {
  const { toast } = useToast();
  const [shifts] = useState<ShiftSchedule[]>(scheduleData);
  const [changeOpen, setChangeOpen] = useState(false);
  const [selected, setSelected] = useState<ShiftSchedule | null>(null);
  const [reason, setReason] = useState("");

  const handleRequest = () => {
    if (!reason.trim()) { toast({ title: "Provide reason", variant: "destructive" }); return; }
    toast({ title: "Shift Change Requested", description: `Request for ${selected?.date} sent to supervisor for approval` });
    setReason("");
    setChangeOpen(false);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Work Schedule</h1><p className="text-muted-foreground">View your shift schedule</p></div>

      <Card>
        <CardHeader><CardTitle>Upcoming Shifts</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Date</TableHead><TableHead>Shift</TableHead><TableHead>Start</TableHead><TableHead>End</TableHead><TableHead>Location</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {shifts.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.date}</TableCell>
                  <TableCell>{s.shiftType}</TableCell>
                  <TableCell>{s.startTime}</TableCell>
                  <TableCell>{s.endTime}</TableCell>
                  <TableCell>{s.location}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => { setSelected(s); setChangeOpen(true); }}>Request Change</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={changeOpen} onOpenChange={setChangeOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Request Shift Change – {selected?.date}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="text-sm"><span className="text-muted-foreground">Current:</span> {selected?.shiftType} ({selected?.startTime}–{selected?.endTime})</div>
            <Label>Reason for Change</Label>
            <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why..." />
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
