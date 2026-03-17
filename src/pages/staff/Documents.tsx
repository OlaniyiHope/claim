import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { documentsData, type DocumentRecord } from "@/data/mockData";
import { Eye, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Documents() {
  const { toast } = useToast();
  const [catFilter, setCatFilter] = useState("all");

  const filtered = documentsData.filter(d => catFilter === "all" || d.category === catFilter);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Documents</h1><p className="text-muted-foreground">Access policies and operational documents</p></div>

      <Card>
        <CardHeader>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="HR Policies">HR Policies</SelectItem>
              <SelectItem value="Laboratory SOPs">Laboratory SOPs</SelectItem>
              <SelectItem value="Safety Protocols">Safety Protocols</SelectItem>
              <SelectItem value="Operational Guidelines">Operational Guidelines</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Document</TableHead><TableHead>Department</TableHead><TableHead>Category</TableHead><TableHead>Date</TableHead><TableHead>Version</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />{d.name}</TableCell>
                  <TableCell className="text-xs">{d.department}</TableCell>
                  <TableCell className="text-xs">{d.category}</TableCell>
                  <TableCell className="text-xs">{d.dateUploaded}</TableCell>
                  <TableCell className="text-xs">{d.version}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "Document Opened", description: `Viewing ${d.name}` })}><Eye className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "Download Started", description: `Downloading ${d.name}` })}><Download className="h-3 w-3" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
