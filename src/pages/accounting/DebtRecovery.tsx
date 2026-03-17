import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { debtRecoveryData, type DebtCase } from "@/data/mockData";
import { Search, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DebtRecovery() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [cases, setCases] = useState<DebtCase[]>(debtRecoveryData);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<DebtCase | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const filtered = cases.filter(d =>
    d.patientName.toLowerCase().includes(search.toLowerCase()) ||
    d.labNumber.toLowerCase().includes(search.toLowerCase())
  );

  const totalOutstanding = cases.reduce((s, d) => s + d.balance, 0);
  const collectedThisMonth = cases.reduce((s, d) => s + d.amountPaid, 0);
  const activeCases = cases.filter(d => d.status !== "Fully Paid").length;
  const closedCases = cases.filter(d => d.status === "Fully Paid").length;

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0 || !selectedCase) {
      toast({ title: "Invalid Amount", description: "Enter a valid payment amount", variant: "destructive" });
      return;
    }
    setCases(prev => prev.map(c => {
      if (c.id !== selectedCase.id) return c;
      const newPaid = c.amountPaid + amount;
      const newBalance = Math.max(0, c.invoiceAmount - newPaid);
      const newStatus: DebtCase["status"] = newBalance === 0 ? "Fully Paid" : "Partial Payment";
      return { ...c, amountPaid: newPaid, balance: newBalance, status: newStatus };
    }));
    toast({ title: "Payment Recorded", description: `R ${amount.toLocaleString()} payment recorded for ${selectedCase.patientName}` });
    setPaymentAmount("");
    setPaymentOpen(false);
  };

  const handleEscalate = (d: DebtCase) => {
    setCases(prev => prev.map(c => c.id === d.id ? { ...c, status: "Escalated" as const } : c));
    toast({ title: "Case Escalated", description: `${d.id} for ${d.patientName} has been escalated` });
  };

  const handleClose = (d: DebtCase) => {
    setCases(prev => prev.map(c => c.id === d.id ? { ...c, status: "Fully Paid" as const, balance: 0, amountPaid: c.invoiceAmount } : c));
    toast({ title: "Case Closed", description: `${d.id} for ${d.patientName} has been closed` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Debt Recovery</h1>
        <p className="text-muted-foreground">Recover outstanding balances from patients and medical aid shortfalls</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Outstanding</CardTitle><DollarSign className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">R {totalOutstanding.toLocaleString()}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Collected This Month</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold text-success">R {collectedThisMonth.toLocaleString()}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{activeCases}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Closed Cases</CardTitle><CheckCircle className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{closedCases}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by patient or lab number..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Lab Number</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Recovery Officer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(d => (
                <TableRow key={d.id}>
                  <TableCell>{d.patientName}</TableCell>
                  <TableCell className="font-mono text-xs">{d.labNumber}</TableCell>
                  <TableCell className="text-right">R {d.invoiceAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">R {d.amountPaid.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-semibold">R {d.balance.toLocaleString()}</TableCell>
                  <TableCell>{d.recoveryOfficer}</TableCell>
                  <TableCell><StatusBadge status={d.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" disabled={d.status === "Fully Paid"} onClick={() => { setSelectedCase(d); setPaymentOpen(true); }}>Payment</Button>
                      <Button variant="ghost" size="sm" disabled={d.status === "Escalated" || d.status === "Fully Paid"} onClick={() => handleEscalate(d)}>Escalate</Button>
                      <Button variant="ghost" size="sm" disabled={d.status === "Fully Paid"} onClick={() => handleClose(d)}>Close</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Record Payment – {selectedCase?.patientName}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="text-sm grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Invoice:</span> R {selectedCase?.invoiceAmount.toLocaleString()}</div>
              <div><span className="text-muted-foreground">Balance:</span> R {selectedCase?.balance.toLocaleString()}</div>
            </div>
            <div className="grid gap-2">
              <Label>Payment Amount (R)</Label>
              <Input type="number" placeholder="0.00" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handlePayment}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
