import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { tasksData, type Task } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Tasks() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [selected, setSelected] = useState<Task | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  const handleStart = (task: Task) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "In Progress" as const } : t));
    toast({ title: "Task Started", description: task.title });
  };

  const handleComplete = (task: Task) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: "Completed" as const } : t));
    toast({ title: "Task Completed", description: task.title });
    setViewOpen(false);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Tasks</h1><p className="text-muted-foreground">View and manage assigned tasks</p></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Assigned</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{tasks.filter(t => t.status === "Assigned").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">In Progress</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{tasks.filter(t => t.status === "In Progress").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Completed</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-success">{tasks.filter(t => t.status === "Completed").length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Overdue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-destructive">{tasks.filter(t => t.status === "Overdue").length}</div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Task</TableHead><TableHead>Assigned By</TableHead><TableHead>Dept</TableHead><TableHead>Due</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {tasks.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{t.title}</TableCell>
                  <TableCell className="text-xs">{t.assignedBy}</TableCell>
                  <TableCell className="text-xs">{t.department}</TableCell>
                  <TableCell className="text-xs">{t.dueDate}</TableCell>
                  <TableCell><StatusBadge status={t.priority === "High" ? "Escalated" : t.priority === "Low" ? "Draft" : "Processing"} /></TableCell>
                  <TableCell><StatusBadge status={t.status === "Completed" ? "Approved" : t.status === "Overdue" ? "Overdue" : t.status === "In Progress" ? "Processing" : "Pending"} /></TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => { setSelected(t); setViewOpen(true); }}>View</Button>
                      {t.status === "Assigned" && <Button variant="ghost" size="sm" onClick={() => handleStart(t)}>Start</Button>}
                      {t.status === "In Progress" && <Button variant="ghost" size="sm" onClick={() => handleComplete(t)}>Done</Button>}
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
          <DialogHeader><DialogTitle>{selected?.title}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <p>{selected.description}</p>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Assigned By:</span> {selected.assignedBy}</div>
                <div><span className="text-muted-foreground">Department:</span> {selected.department}</div>
                <div><span className="text-muted-foreground">Due:</span> {selected.dueDate}</div>
                <div><span className="text-muted-foreground">Priority:</span> {selected.priority}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            {selected?.status === "Assigned" && <Button onClick={() => { handleStart(selected); setViewOpen(false); }}>Start Task</Button>}
            {selected?.status === "In Progress" && <Button onClick={() => handleComplete(selected)}>Mark Complete</Button>}
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
