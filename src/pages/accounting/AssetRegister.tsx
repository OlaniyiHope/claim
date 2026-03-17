import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { assetsData, type Asset } from "@/data/mockData";
import { Search, Plus, Eye, Wrench, XCircle, Pencil, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const labs = ["BOOYSENS", "RUSTENBURG"] as const;
const locations = ["Durban", "Johannesburg", "Pretoria", "Cape Town", "Bloemfontein", "Rustenburg", "Newcastle", "Port Elizabeth", "Welkom", "Mafikeng", "Elim", "Ladysmith", "Polokwane", "Kuruman", "Kimberley", "Mthatha", "Nelspruit"] as const;
const categories = ["Laboratory Equipment", "Diagnostic Machines", "Office Equipment", "IT Infrastructure"] as const;

const emptyAsset = { item: "", lab: "" as string, date: "", purchaseDate: "", category: "", subCategory: "", purchasePrice: "", marketValue: "", location: "" as string };

export default function AssetRegister() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [labFilter, setLabFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [assets, setAssets] = useState<Asset[]>(assetsData);
  const [selected, setSelected] = useState<Asset | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [form, setForm] = useState(emptyAsset);

  const filtered = assets.filter(a => {
    const matchSearch = a.item.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || a.category === categoryFilter;
    const matchLab = labFilter === "all" || a.lab === labFilter;
    const matchLocation = locationFilter === "all" || a.location === locationFilter;
    return matchSearch && matchCategory && matchLab && matchLocation;
  });

  const handleAdd = () => {
    if (!form.item || !form.category || !form.purchasePrice) {
      toast({ title: "Validation Error", description: "Fill required fields (Item, Category, Purchase Price)", variant: "destructive" });
      return;
    }
    const asset: Asset = {
      id: `AST-${String(assets.length + 1).padStart(3, "0")}`,
      item: form.item,
      lab: (form.lab || "BOOYSENS") as Asset["lab"],
      date: form.date || new Date().toISOString().split("T")[0],
      purchaseDate: form.purchaseDate || new Date().toISOString().split("T")[0],
      category: form.category as Asset["category"],
      subCategory: form.subCategory,
      purchasePrice: parseFloat(form.purchasePrice),
      marketValue: parseFloat(form.marketValue) || parseFloat(form.purchasePrice),
      location: (form.location || "Johannesburg") as Asset["location"],
      status: "Active",
    };
    setAssets(prev => [asset, ...prev]);
    setForm(emptyAsset);
    setAddOpen(false);
    toast({ title: "Asset Added", description: `${asset.item} added to register` });
  };

  const handleEdit = () => {
    if (!selected || !form.item || !form.purchasePrice) {
      toast({ title: "Validation Error", description: "Fill required fields", variant: "destructive" });
      return;
    }
    setAssets(prev => prev.map(a => a.id === selected.id ? {
      ...a,
      item: form.item,
      lab: (form.lab || a.lab) as Asset["lab"],
      date: form.date || a.date,
      purchaseDate: form.purchaseDate || a.purchaseDate,
      category: (form.category || a.category) as Asset["category"],
      subCategory: form.subCategory || a.subCategory,
      purchasePrice: parseFloat(form.purchasePrice) || a.purchasePrice,
      marketValue: parseFloat(form.marketValue) || a.marketValue,
      location: (form.location || a.location) as Asset["location"],
    } : a));
    setEditOpen(false);
    toast({ title: "Asset Updated", description: `${form.item} has been updated` });
  };

  const openEdit = (asset: Asset) => {
    setSelected(asset);
    setForm({
      item: asset.item, lab: asset.lab, date: asset.date, purchaseDate: asset.purchaseDate,
      category: asset.category, subCategory: asset.subCategory, purchasePrice: String(asset.purchasePrice),
      marketValue: String(asset.marketValue), location: asset.location,
    });
    setEditOpen(true);
  };

  const handlePrint = () => {
    const printContent = `
      <html><head><title>Asset Register - Target Pathology</title>
      <style>body{font-family:Arial,sans-serif;padding:20px}h1{color:#C41E24}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ddd;padding:8px;text-align:left;font-size:12px}th{background:#C41E24;color:white}.summary{margin:10px 0;font-size:14px}</style></head>
      <body><h1>Target Pathology Laboratory - Asset Register</h1>
      <p class="summary">Total Assets: ${filtered.length} | Total Purchase Value: R ${filtered.reduce((s, a) => s + a.purchasePrice, 0).toLocaleString()} | Total Market Value: R ${filtered.reduce((s, a) => s + a.marketValue, 0).toLocaleString()}</p>
      <table><tr><th>Asset No</th><th>Lab</th><th>Date</th><th>Purchase Date</th><th>Category</th><th>Sub-Category</th><th>Purchase Price</th><th>Market Value</th><th>Item</th><th>Location</th><th>Status</th></tr>
      ${filtered.map(a => `<tr><td>${a.id}</td><td>${a.lab}</td><td>${a.date}</td><td>${a.purchaseDate}</td><td>${a.category}</td><td>${a.subCategory}</td><td>R ${a.purchasePrice.toLocaleString()}</td><td>R ${a.marketValue.toLocaleString()}</td><td>${a.item}</td><td>${a.location}</td><td>${a.status}</td></tr>`).join("")}
      </table><p style="margin-top:20px;font-size:11px;color:#666">Generated: ${new Date().toLocaleDateString()} | Target Pathology Laboratory</p></body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(printContent); w.document.close(); w.print(); }
  };

  const handleMaintenance = () => {
    if (!maintenanceDate || !selected) return;
    setAssets(prev => prev.map(a => a.id === selected.id ? { ...a, status: "Maintenance" as const, nextMaintenance: maintenanceDate } : a));
    toast({ title: "Maintenance Scheduled", description: `${selected.item} scheduled for ${maintenanceDate}` });
    setMaintenanceDate("");
    setMaintenanceOpen(false);
  };

  const handleRetire = (asset: Asset) => {
    setAssets(prev => prev.map(a => a.id === asset.id ? { ...a, status: "Retired" as const } : a));
    toast({ title: "Asset Retired", description: `${asset.item} has been retired` });
    setViewOpen(false);
  };

  const AssetForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="grid gap-4 py-2 max-h-[60vh] overflow-y-auto">
      <div className="grid gap-2"><Label>Item Name *</Label><Input value={form.item} onChange={e => setForm(p => ({ ...p, item: e.target.value }))} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Lab *</Label>
          <Select value={form.lab} onValueChange={v => setForm(p => ({ ...p, lab: v }))}>
            <SelectTrigger><SelectValue placeholder="Select lab" /></SelectTrigger>
            <SelectContent>{labs.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Location *</Label>
          <Select value={form.location} onValueChange={v => setForm(p => ({ ...p, location: v }))}>
            <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
            <SelectContent>{locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
        <div className="grid gap-2"><Label>Purchase Date</Label><Input type="date" value={form.purchaseDate} onChange={e => setForm(p => ({ ...p, purchaseDate: e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Category *</Label>
          <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="grid gap-2"><Label>Sub-Category</Label><Input value={form.subCategory} onChange={e => setForm(p => ({ ...p, subCategory: e.target.value }))} /></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2"><Label>Purchase Price (R) *</Label><Input type="number" value={form.purchasePrice} onChange={e => setForm(p => ({ ...p, purchasePrice: e.target.value }))} /></div>
        <div className="grid gap-2"><Label>Market Value (R)</Label><Input type="number" value={form.marketValue} onChange={e => setForm(p => ({ ...p, marketValue: e.target.value }))} /></div>
      </div>
      <DialogFooter><Button onClick={onSubmit}>{submitLabel}</Button></DialogFooter>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Asset Register</h1>
          <p className="text-muted-foreground">Track laboratory assets and equipment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}><Printer className="h-4 w-4 mr-2" />Print Register</Button>
          <Button onClick={() => { setForm(emptyAsset); setAddOpen(true); }}><Plus className="h-4 w-4 mr-2" />Add Asset</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assets..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={labFilter} onValueChange={setLabFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Labs</SelectItem>
                {labs.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset No</TableHead>
                  <TableHead>Lab</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sub-Category</TableHead>
                  <TableHead className="text-right">Purchase Price</TableHead>
                  <TableHead className="text-right">Market Value</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{a.id}</TableCell>
                    <TableCell className="text-xs font-medium">{a.lab}</TableCell>
                    <TableCell className="text-xs">{a.date}</TableCell>
                    <TableCell className="text-xs">{a.purchaseDate}</TableCell>
                    <TableCell className="text-xs">{a.category}</TableCell>
                    <TableCell className="text-xs">{a.subCategory}</TableCell>
                    <TableCell className="text-right text-xs">R {a.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-xs">R {a.marketValue.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">{a.item}</TableCell>
                    <TableCell className="text-xs">{a.location}</TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => { setSelected(a); setViewOpen(true); }}><Eye className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(a)}><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => { setSelected(a); setMaintenanceOpen(true); }} disabled={a.status === "Retired"}><Wrench className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleRetire(a)} disabled={a.status === "Retired"}><XCircle className="h-3 w-3" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selected?.item}</DialogTitle></DialogHeader>
          {selected && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Asset No:</span> <strong>{selected.id}</strong></div>
              <div><span className="text-muted-foreground">Lab:</span> <strong>{selected.lab}</strong></div>
              <div><span className="text-muted-foreground">Date:</span> <strong>{selected.date}</strong></div>
              <div><span className="text-muted-foreground">Purchase Date:</span> <strong>{selected.purchaseDate}</strong></div>
              <div><span className="text-muted-foreground">Category:</span> <strong>{selected.category}</strong></div>
              <div><span className="text-muted-foreground">Sub-Category:</span> <strong>{selected.subCategory}</strong></div>
              <div><span className="text-muted-foreground">Purchase Price:</span> <strong>R {selected.purchasePrice.toLocaleString()}</strong></div>
              <div><span className="text-muted-foreground">Market Value:</span> <strong>R {selected.marketValue.toLocaleString()}</strong></div>
              <div><span className="text-muted-foreground">Location:</span> <strong>{selected.location}</strong></div>
              <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selected.status} /></div>
              <div><span className="text-muted-foreground">Next Maintenance:</span> <strong>{selected.nextMaintenance || "N/A"}</strong></div>
            </div>
          )}
          <DialogFooter>
            {selected && selected.status !== "Retired" && <>
              <Button variant="outline" onClick={() => { setViewOpen(false); openEdit(selected); }}>Edit</Button>
              <Button variant="outline" onClick={() => { setViewOpen(false); setMaintenanceOpen(true); }}>Schedule Maintenance</Button>
              <Button variant="destructive" onClick={() => selected && handleRetire(selected)}>Retire</Button>
            </>}
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add New Asset</DialogTitle></DialogHeader>
          <AssetForm onSubmit={handleAdd} submitLabel="Add Asset" />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Edit Asset – {selected?.id}</DialogTitle></DialogHeader>
          <AssetForm onSubmit={handleEdit} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>

      {/* Maintenance Dialog */}
      <Dialog open={maintenanceOpen} onOpenChange={setMaintenanceOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule Maintenance – {selected?.item}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <Label>Maintenance Date</Label>
            <Input type="date" value={maintenanceDate} onChange={e => setMaintenanceDate(e.target.value)} />
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleMaintenance}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
