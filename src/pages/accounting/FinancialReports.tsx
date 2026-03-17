import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Download } from "lucide-react";
import { claimsData, debtRecoveryData, invoicesData, outstandingBalancesData } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const reportTypes = [
  "General Ledger",
  "Claims Recovery Report",
  "Medical Aid Revenue Report",
  "Debt Recovery Report",
  "Outstanding Invoice Report",
  "Revenue by Test Type",
  "Special Accounting Reports",
  "Monthly Cash Flow Analysis",
  "VAT Schedules",
  "Accounting Utilities",
];

interface ReportRow { label: string; value: string; }

function generateReport(type: string): { title: string; headers: string[]; rows: string[][]; summary: ReportRow[] } {
  switch (type) {
    case "General Ledger": {
      const entries = [
        { date: "2024-03-01", ref: "GL-001", account: "Medical Aid Revenue", debit: 0, credit: 134280, desc: "Medical aid claims received" },
        { date: "2024-03-01", ref: "GL-002", account: "Cash Revenue", debit: 0, credit: 42780, desc: "Cash patient payments" },
        { date: "2024-03-02", ref: "GL-003", account: "Accounts Receivable", debit: 28950, credit: 0, desc: "Outstanding debt recovery" },
        { date: "2024-03-03", ref: "GL-004", account: "Operating Expenses", debit: 45200, credit: 0, desc: "Lab supplies & reagents" },
        { date: "2024-03-04", ref: "GL-005", account: "Salaries & Wages", debit: 98500, credit: 0, desc: "Staff payroll" },
        { date: "2024-03-05", ref: "GL-006", account: "Depreciation", debit: 12500, credit: 0, desc: "Equipment depreciation" },
        { date: "2024-03-06", ref: "GL-007", account: "VAT Output", debit: 0, credit: 24630, desc: "VAT collected" },
        { date: "2024-03-07", ref: "GL-008", account: "VAT Input", debit: 18200, credit: 0, desc: "VAT on purchases" },
        { date: "2024-03-08", ref: "GL-009", account: "Bank Charges", debit: 1850, credit: 0, desc: "Monthly bank fees" },
        { date: "2024-03-09", ref: "GL-010", account: "Insurance", debit: 8750, credit: 0, desc: "Lab insurance premium" },
      ];
      const totalDebit = entries.reduce((s, e) => s + e.debit, 0);
      const totalCredit = entries.reduce((s, e) => s + e.credit, 0);
      return {
        title: "General Ledger",
        headers: ["Date", "Reference", "Account", "Description", "Debit (R)", "Credit (R)"],
        rows: entries.map(e => [e.date, e.ref, e.account, e.desc, e.debit ? `R ${e.debit.toLocaleString()}` : "-", e.credit ? `R ${e.credit.toLocaleString()}` : "-"]),
        summary: [
          { label: "Total Debits", value: `R ${totalDebit.toLocaleString()}` },
          { label: "Total Credits", value: `R ${totalCredit.toLocaleString()}` },
          { label: "Net Balance", value: `R ${(totalCredit - totalDebit).toLocaleString()}` },
          { label: "Entries", value: String(entries.length) },
        ],
      };
    }
    case "Claims Recovery Report": {
      const total = claimsData.reduce((s, c) => s + c.claimAmount, 0);
      const approved = claimsData.filter(c => c.status === "Approved");
      const recovered = approved.reduce((s, c) => s + c.claimAmount, 0);
      return {
        title: "Claims Recovery Report",
        headers: ["Claim ID", "Patient", "Medical Aid", "Amount", "Status", "Payment"],
        rows: claimsData.map(c => [c.id, c.patientName, c.medicalAid, `R ${c.claimAmount.toLocaleString()}`, c.status, c.paymentStatus || "Pending"]),
        summary: [
          { label: "Total Claims", value: `R ${total.toLocaleString()}` },
          { label: "Total Recovered", value: `R ${recovered.toLocaleString()}` },
          { label: "Recovery Rate", value: `${((recovered / total) * 100).toFixed(1)}%` },
          { label: "Approved Claims", value: String(approved.length) },
          { label: "Rejected Claims", value: String(claimsData.filter(c => c.status === "Rejected").length) },
        ],
      };
    }
    case "Medical Aid Revenue Report": {
      const maInvoices = invoicesData.filter(i => i.type === "Medical Aid");
      const totalRevenue = maInvoices.reduce((s, i) => s + i.amount, 0);
      const paid = maInvoices.filter(i => i.paymentStatus === "Paid");
      return {
        title: "Medical Aid Revenue Report",
        headers: ["Invoice ID", "Medical Aid", "Patient", "Amount", "Claim Status", "Payment"],
        rows: maInvoices.map(i => [i.id, i.medicalAid || "", i.patientName, `R ${i.amount.toLocaleString()}`, i.claimStatus || "N/A", i.paymentStatus]),
        summary: [
          { label: "Total Billed", value: `R ${totalRevenue.toLocaleString()}` },
          { label: "Total Paid", value: `R ${paid.reduce((s, i) => s + i.amount, 0).toLocaleString()}` },
          { label: "Invoices", value: String(maInvoices.length) },
          { label: "Paid Invoices", value: String(paid.length) },
        ],
      };
    }
    case "Debt Recovery Report": {
      const totalDebt = debtRecoveryData.reduce((s, d) => s + d.invoiceAmount, 0);
      const totalCollected = debtRecoveryData.reduce((s, d) => s + d.amountPaid, 0);
      return {
        title: "Debt Recovery Report",
        headers: ["Case ID", "Patient", "Invoice", "Paid", "Balance", "Officer", "Status"],
        rows: debtRecoveryData.map(d => [d.id, d.patientName, `R ${d.invoiceAmount.toLocaleString()}`, `R ${d.amountPaid.toLocaleString()}`, `R ${d.balance.toLocaleString()}`, d.recoveryOfficer, d.status]),
        summary: [
          { label: "Total Debt", value: `R ${totalDebt.toLocaleString()}` },
          { label: "Total Collected", value: `R ${totalCollected.toLocaleString()}` },
          { label: "Outstanding", value: `R ${(totalDebt - totalCollected).toLocaleString()}` },
          { label: "Recovery Rate", value: `${((totalCollected / totalDebt) * 100).toFixed(1)}%` },
        ],
      };
    }
    case "Outstanding Invoice Report": {
      const totalBalance = outstandingBalancesData.reduce((s, o) => s + o.balance, 0);
      return {
        title: "Outstanding Invoice Report",
        headers: ["ID", "Patient", "Invoice Amt", "Paid", "Balance", "Date", "Status"],
        rows: outstandingBalancesData.map(o => [o.id, o.patientName, `R ${o.invoiceAmount.toLocaleString()}`, `R ${o.amountPaid.toLocaleString()}`, `R ${o.balance.toLocaleString()}`, o.invoiceDate, o.status]),
        summary: [
          { label: "Total Outstanding", value: `R ${totalBalance.toLocaleString()}` },
          { label: "Overdue Cases", value: String(outstandingBalancesData.filter(o => o.status === "Overdue").length) },
          { label: "Total Cases", value: String(outstandingBalancesData.length) },
        ],
      };
    }
    case "Revenue by Test Type": {
      const byTest: Record<string, { count: number; total: number }> = {};
      invoicesData.forEach(i => {
        if (!byTest[i.testType]) byTest[i.testType] = { count: 0, total: 0 };
        byTest[i.testType].count++;
        byTest[i.testType].total += i.amount;
      });
      return {
        title: "Revenue by Test Type",
        headers: ["Test Type", "Invoice Count", "Total Revenue"],
        rows: Object.entries(byTest).map(([test, data]) => [test, String(data.count), `R ${data.total.toLocaleString()}`]),
        summary: [
          { label: "Total Revenue", value: `R ${invoicesData.reduce((s, i) => s + i.amount, 0).toLocaleString()}` },
          { label: "Test Types", value: String(Object.keys(byTest).length) },
          { label: "Total Invoices", value: String(invoicesData.length) },
        ],
      };
    }
    case "Special Accounting Reports": {
      const entries = [
        { category: "Write-offs", amount: 12400, count: 5, period: "Q1 2024" },
        { category: "Bad Debt Provisions", amount: 28950, count: 8, period: "Q1 2024" },
        { category: "Adjustments - Credit Notes", amount: 6800, count: 12, period: "Q1 2024" },
        { category: "Inter-Lab Transfers", amount: 45200, count: 23, period: "Q1 2024" },
        { category: "Refunds Processed", amount: 3200, count: 4, period: "Q1 2024" },
        { category: "Discount Allowances", amount: 8900, count: 15, period: "Q1 2024" },
        { category: "Provisional Tax Adjustments", amount: 18500, count: 2, period: "Q1 2024" },
      ];
      const totalAmount = entries.reduce((s, e) => s + e.amount, 0);
      return {
        title: "Special Accounting Reports",
        headers: ["Category", "Transaction Count", "Total Amount", "Period"],
        rows: entries.map(e => [e.category, String(e.count), `R ${e.amount.toLocaleString()}`, e.period]),
        summary: [
          { label: "Total Special Items", value: `R ${totalAmount.toLocaleString()}` },
          { label: "Categories", value: String(entries.length) },
          { label: "Total Transactions", value: String(entries.reduce((s, e) => s + e.count, 0)) },
          { label: "Period", value: "Q1 2024" },
        ],
      };
    }
    case "Monthly Cash Flow Analysis": {
      const months = [
        { month: "January", inflow: 148000, outflow: 112000 },
        { month: "February", inflow: 162000, outflow: 125000 },
        { month: "March", inflow: 155000, outflow: 118000 },
        { month: "April", inflow: 171000, outflow: 130000 },
        { month: "May", inflow: 168000, outflow: 127000 },
        { month: "June", inflow: 175000, outflow: 134000 },
      ];
      const totalInflow = months.reduce((s, m) => s + m.inflow, 0);
      const totalOutflow = months.reduce((s, m) => s + m.outflow, 0);
      return {
        title: "Monthly Cash Flow Analysis",
        headers: ["Month", "Cash Inflow (R)", "Cash Outflow (R)", "Net Cash Flow (R)", "Cumulative (R)"],
        rows: (() => {
          let cumulative = 0;
          return months.map(m => {
            const net = m.inflow - m.outflow;
            cumulative += net;
            return [m.month, `R ${m.inflow.toLocaleString()}`, `R ${m.outflow.toLocaleString()}`, `R ${net.toLocaleString()}`, `R ${cumulative.toLocaleString()}`];
          });
        })(),
        summary: [
          { label: "Total Inflow", value: `R ${totalInflow.toLocaleString()}` },
          { label: "Total Outflow", value: `R ${totalOutflow.toLocaleString()}` },
          { label: "Net Cash Flow", value: `R ${(totalInflow - totalOutflow).toLocaleString()}` },
          { label: "Avg Monthly Net", value: `R ${Math.round((totalInflow - totalOutflow) / months.length).toLocaleString()}` },
        ],
      };
    }
    case "VAT Schedules": {
      const vatEntries = [
        { period: "Jan 2024", outputVAT: 22200, inputVAT: 16800, net: 5400 },
        { period: "Feb 2024", outputVAT: 24300, inputVAT: 18750, net: 5550 },
        { period: "Mar 2024", outputVAT: 23250, inputVAT: 17700, net: 5550 },
        { period: "Apr 2024", outputVAT: 25650, inputVAT: 19500, net: 6150 },
        { period: "May 2024", outputVAT: 25200, inputVAT: 19050, net: 6150 },
        { period: "Jun 2024", outputVAT: 26250, inputVAT: 20100, net: 6150 },
      ];
      const totalOutput = vatEntries.reduce((s, v) => s + v.outputVAT, 0);
      const totalInput = vatEntries.reduce((s, v) => s + v.inputVAT, 0);
      return {
        title: "VAT Schedules",
        headers: ["VAT Period", "Output VAT (R)", "Input VAT (R)", "Net VAT Payable (R)"],
        rows: vatEntries.map(v => [v.period, `R ${v.outputVAT.toLocaleString()}`, `R ${v.inputVAT.toLocaleString()}`, `R ${v.net.toLocaleString()}`]),
        summary: [
          { label: "Total Output VAT", value: `R ${totalOutput.toLocaleString()}` },
          { label: "Total Input VAT", value: `R ${totalInput.toLocaleString()}` },
          { label: "Total Net VAT", value: `R ${(totalOutput - totalInput).toLocaleString()}` },
          { label: "VAT Rate", value: "15%" },
        ],
      };
    }
    case "Accounting Utilities": {
      const utilities = [
        { utility: "Trial Balance Verification", lastRun: "2024-03-15", status: "Balanced", result: "Debits = Credits", variance: 0 },
        { utility: "Bank Reconciliation", lastRun: "2024-03-14", status: "Completed", result: "3 uncleared items", variance: 2450 },
        { utility: "Aged Debtors Analysis", lastRun: "2024-03-13", status: "Completed", result: "8 accounts > 90 days", variance: 18500 },
        { utility: "Aged Creditors Analysis", lastRun: "2024-03-12", status: "Completed", result: "2 accounts > 60 days", variance: 5200 },
        { utility: "Duplicate Invoice Check", lastRun: "2024-03-11", status: "Clean", result: "No duplicates found", variance: 0 },
        { utility: "GL Account Reconciliation", lastRun: "2024-03-10", status: "Review Needed", result: "Suspense account balance", variance: 3800 },
      ];
      return {
        title: "Accounting Utilities",
        headers: ["Utility", "Last Run", "Status", "Result", "Variance (R)"],
        rows: utilities.map(u => [u.utility, u.lastRun, u.status, u.result, u.variance ? `R ${u.variance.toLocaleString()}` : "-"]),
        summary: [
          { label: "Utilities Run", value: String(utilities.length) },
          { label: "Issues Found", value: String(utilities.filter(u => u.variance > 0).length) },
          { label: "Total Variance", value: `R ${utilities.reduce((s, u) => s + u.variance, 0).toLocaleString()}` },
          { label: "Last Full Run", value: "2024-03-15" },
        ],
      };
    }
    default:
      return { title: "", headers: [], rows: [], summary: [] };
  }
}

