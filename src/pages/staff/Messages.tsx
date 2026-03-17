import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { messagesData, type Message } from "@/data/mockData";
import { Plus, Reply, Forward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Messages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [selected, setSelected] = useState<Message | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [newMsg, setNewMsg] = useState({ recipient: "", subject: "", body: "" });

  const inbox = messages.filter(m => m.type === "inbox");
  const sent = messages.filter(m => m.type === "sent");
  const drafts = messages.filter(m => m.type === "draft");

  const handleSend = () => {
    if (!newMsg.recipient || !newMsg.subject) { toast({ title: "Fill required fields", variant: "destructive" }); return; }
    const msg: Message = {
      id: `MSG-${String(messages.length + 1).padStart(3, "0")}`,
      sender: "Lindiwe Khumalo",
      senderDept: "Accounting",
      subject: newMsg.subject,
      body: newMsg.body,
      date: new Date().toISOString().split("T")[0],
      read: true,
      type: "sent",
    };
    setMessages(prev => [msg, ...prev]);
    setNewMsg({ recipient: "", subject: "", body: "" });
    setComposeOpen(false);
    toast({ title: "Message Sent", description: `Sent to ${newMsg.recipient}` });
  };

  const handleRead = (msg: Message) => {
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
    setSelected(msg);
    setViewOpen(true);
  };

  const handleDelete = (msg: Message) => {
    setMessages(prev => prev.filter(m => m.id !== msg.id));
    toast({ title: "Message Deleted" });
    setViewOpen(false);
  };

  const renderTable = (msgs: Message[]) => (
    <Table>
      <TableHeader><TableRow>
        <TableHead>From</TableHead><TableHead>Subject</TableHead><TableHead>Dept</TableHead><TableHead>Date</TableHead>
      </TableRow></TableHeader>
      <TableBody>
        {msgs.map(m => (
          <TableRow key={m.id} className={`cursor-pointer ${!m.read ? "font-semibold" : ""}`} onClick={() => handleRead(m)}>
            <TableCell>{m.sender}</TableCell>
            <TableCell>{!m.read && <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />}{m.subject}</TableCell>
            <TableCell className="text-xs">{m.senderDept}</TableCell>
            <TableCell className="text-xs">{m.date}</TableCell>
          </TableRow>
        ))}
        {msgs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No messages</TableCell></TableRow>}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Messages</h1><p className="text-muted-foreground">Internal communication</p></div>
        <Button onClick={() => setComposeOpen(true)}><Plus className="h-4 w-4 mr-2" />Compose</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="inbox">
            <TabsList><TabsTrigger value="inbox">Inbox ({inbox.length})</TabsTrigger><TabsTrigger value="sent">Sent ({sent.length})</TabsTrigger><TabsTrigger value="drafts">Drafts ({drafts.length})</TabsTrigger></TabsList>
            <TabsContent value="inbox">{renderTable(inbox)}</TabsContent>
            <TabsContent value="sent">{renderTable(sent)}</TabsContent>
            <TabsContent value="drafts">{renderTable(drafts)}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selected?.subject}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="text-sm"><span className="text-muted-foreground">From:</span> {selected.sender} ({selected.senderDept})</div>
              <div className="text-sm"><span className="text-muted-foreground">Date:</span> {selected.date}</div>
              <div className="border rounded-lg p-4 text-sm bg-muted/30">{selected.body}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => { setComposeOpen(true); setNewMsg(p => ({ ...p, subject: `RE: ${selected?.subject}`, recipient: selected?.sender || "" })); setViewOpen(false); }}><Reply className="h-3 w-3 mr-1" />Reply</Button>
            <Button variant="ghost" size="sm" onClick={() => { setComposeOpen(true); setNewMsg(p => ({ ...p, subject: `FW: ${selected?.subject}`, body: selected?.body || "" })); setViewOpen(false); }}><Forward className="h-3 w-3 mr-1" />Forward</Button>
            <Button variant="destructive" size="sm" onClick={() => selected && handleDelete(selected)}>Delete</Button>
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Compose Message</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2"><Label>To *</Label><Input placeholder="Recipient or department" value={newMsg.recipient} onChange={e => setNewMsg(p => ({ ...p, recipient: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Subject *</Label><Input value={newMsg.subject} onChange={e => setNewMsg(p => ({ ...p, subject: e.target.value }))} /></div>
            <div className="grid gap-2"><Label>Message</Label><Textarea rows={5} value={newMsg.body} onChange={e => setNewMsg(p => ({ ...p, body: e.target.value }))} /></div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button onClick={handleSend}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
