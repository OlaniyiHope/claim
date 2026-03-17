import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { supportRequestsData, type SupportRequest } from "@/data/mockData";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SupportRequests() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<SupportRequest[]>(supportRequestsData);
  const [newOpen, setNewOpen] = useState(false);
  const [newReq, setNewReq] = useState({ category: "", description: "" });

  const handleSubmit = () => {
    if (!newReq.category || !newReq.description) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    const req: SupportRequest = {
      id: `SR-${String(requests.length + 1).padStart(3, "0")}`,
      category: newReq.category as SupportRequest["category"],
      description: newReq.description,
      date: new Date().toISOString().split("T")[0],
      status: "Open",
    };
    setRequests(prev => [req, ...prev]);
    setNewReq({ category: "", description: "" });
    setNewOpen(false);
    toast({ title: "Request Submitted", description: `${req.category} support request created` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Support Requests</h1><p className="text-muted-foreground">Get help from departments</p></div>
        <Button onClick={() => setNewOpen(true)}><Plus className="h-4 w-4 mr-2" />New Request</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Category</TableHead><TableHead>Description</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {requests.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell className="text-xs max-w-[250px] truncate">{r.description}</TableCell>
                  <TableCell className="text-xs">{r.date}</TableCell>
                  <TableCell><StatusBadge status={r.status === "Open" ? "Pending" : r.status === "In Progress" ? "Processing" : "Approved"} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Support Request</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Category *</Label>
              <Select value={newReq.category} onValueChange={v => setNewReq(p => ({ ...p, category: v }))}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">HR Support</SelectItem>
                  <SelectItem value="IT">IT Support</SelectItem>
                  <SelectItem value="Finance">Finance Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Description *</Label><Textarea value={newReq.description} onChange={e => setNewReq(p => ({ ...p, description: e.target.value }))} placeholder="Describe your issue..." /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
