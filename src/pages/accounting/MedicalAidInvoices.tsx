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

export default function MedicalAidInvoices() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData.filter(i => i.type === "Medical Aid"));
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const filtered = invoices.filter(i =>
    i.patientName.toLowerCase().includes(search.toLowerCase()) ||
    i.labNumber.toLowerCase().includes(search.toLowerCase()) ||
    (i.medicalAid || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleMarkPaid = (inv: Invoice) => {
    setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, paymentStatus: "Paid" as const, claimStatus: "Approved" } : i));
    toast({ title: "Invoice Updated", description: `${inv.id} marked as paid` });
    setViewOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Medical Aid Invoices</h1>
        <p className="text-muted-foreground">Invoices for insurance billing</p>
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
                <TableHead>Medical Aid</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Lab Number</TableHead>
                <TableHead className="text-right">Claim Amount</TableHead>
                <TableHead>Claim Status</TableHead>
                <TableHead>Date Issued</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell>{inv.medicalAid}</TableCell>
                  <TableCell>{inv.patientName}</TableCell>
                  <TableCell className="font-mono text-xs">{inv.labNumber}</TableCell>
                  <TableCell className="text-right">R {inv.amount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={inv.claimStatus || "Pending"} /></TableCell>
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

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Invoice {selected?.id}</DialogTitle></DialogHeader>
          {selected && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Medical Aid:</span> <strong>{selected.medicalAid}</strong></div>
              <div><span className="text-muted-foreground">Patient:</span> <strong>{selected.patientName}</strong></div>
              <div><span className="text-muted-foreground">Lab #:</span> <strong>{selected.labNumber}</strong></div>
              <div><span className="text-muted-foreground">Amount:</span> <strong>R {selected.amount.toLocaleString()}</strong></div>
              <div><span className="text-muted-foreground">Claim:</span> <StatusBadge status={selected.claimStatus || "Pending"} /></div>
              <div><span className="text-muted-foreground">Payment:</span> <StatusBadge status={selected.paymentStatus} /></div>
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