export default function FinancialReports() {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [provider, setProvider] = useState("all");
  const [report, setReport] = useState<ReturnType<typeof generateReport> | null>(null);

  const handleGenerate = () => {
    if (!selectedReport) {
      toast({ title: "Select Report", description: "Please select a report type", variant: "destructive" });
      return;
    }
    const r = generateReport(selectedReport);
    setReport(r);
    toast({ title: "Report Generated", description: `${r.title} has been generated successfully` });
  };

  const handleExport = (format: string) => {
    if (!report) {
      toast({ title: "No Report", description: "Generate a report first", variant: "destructive" });
      return;
    }
    if (format === "CSV") {
      const csv = [report.headers.join(","), ...report.rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${report.title.replace(/\s+/g, "_")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "CSV Exported", description: `${report.title} exported as CSV` });
    } else {
      toast({ title: `${format} Export`, description: `${report.title} exported as ${format}` });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <p className="text-muted-foreground">Generate accounting reports for management review</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Generate Report</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="grid gap-2">
              <Label>Report Type</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger><SelectValue placeholder="Select report" /></SelectTrigger>
                <SelectContent>
                  {reportTypes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Date From</Label><Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} /></div>
            <div className="grid gap-2"><Label>Date To</Label><Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} /></div>
            <div className="grid gap-2">
              <Label>Medical Aid Provider</Label>
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger><SelectValue placeholder="All providers" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="discovery">Discovery Health</SelectItem>
                  <SelectItem value="bonitas">Bonitas</SelectItem>
                  <SelectItem value="momentum">Momentum Health</SelectItem>
                  <SelectItem value="gems">GEMS</SelectItem>
                  <SelectItem value="medihelp">Medihelp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleGenerate}><FileText className="h-4 w-4 mr-2" />Generate Report</Button>
            <Button variant="outline" onClick={() => handleExport("PDF")}><Download className="h-4 w-4 mr-2" />Export PDF</Button>
            <Button variant="outline" onClick={() => handleExport("Excel")}><Download className="h-4 w-4 mr-2" />Export Excel</Button>
            <Button variant="outline" onClick={() => handleExport("CSV")}><Download className="h-4 w-4 mr-2" />Export CSV</Button>
          </div>
        </CardContent>
      </Card>

      {report && (
        <Card>
          <CardHeader><CardTitle>{report.title}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {report.summary.map(s => (
                <div key={s.label} className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  {report.headers.map(h => <TableHead key={h}>{h}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.rows.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => <TableCell key={j} className="text-sm">{cell}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {!report && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map(r => (
            <Card key={r} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => { setSelectedReport(r); }}>
              <CardHeader className="flex flex-row items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-base">{r}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Click to select, then generate</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
