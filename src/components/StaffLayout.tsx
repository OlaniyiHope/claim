import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StaffSidebar } from "@/components/StaffSidebar";
import { Outlet } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notificationsData } from "@/data/mockData";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function StaffLayout() {
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notificationsData.filter(n => !n.read).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <StaffSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="mr-2" />
              <h2 className="text-lg font-semibold text-foreground">Staff Dashboard</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setNotifOpen(true)}>
                <Bell className="h-4 w-4" />
                {unread > 0 && <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">{unread}</span>}
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>

      <Dialog open={notifOpen} onOpenChange={setNotifOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Notifications</DialogTitle></DialogHeader>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {notificationsData.map(n => (
              <div key={n.id} className={`p-3 rounded-lg border ${n.read ? "bg-background" : "bg-accent"}`}>
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.timestamp}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
