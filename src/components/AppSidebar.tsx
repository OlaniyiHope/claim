// import {
//   LayoutDashboard, FileText, Search, AlertTriangle, Receipt, Building2,
//   ClipboardList, Scale, Package, BarChart3, ScrollText, Settings, ArrowLeftRight
// } from "lucide-react";
// import { NavLink } from "@/components/NavLink";
// import { useLocation, Link } from "react-router-dom";
// import logo from "@/assets/logo_pathology.png";
// import {
//   Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
//   SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
//   SidebarHeader, SidebarFooter, useSidebar,
// } from "@/components/ui/sidebar";
// import { Button } from "@/components/ui/button";

// const navGroups = [
//   { label: "Overview", items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }] },
//   { label: "Claims", items: [{ title: "Claims Management", url: "/claims", icon: FileText }, { title: "Claim Tracking", url: "/claim-tracking", icon: Search }] },
//   { label: "Debt Recovery", items: [{ title: "Debt Recovery", url: "/debt-recovery", icon: AlertTriangle }] },
//   { label: "Invoicing", items: [{ title: "Patient Invoices", url: "/patient-invoices", icon: Receipt }, { title: "Medical Aid Invoices", url: "/medical-aid-invoices", icon: Building2 }, { title: "Invoice Management", url: "/invoice-management", icon: ClipboardList }, { title: "Outstanding Balances", url: "/outstanding-balances", icon: Scale }] },
//   { label: "Assets", items: [{ title: "Asset Register", url: "/asset-register", icon: Package }] },
//   { label: "Reporting", items: [{ title: "Financial Reports", url: "/financial-reports", icon: BarChart3 }, { title: "Audit Logs", url: "/audit-logs", icon: ScrollText }] },
//   { label: "Config", items: [{ title: "Settings", url: "/settings", icon: Settings }] },
// ];

// export function AppSidebar() {
//   const { state } = useSidebar();
//   const collapsed = state === "collapsed";

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-4 border-b border-sidebar-border">
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="Target Pathology Laboratory" className="h-10 w-10 rounded object-contain bg-white p-0.5" />
//           {!collapsed && (
//             <div className="flex flex-col">
//               <span className="text-sm font-bold text-sidebar-foreground leading-tight">Target Pathology</span>
//               <span className="text-xs text-sidebar-foreground/60">Accounting Module</span>
//             </div>
//           )}
//         </div>
//       </SidebarHeader>
//       <SidebarContent>
//         {navGroups.map((group) => (
//           <SidebarGroup key={group.label}>
//             <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
//               {!collapsed && group.label}
//             </SidebarGroupLabel>
//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild>
//                       <NavLink to={item.url} end={item.url === "/"} className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground" activeClassName="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">
//                         <item.icon className="h-4 w-4 shrink-0" />
//                         {!collapsed && <span>{item.title}</span>}
//                       </NavLink>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}
//       </SidebarContent>
//       <SidebarFooter className="p-3 border-t border-sidebar-border">
//         <Button variant="ghost" size="sm" asChild className="w-full justify-start text-sidebar-foreground/70">
//           <Link to="/staff"><ArrowLeftRight className="h-4 w-4 mr-2" />{!collapsed && "Staff Dashboard"}</Link>
//         </Button>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
import {
  LayoutDashboard, FileText, Search, AlertTriangle, Receipt, Building2,
  ClipboardList, Scale, Package, BarChart3, ScrollText, Settings, ArrowLeftRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import logo from "@/assets/logo_pathology.png";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navGroups = [
  { label: "Overview",      items: [{ title: "Dashboard",             url: "/",                      icon: LayoutDashboard }] },
  { label: "Claims",        items: [{ title: "Claims Management",     url: "/claims",                icon: FileText        }, { title: "Claim Tracking",       url: "/claim-tracking",        icon: Search      }] },
  { label: "Debt Recovery", items: [{ title: "Debt Recovery",         url: "/debt-recovery",         icon: AlertTriangle   }] },
  { label: "Invoicing",     items: [{ title: "Patient Invoices",      url: "/patient-invoices",      icon: Receipt         }, { title: "Medical Aid Invoices", url: "/medical-aid-invoices",  icon: Building2   }, { title: "Invoice Management", url: "/invoice-management", icon: ClipboardList }, { title: "Outstanding Balances", url: "/outstanding-balances", icon: Scale }] },
  { label: "Assets",        items: [{ title: "Asset Register",        url: "/asset-register",        icon: Package         }] },
  { label: "Reporting",     items: [{ title: "Financial Reports",     url: "/financial-reports",     icon: BarChart3       }, { title: "Audit Logs",           url: "/audit-logs",            icon: ScrollText  }] },
  { label: "Config",        items: [{ title: "Settings",              url: "/settings",              icon: Settings        }] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      // ── Override sidebar CSS variables to force white theme ──
      style={{
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
      {/* Header */}
      <SidebarHeader
        style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Target Pathology Laboratory"
            className="h-10 w-10 rounded object-contain bg-white p-0.5"
            style={{ border: "1px solid #e5e7eb" }}
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#111827", lineHeight: 1.3 }}>
                Target Pathology
              </span>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                Accounting Module
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Nav */}
      <SidebarContent style={{ background: "#ffffff" }}>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel
                style={{
                  fontSize: "0.65rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  color: "#9ca3af", padding: "0.5rem 1rem 0.25rem",
                }}
              >
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        style={{ color: "#374151", textDecoration: "none" }}
                        // active style applied via NavLink activeClassName
                        activeClassName="!bg-red-600 !text-white"
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

      {/* Footer */}
      <SidebarFooter
        style={{ padding: "0.75rem", borderTop: "1px solid #e5e7eb", background: "#ffffff" }}
      >
        <Button
          variant="ghost"
          size="sm"
          asChild
          style={{ width: "100%", justifyContent: "flex-start", color: "#374151" }}
        >
          <Link to="/staff">
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            {!collapsed && "Staff Dashboard"}
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
