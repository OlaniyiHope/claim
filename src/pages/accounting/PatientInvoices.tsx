import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { invoicesData, type Invoice } from "@/data/mockData";
import { Search, Eye, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PatientInvoices() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData.filter(i => i.type === "Cash"));
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const filtered = invoices.filter(i =>
    i.patientName.toLowerCase().includes(search.toLowerCase()) ||
    i.labNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleMarkPaid = (inv: Invoice) => {
    setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, paymentStatus: "Paid" as const } : i));
    toast({ title: "Invoice Paid", description: `${inv.id} for ${inv.patientName} marked as paid` });
    setViewOpen(false);
  };

  const handlePrint = (inv: Invoice) => {
    toast({ title: "Printing Invoice", description: `Invoice ${inv.id} sent to printer` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Patient Invoices</h1>
        <p className="text-muted-foreground">Cash patient invoices generated for direct payments</p>
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
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Lab Number</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell>{inv.patientName}</TableCell>
                  <TableCell className="font-mono text-xs">{inv.labNumber}</TableCell>
                  <TableCell>{inv.testType}</TableCell>
                  <TableCell className="text-right">R {inv.amount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={inv.paymentStatus} /></TableCell>
                  <TableCell className="text-xs">{inv.dateIssued}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelected(inv); setViewOpen(true); }}><Eye className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handlePrint(inv)}><Printer className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Invoice {selected?.id}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Patient:</span> <strong>{selected.patientName}</strong></div>
                <div><span className="text-muted-foreground">Lab #:</span> <strong>{selected.labNumber}</strong></div>
                <div><span className="text-muted-foreground">Test:</span> <strong>{selected.testType}</strong></div>
                <div><span className="text-muted-foreground">Amount:</span> <strong>R {selected.amount.toLocaleString()}</strong></div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selected.paymentStatus} /></div>
                <div><span className="text-muted-foreground">Date:</span> <strong>{selected.dateIssued}</strong></div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selected && selected.paymentStatus !== "Paid" && <Button onClick={() => handleMarkPaid(selected)}>Mark as Paid</Button>}
            <Button variant="outline" onClick={() => selected && handlePrint(selected)}><Printer className="h-4 w-4 mr-2" />Print</Button>
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
