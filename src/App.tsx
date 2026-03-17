import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AccountingLayout from "@/components/AccountingLayout";
import StaffLayout from "@/components/StaffLayout";
import Dashboard from "@/pages/accounting/Dashboard";
import ClaimsManagement from "@/pages/accounting/ClaimsManagement";
import ClaimTracking from "@/pages/accounting/ClaimTracking";
import DebtRecovery from "@/pages/accounting/DebtRecovery";
import PatientInvoices from "@/pages/accounting/PatientInvoices";
import MedicalAidInvoices from "@/pages/accounting/MedicalAidInvoices";
import InvoiceManagement from "@/pages/accounting/InvoiceManagement";
import OutstandingBalances from "@/pages/accounting/OutstandingBalances";
import AssetRegister from "@/pages/accounting/AssetRegister";
import FinancialReports from "@/pages/accounting/FinancialReports";
import AuditLogs from "@/pages/accounting/AuditLogs";
import AccountingSettings from "@/pages/accounting/Settings";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import StaffProfile from "@/pages/staff/StaffProfile";
import LeaveManagement from "@/pages/staff/LeaveManagement";
import Messages from "@/pages/staff/Messages";
import Tasks from "@/pages/staff/Tasks";
import Schedule from "@/pages/staff/Schedule";
import Documents from "@/pages/staff/Documents";
import Attendance from "@/pages/staff/Attendance";
import ExpenseClaims from "@/pages/staff/ExpenseClaims";
import SupportRequests from "@/pages/staff/SupportRequests";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AccountingLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/claims" element={<ClaimsManagement />} />
            <Route path="/claim-tracking" element={<ClaimTracking />} />
            <Route path="/debt-recovery" element={<DebtRecovery />} />
            <Route path="/patient-invoices" element={<PatientInvoices />} />
            <Route path="/medical-aid-invoices" element={<MedicalAidInvoices />} />
            <Route path="/invoice-management" element={<InvoiceManagement />} />
            <Route path="/outstanding-balances" element={<OutstandingBalances />} />
            <Route path="/asset-register" element={<AssetRegister />} />
            <Route path="/financial-reports" element={<FinancialReports />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/settings" element={<AccountingSettings />} />
          </Route>
          <Route element={<StaffLayout />}>
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff/profile" element={<StaffProfile />} />
            <Route path="/staff/leave" element={<LeaveManagement />} />
            <Route path="/staff/messages" element={<Messages />} />
            <Route path="/staff/tasks" element={<Tasks />} />
            <Route path="/staff/schedule" element={<Schedule />} />
            <Route path="/staff/documents" element={<Documents />} />
            <Route path="/staff/attendance" element={<Attendance />} />
            <Route path="/staff/expenses" element={<ExpenseClaims />} />
            <Route path="/staff/support" element={<SupportRequests />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
