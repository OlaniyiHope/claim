import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function AccountingSettings() {
  const { toast } = useToast();
  const [providers, setProviders] = useState(["Discovery Health", "Bonitas", "Momentum Health", "GEMS", "Medihelp"]);
  const [editProvider, setEditProvider] = useState<{ index: number; name: string } | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newProvider, setNewProvider] = useState("");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [nextNumber, setNextNumber] = useState("013");
  const [apiEndpoint, setApiEndpoint] = useState("https://elixir.example.com/api/claims");
  const [reminder1, setReminder1] = useState("7");
  const [reminder2, setReminder2] = useState("14");
  const [escalation, setEscalation] = useState("30");

  const handleSaveProvider = () => {
    if (editProvider) {
      setProviders(prev => prev.map((p, i) => i === editProvider.index ? editProvider.name : p));
      toast({ title: "Provider Updated", description: `${editProvider.name} saved` });
      setEditProvider(null);
    }
  };

  const handleAddProvider = () => {
    if (!newProvider.trim()) return;
    setProviders(prev => [...prev, newProvider]);
    toast({ title: "Provider Added", description: `${newProvider} added` });
    setNewProvider("");
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure accounting module settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader><CardTitle>Medical Aid Providers</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {providers.map((provider, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{provider}</p>
                  <p className="text-xs text-muted-foreground">Standard claim format</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditProvider({ index: i, name: provider })}>Edit</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => setAddOpen(true)}>+ Add Provider</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Invoice Numbering</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label>Invoice Prefix</Label><Input value={invoicePrefix} onChange={e => setInvoicePrefix(e.target.value)} /></div>
            <div className="grid gap-2"><Label>Next Invoice Number</Label><Input type="number" value={nextNumber} onChange={e => setNextNumber(e.target.value)} /></div>
            <Button onClick={() => toast({ title: "Settings Saved", description: "Invoice numbering updated" })}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Claim Submission Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label>Elixir System API Endpoint</Label><Input value={apiEndpoint} onChange={e => setApiEndpoint(e.target.value)} /></div>
            <div className="grid gap-2"><Label>API Key</Label><Input type="password" defaultValue="••••••••••••" /></div>
            <p className="text-xs text-muted-foreground">Integration with Elixir claim submission system</p>
            <Button onClick={() => toast({ title: "Integration Updated", description: "Claim submission settings saved" })}>Update Integration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Debt Recovery Rules</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label>First Reminder (days after invoice)</Label><Input type="number" value={reminder1} onChange={e => setReminder1(e.target.value)} /></div>
            <div className="grid gap-2"><Label>Second Reminder (days after invoice)</Label><Input type="number" value={reminder2} onChange={e => setReminder2(e.target.value)} /></div>
            <div className="grid gap-2"><Label>Escalation Threshold (days after invoice)</Label><Input type="number" value={escalation} onChange={e => setEscalation(e.target.value)} /></div>
            <Button onClick={() => toast({ title: "Rules Saved", description: "Debt recovery rules updated" })}>Save Rules</Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editProvider} onOpenChange={() => setEditProvider(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Provider</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <Label>Provider Name</Label>
            <Input value={editProvider?.name || ""} onChange={e => setEditProvider(prev => prev ? { ...prev, name: e.target.value } : null)} />
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSaveProvider}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Provider</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <Label>Provider Name</Label>
            <Input value={newProvider} onChange={e => setNewProvider(e.target.value)} placeholder="New provider name" />
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleAddProvider}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
