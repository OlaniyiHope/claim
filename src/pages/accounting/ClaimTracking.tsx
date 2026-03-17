import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/StatusBadge";
import { claimsData, type Claim } from "@/data/mockData";
import { Search, RotateCcw, MessageSquare, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ClaimTracking() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [claims, setClaims] = useState<Claim[]>(claimsData.filter(c => c.status !== "Draft"));
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const filtered = claims.filter(c =>
    c.patientName.toLowerCase().includes(search.toLowerCase()) ||
    c.labNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleResubmit = (claim: Claim) => {
    setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, status: "Submitted" as const, submissionDate: new Date().toISOString().split("T")[0] } : c));
    toast({ title: "Claim Resubmitted", description: `${claim.id} has been resubmitted to ${claim.medicalAid}` });
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    toast({ title: "Note Added", description: `Note added to ${selectedClaim?.id}: "${noteText.substring(0, 50)}..."` });
    setNoteText("");
    setNotesOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Claim Tracking</h1>
        <p className="text-muted-foreground">Track claims from submission to payment</p>
      </div>
      <Card>
        <CardHeader>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by claim ID, patient, or lab number..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Lab Number</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Medical Aid</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="font-mono text-xs">{c.labNumber}</TableCell>
                  <TableCell>{c.patientName}</TableCell>
                  <TableCell>{c.medicalAid}</TableCell>
                  <TableCell className="text-right">R {c.claimAmount.toLocaleString()}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                  <TableCell><StatusBadge status={c.paymentStatus || "Pending"} /></TableCell>
                  <TableCell className="text-xs">{c.submissionDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedClaim(c); setViewOpen(true); }}><Eye className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleResubmit(c)} title="Resubmit"><RotateCcw className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedClaim(c); setNotesOpen(true); }} title="Notes"><MessageSquare className="h-3 w-3" /></Button>
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
          <DialogHeader><DialogTitle>Claim Details – {selectedClaim?.id}</DialogTitle></DialogHeader>
          {selectedClaim && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Patient:</span> <strong>{selectedClaim.patientName}</strong></div>
              <div><span className="text-muted-foreground">Lab #:</span> <strong>{selectedClaim.labNumber}</strong></div>
              <div><span className="text-muted-foreground">Medical Aid:</span> <strong>{selectedClaim.medicalAid}</strong></div>
              <div><span className="text-muted-foreground">Amount:</span> <strong>R {selectedClaim.claimAmount.toLocaleString()}</strong></div>
              <div><span className="text-muted-foreground">Approval:</span> <StatusBadge status={selectedClaim.status} /></div>
              <div><span className="text-muted-foreground">Payment:</span> <StatusBadge status={selectedClaim.paymentStatus || "Pending"} /></div>
            </div>
          )}
          <DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Note – {selectedClaim?.id}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <Label>Internal Note</Label>
            <Textarea placeholder="Add a note about this claim..." value={noteText} onChange={e => setNoteText(e.target.value)} rows={4} />
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleAddNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
