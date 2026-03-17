import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { invoicesData, type Invoice } from "@/data/mockData";
import { Search, Plus, Eye, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InvoiceManagement() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData);
  const [newOpen, setNewOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [newInv, setNewInv] = useState({ type: "" as string, patientName: "", labNumber: "", testType: "", amount: "", medicalAid: "", dueDate: "" });

  const filtered = invoices.filter(i => {
    const matchSearch = i.patientName.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || i.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleGenerate = () => {
    if (!newInv.type || !newInv.patientName || !newInv.amount) {
      toast({ title: "Validation Error", description: "Fill all required fields", variant: "destructive" });
      return;
    }
    const inv: Invoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
      type: newInv.type as "Cash" | "Medical Aid",
      patientName: newInv.patientName,
      labNumber: newInv.labNumber,
      testType: newInv.testType,
      amount: parseFloat(newInv.amount),
      medicalAid: newInv.type === "Medical Aid" ? newInv.medicalAid : undefined,
      paymentStatus: "Unpaid",
      dateIssued: new Date().toISOString().split("T")[0],
    };
    setInvoices(prev => [inv, ...prev]);
    setNewInv({ type: "", patientName: "", labNumber: "", testType: "", amount: "", medicalAid: "", dueDate: "" });
    setNewOpen(false);
    toast({ title: "Invoice Generated", description: `${inv.id} created for ${inv.patientName}` });
  };

  const handleMarkPaid = (inv: Invoice) => {
    setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, paymentStatus: "Paid" as const } : i));
    toast({ title: "Invoice Paid", description: `${inv.id} marked as paid` });
    setViewOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Invoice Management</h1>
          <p className="text-muted-foreground">Generate and manage all invoices</p>
        </div>
        <Button onClick={() => setNewOpen(true)}><Plus className="h-4 w-4 mr-2" />Generate Invoice</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Medical Aid">Medical Aid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Lab Number</TableHead>
                <TableHead>Test</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell><StatusBadge status={inv.type === "Cash" ? "Draft" : "Submitted"} /></TableCell>
                  <TableCell>{inv.patientName}</TableCell>
                  <TableCell className="font-mono text-xs">{inv.labNumber}</TableCell>
                  <TableCell>{inv.testType}</TableCell>
                  <TableCell className="text-right">R {inv.amount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={inv.paymentStatus} /></TableCell>
                  <TableCell className="text-xs">{inv.dateIssued}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelected(inv); setViewOpen(true); }}><Eye className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "Printing", description: `Invoice ${inv.id} sent to printer` })}><Printer className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Generate New Invoice</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Invoice Type *</Label>
              <Select value={newInv.type} onValueChange={v => setNewInv(p => ({ ...p, type: v }))}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Medical Aid">Medical Aid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Patient Name *</Label><Input placeholder="Full name" value={newInv.patientName} onChange={e => setNewInv(p => ({ ...p, patientName: e.target.value }))} /></div>
            {newInv.type === "Medical Aid" && <div className="grid gap-2"><Label>Medical Aid</Label><Input placeholder="Provider" value={newInv.medicalAid} onChange={e => setNewInv(p => ({ ...p, medicalAid: e.target.value }))} /></div>}
            <div className="grid gap-2"><Label>Lab Number</Label><Input placeholder="LAB-2024-XXXX" value={newInv.labNumber} onChange={e => setNewInv(p => ({ ...p, labNumber: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Test Details</Label><Input placeholder="Test performed" value={newInv.testType} onChange={e => setNewInv(p => ({ ...p, testType: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Amount (R) *</Label><Input type="number" placeholder="0.00" value={newInv.amount} onChange={e => setNewInv(p => ({ ...p, amount: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Due Date</Label><Input type="date" value={newInv.dueDate} onChange={e => setNewInv(p => ({ ...p, dueDate: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button onClick={handleGenerate}>Generate Invoice</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Invoice {selected?.id}</DialogTitle></DialogHeader>
          {selected && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Type:</span> <strong>{selected.type}</strong></div>
              <div><span className="text-muted-foreground">Patient:</span> <strong>{selected.patientName}</strong></div>
              <div><span className="text-muted-foreground">Lab #:</span> <strong>{selected.labNumber}</strong></div>
              <div><span className="text-muted-foreground">Test:</span> <strong>{selected.testType}</strong></div>
              <div><span className="text-muted-foreground">Amount:</span> <strong>R {selected.amount.toLocaleString()}</strong></div>
              <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selected.paymentStatus} /></div>
            </div>
          )}
          <DialogFooter>
            {selected && selected.paymentStatus !== "Paid" && <Button onClick={() => handleMarkPaid(selected)}>Mark as Paid</Button>}
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
