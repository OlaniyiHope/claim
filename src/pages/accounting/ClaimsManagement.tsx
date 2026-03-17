import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { claimsData, type Claim } from "@/data/mockData";
import { Search, Plus, Eye, Edit, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClaimsManagement() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [claims, setClaims] = useState<Claim[]>(claimsData);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [newClaimOpen, setNewClaimOpen] = useState(false);
  const [newClaim, setNewClaim] = useState({ labNumber: "", patientName: "", medicalAid: "", medicalAidNumber: "", testPerformed: "", claimAmount: "" });

  const filtered = claims.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(search.toLowerCase()) || c.labNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitClaim = (asDraft: boolean) => {
    if (!newClaim.labNumber || !newClaim.patientName || !newClaim.claimAmount) {
      toast({ title: "Validation Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const claim: Claim = {
      id: `CLM-${String(claims.length + 1).padStart(3, "0")}`,
      labNumber: newClaim.labNumber,
      patientName: newClaim.patientName,
      medicalAid: newClaim.medicalAid,
      medicalAidNumber: newClaim.medicalAidNumber,
      testPerformed: newClaim.testPerformed,
      claimAmount: parseFloat(newClaim.claimAmount),
      status: asDraft ? "Draft" : "Submitted",
      submissionDate: new Date().toISOString().split("T")[0],
      paymentStatus: "Pending",
    };
    setClaims(prev => [claim, ...prev]);
    setNewClaim({ labNumber: "", patientName: "", medicalAid: "", medicalAidNumber: "", testPerformed: "", claimAmount: "" });
    setNewClaimOpen(false);
    toast({ title: asDraft ? "Draft Saved" : "Claim Submitted", description: `Claim ${claim.id} for ${claim.patientName} has been ${asDraft ? "saved as draft" : "submitted"}` });
  };

  const handleStatusChange = (claimId: string, newStatus: Claim["status"]) => {
    setClaims(prev => prev.map(c => c.id === claimId ? { ...c, status: newStatus } : c));
    toast({ title: "Status Updated", description: `Claim ${claimId} status changed to ${newStatus}` });
    setViewOpen(false);
  };

  const handleResubmit = (claim: Claim) => {
    setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, status: "Submitted", submissionDate: new Date().toISOString().split("T")[0] } : c));
    toast({ title: "Claim Resubmitted", description: `Claim ${claim.id} has been resubmitted` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Claims Management</h1>
          <p className="text-muted-foreground">Manage medical aid claims submitted to insurance providers</p>
        </div>
        <Dialog open={newClaimOpen} onOpenChange={setNewClaimOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />New Claim</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Submit New Claim</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2"><Label>Lab Number *</Label><Input placeholder="LAB-2024-XXXX" value={newClaim.labNumber} onChange={e => setNewClaim(p => ({ ...p, labNumber: e.target.value }))} /></div>
              <div className="grid gap-2"><Label>Patient Name *</Label><Input placeholder="Full name" value={newClaim.patientName} onChange={e => setNewClaim(p => ({ ...p, patientName: e.target.value }))} /></div>
              <div className="grid gap-2"><Label>Medical Aid</Label><Input placeholder="Provider name" value={newClaim.medicalAid} onChange={e => setNewClaim(p => ({ ...p, medicalAid: e.target.value }))} /></div>
              <div className="grid gap-2"><Label>Medical Aid Number</Label><Input placeholder="Member number" value={newClaim.medicalAidNumber} onChange={e => setNewClaim(p => ({ ...p, medicalAidNumber: e.target.value }))} /></div>
              <div className="grid gap-2"><Label>Test Details</Label><Input placeholder="Test performed" value={newClaim.testPerformed} onChange={e => setNewClaim(p => ({ ...p, testPerformed: e.target.value }))} /></div>
              <div className="grid gap-2"><Label>Claim Amount (R) *</Label><Input type="number" placeholder="0.00" value={newClaim.claimAmount} onChange={e => setNewClaim(p => ({ ...p, claimAmount: e.target.value }))} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => handleSubmitClaim(true)}>Save Draft</Button>
              <Button onClick={() => handleSubmitClaim(false)}>Submit Claim</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by patient or lab number..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lab Number</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Medical Aid</TableHead>
                <TableHead>Med Aid #</TableHead>
                <TableHead>Test</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.labNumber}</TableCell>
                  <TableCell>{c.patientName}</TableCell>
                  <TableCell>{c.medicalAid}</TableCell>
                  <TableCell className="text-xs">{c.medicalAidNumber}</TableCell>
                  <TableCell>{c.testPerformed}</TableCell>
                  <TableCell className="text-right">R {c.claimAmount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell className="text-xs">{c.submissionDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedClaim(c); setViewOpen(true); }}><Eye className="h-3 w-3" /></Button>
                      {c.status === "Rejected" && <Button variant="ghost" size="sm" onClick={() => handleResubmit(c)}><RotateCcw className="h-3 w-3" /></Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Claim Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Claim Details – {selectedClaim?.id}</DialogTitle></DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Patient:</span> <strong>{selectedClaim.patientName}</strong></div>
                <div><span className="text-muted-foreground">Lab Number:</span> <strong>{selectedClaim.labNumber}</strong></div>
                <div><span className="text-muted-foreground">Medical Aid:</span> <strong>{selectedClaim.medicalAid}</strong></div>
                <div><span className="text-muted-foreground">Member #:</span> <strong>{selectedClaim.medicalAidNumber}</strong></div>
                <div><span className="text-muted-foreground">Test:</span> <strong>{selectedClaim.testPerformed}</strong></div>
                <div><span className="text-muted-foreground">Amount:</span> <strong>R {selectedClaim.claimAmount.toLocaleString()}</strong></div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selectedClaim.status} /></div>
                <div><span className="text-muted-foreground">Payment:</span> <StatusBadge status={selectedClaim.paymentStatus || "Pending"} /></div>
                <div><span className="text-muted-foreground">Submitted:</span> <strong>{selectedClaim.submissionDate}</strong></div>
              </div>
              <DialogFooter className="flex gap-2">
                {selectedClaim.status === "Draft" && <Button onClick={() => handleStatusChange(selectedClaim.id, "Submitted")}>Submit Claim</Button>}
                {selectedClaim.status === "Rejected" && <Button onClick={() => handleStatusChange(selectedClaim.id, "Submitted")}>Resubmit</Button>}
                {selectedClaim.status === "Submitted" && <Button onClick={() => handleStatusChange(selectedClaim.id, "Approved")}>Mark Approved</Button>}
                <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
