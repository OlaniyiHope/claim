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
import { expenseClaimsData, type ExpenseClaim } from "@/data/mockData";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ExpenseClaims() {
  const { toast } = useToast();
  const [claims, setClaims] = useState<ExpenseClaim[]>(expenseClaimsData);
  const [newOpen, setNewOpen] = useState(false);
  const [newClaim, setNewClaim] = useState({ type: "", amount: "", date: "", description: "" });

  const handleSubmit = () => {
    if (!newClaim.type || !newClaim.amount) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    const claim: ExpenseClaim = {
      id: `EXP-${String(claims.length + 1).padStart(3, "0")}`,
      type: newClaim.type as ExpenseClaim["type"],
      amount: parseFloat(newClaim.amount),
      date: newClaim.date || new Date().toISOString().split("T")[0],
      description: newClaim.description,
      status: "Pending",
    };
    setClaims(prev => [claim, ...prev]);
    setNewClaim({ type: "", amount: "", date: "", description: "" });
    setNewOpen(false);
    toast({ title: "Expense Submitted", description: `R ${claim.amount} ${claim.type} claim submitted` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Expense Claims</h1><p className="text-muted-foreground">Submit reimbursement requests</p></div>
        <Button onClick={() => setNewOpen(true)}><Plus className="h-4 w-4 mr-2" />New Claim</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Amount</TableHead><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {claims.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell className="text-right">R {c.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-xs">{c.date}</TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate">{c.description}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Expense Claim</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Expense Type *</Label>
              <Select value={newClaim.type} onValueChange={v => setNewClaim(p => ({ ...p, type: v }))}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Fuel">Fuel</SelectItem>
                  <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Amount (R) *</Label><Input type="number" value={newClaim.amount} onChange={e => setNewClaim(p => ({ ...p, amount: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Date</Label><Input type="date" value={newClaim.date} onChange={e => setNewClaim(p => ({ ...p, date: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Description</Label><Textarea value={newClaim.description} onChange={e => setNewClaim(p => ({ ...p, description: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSubmit}>Submit Claim</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
