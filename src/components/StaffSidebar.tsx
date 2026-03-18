import {
  LayoutDashboard, User, CalendarDays, MessageSquare, ListTodo, Clock,
  FileText, Fingerprint, Receipt, HelpCircle, ArrowLeftRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo_pathology.png";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/staff", icon: LayoutDashboard },
      { title: "My Profile", url: "/staff/profile", icon: User },
    ],
  },
  {
    label: "Work",
    items: [
      { title: "Tasks", url: "/staff/tasks", icon: ListTodo },
      { title: "Schedule", url: "/staff/schedule", icon: Clock },
      { title: "Attendance", url: "/staff/attendance", icon: Fingerprint },
    ],
  },
  {
    label: "Requests",
    items: [
      { title: "Leave Management", url: "/staff/leave", icon: CalendarDays },
      { title: "Expense Claims", url: "/staff/expenses", icon: Receipt },
      { title: "Support Requests", url: "/staff/support", icon: HelpCircle },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Messages", url: "/staff/messages", icon: MessageSquare },
      { title: "Documents", url: "/staff/documents", icon: FileText },
    ],
  },
];

export function StaffSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon"       style={{
        "--sidebar-background":        "#ffffff",
        "--sidebar-foreground":        "#111827",
        "--sidebar-border":            "#e5e7eb",
        "--sidebar-accent":            "#f3f4f6",
        "--sidebar-accent-foreground": "#111827",
        "--sidebar-primary":           "#dc2626",       // red active bg (matches your brand)
        "--sidebar-primary-foreground":"#ffffff",
        background:                    "#ffffff",
        borderRight:                   "1px solid #e5e7eb",
      } as React.CSSProperties}
>
      <SidebarHeader 
        style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb", background: "#ffffff" }}
>
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Target Pathology Laboratory"
            className="h-10 w-10 rounded object-contain bg-white p-0.5"
            style={{ border: "1px solid #e5e7eb",width: "100%", height: "auto" }}
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-foreground leading-tight">Target Pathology</span>
              <span className="text-xs text-sidebar-foreground/60">Staff Portal</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent 
            style={{ background: "#ffffff" }}
>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel 
                            style={{
                  fontSize: "0.65rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "#9ca3af", padding: "0.5rem 1rem 0.25rem",
                }}

            className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
              {!collapsed && group.label}
            </SidebarGroupLabel >
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/staff"}
                        style={{ color: "#374151", textDecoration: "none" }}
                                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"

                        activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter       
      style={{ padding: "0.75rem", borderTop: "1px solid #e5e7eb", background: "#ffffff" }}
>
        <Button variant="ghost" size="sm" asChild className="w-full justify-start text-sidebar-foreground/70"           style={{ width: "100%", justifyContent: "flex-start", color: "#374151" }}
>
          <Link to="/"><ArrowLeftRight className="h-4 w-4 mr-2" />{!collapsed && "Accounting Module"}</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
