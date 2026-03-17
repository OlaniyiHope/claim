import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { outstandingBalancesData, type OutstandingBalance } from "@/data/mockData";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OutstandingBalances() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [balances, setBalances] = useState<OutstandingBalance[]>(outstandingBalancesData);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [selected, setSelected] = useState<OutstandingBalance | null>(null);
  const [assignee, setAssignee] = useState("");

  const filtered = balances.filter(o =>
    o.patientName.toLowerCase().includes(search.toLowerCase()) ||
    o.labNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleReminder = () => {
    toast({ title: "Reminder Sent", description: `Payment reminder sent to ${selected?.patientName}` });
    setReminderOpen(false);
  };

  const handleAssign = () => {
    if (!assignee) { toast({ title: "Select Officer", variant: "destructive" }); return; }
    toast({ title: "Officer Assigned", description: `${assignee} assigned to recover balance from ${selected?.patientName}` });
    setAssignOpen(false);
    setAssignee("");
  };

  const handleEscalate = (o: OutstandingBalance) => {
    setBalances(prev => prev.map(b => b.id === o.id ? { ...b, status: "Overdue" as const } : b));
    toast({ title: "Case Escalated", description: `${o.id} for ${o.patientName} escalated to debt recovery` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Outstanding Balances</h1>
        <p className="text-muted-foreground">Monitor unpaid invoices and balances</p>
      </div>
      <Card>
        <CardHeader>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Lab Number</TableHead>
                <TableHead className="text-right">Invoice Amount</TableHead>
                <TableHead className="text-right">Amount Paid</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(o => (
                <TableRow key={o.id}>
                  <TableCell>{o.patientName}</TableCell>
                  <TableCell className="font-mono text-xs">{o.labNumber}</TableCell>
                  <TableCell className="text-right">R {o.invoiceAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">R {o.amountPaid.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">R {o.balance.toLocaleString()}</TableCell>
                  <TableCell className="text-xs">{o.invoiceDate}</TableCell>
                  <TableCell><StatusBadge status={o.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelected(o); setReminderOpen(true); }}>Reminder</Button>
                      <Button variant="ghost" size="sm" onClick={() => { setSelected(o); setAssignOpen(true); }}>Assign</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEscalate(o)}>Escalate</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={reminderOpen} onOpenChange={setReminderOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Send Payment Reminder</DialogTitle></DialogHeader>
          <p className="text-sm">Send a payment reminder to <strong>{selected?.patientName}</strong> for outstanding balance of <strong>R {selected?.balance.toLocaleString()}</strong>?</p>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleReminder}>Send Reminder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Assign Recovery Officer</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <p className="text-sm">Assign a debt recovery officer to <strong>{selected?.patientName}</strong></p>
            <Label>Recovery Officer</Label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger><SelectValue placeholder="Select officer" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Lindiwe Khumalo">Lindiwe Khumalo</SelectItem>
                <SelectItem value="Sipho Ndlovu">Sipho Ndlovu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleAssign}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
