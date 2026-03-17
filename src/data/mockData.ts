// ===================== CLAIMS =====================
export interface Claim {
  id: string;
  labNumber: string;
  patientName: string;
  medicalAid: string;
  medicalAidNumber: string;
  testPerformed: string;
  claimAmount: number;
  status: "Draft" | "Submitted" | "Processing" | "Approved" | "Rejected";
  submissionDate: string;
  approvalStatus?: string;
  paymentStatus?: "Pending" | "Paid" | "Partial Payment" | "Rejected";
}

export const claimsData: Claim[] = [
  { id: "CLM-001", labNumber: "LAB-2024-0451", patientName: "John Mokoena", medicalAid: "Discovery Health", medicalAidNumber: "DH-9821034", testPerformed: "Full Blood Count", claimAmount: 450, status: "Approved", submissionDate: "2024-03-01", paymentStatus: "Paid" },
  { id: "CLM-002", labNumber: "LAB-2024-0452", patientName: "Sarah Nkosi", medicalAid: "Bonitas", medicalAidNumber: "BN-7634521", testPerformed: "Lipid Panel", claimAmount: 680, status: "Processing", submissionDate: "2024-03-02", paymentStatus: "Pending" },
  { id: "CLM-003", labNumber: "LAB-2024-0453", patientName: "David van der Merwe", medicalAid: "Momentum Health", medicalAidNumber: "MH-4456789", testPerformed: "Thyroid Function", claimAmount: 520, status: "Submitted", submissionDate: "2024-03-03", paymentStatus: "Pending" },
  { id: "CLM-004", labNumber: "LAB-2024-0454", patientName: "Thandi Dlamini", medicalAid: "GEMS", medicalAidNumber: "GM-1123456", testPerformed: "Glucose Tolerance", claimAmount: 380, status: "Rejected", submissionDate: "2024-03-04", paymentStatus: "Rejected" },
  { id: "CLM-005", labNumber: "LAB-2024-0455", patientName: "Michael Peters", medicalAid: "Medihelp", medicalAidNumber: "MH-8890123", testPerformed: "Liver Function", claimAmount: 590, status: "Approved", submissionDate: "2024-03-05", paymentStatus: "Paid" },
  { id: "CLM-006", labNumber: "LAB-2024-0456", patientName: "Nomsa Zulu", medicalAid: "Discovery Health", medicalAidNumber: "DH-5567890", testPerformed: "Renal Panel", claimAmount: 720, status: "Approved", submissionDate: "2024-03-06", paymentStatus: "Paid" },
  { id: "CLM-007", labNumber: "LAB-2024-0457", patientName: "Pieter Botha", medicalAid: "Bonitas", medicalAidNumber: "BN-2234567", testPerformed: "Iron Studies", claimAmount: 410, status: "Draft", submissionDate: "2024-03-07", paymentStatus: "Pending" },
  { id: "CLM-008", labNumber: "LAB-2024-0458", patientName: "Lerato Molefe", medicalAid: "GEMS", medicalAidNumber: "GM-9901234", testPerformed: "HbA1c", claimAmount: 340, status: "Processing", submissionDate: "2024-03-08", paymentStatus: "Pending" },
  { id: "CLM-009", labNumber: "LAB-2024-0459", patientName: "Francois du Plessis", medicalAid: "Momentum Health", medicalAidNumber: "MH-6678901", testPerformed: "PSA", claimAmount: 290, status: "Approved", submissionDate: "2024-03-09", paymentStatus: "Partial Payment" },
  { id: "CLM-010", labNumber: "LAB-2024-0460", patientName: "Zanele Mthembu", medicalAid: "Discovery Health", medicalAidNumber: "DH-3345678", testPerformed: "Vitamin D", claimAmount: 480, status: "Submitted", submissionDate: "2024-03-10", paymentStatus: "Pending" },
  { id: "CLM-011", labNumber: "LAB-2024-0461", patientName: "James Smith", medicalAid: "Medihelp", medicalAidNumber: "MH-1112233", testPerformed: "Urine Analysis", claimAmount: 250, status: "Approved", submissionDate: "2024-03-11", paymentStatus: "Paid" },
  { id: "CLM-012", labNumber: "LAB-2024-0462", patientName: "Precious Sithole", medicalAid: "Bonitas", medicalAidNumber: "BN-4456677", testPerformed: "Coagulation Panel", claimAmount: 850, status: "Processing", submissionDate: "2024-03-12", paymentStatus: "Pending" },
];

// ===================== DEBT RECOVERY =====================
export interface DebtCase {
  id: string;
  patientName: string;
  labNumber: string;
  invoiceAmount: number;
  amountPaid: number;
  balance: number;
  recoveryOfficer: string;
  status: "Pending" | "Partial Payment" | "Fully Paid" | "Escalated";
}

export const debtRecoveryData: DebtCase[] = [
  { id: "DRC-001", patientName: "Peter Mahlangu", labNumber: "LAB-2024-0301", invoiceAmount: 1200, amountPaid: 400, balance: 800, recoveryOfficer: "Lindiwe Khumalo", status: "Partial Payment" },
  { id: "DRC-002", patientName: "Anna Pretorius", labNumber: "LAB-2024-0302", invoiceAmount: 850, amountPaid: 0, balance: 850, recoveryOfficer: "Sipho Ndlovu", status: "Pending" },
  { id: "DRC-003", patientName: "Bongani Nzimande", labNumber: "LAB-2024-0303", invoiceAmount: 2100, amountPaid: 2100, balance: 0, recoveryOfficer: "Lindiwe Khumalo", status: "Fully Paid" },
  { id: "DRC-004", patientName: "Karen Williams", labNumber: "LAB-2024-0304", invoiceAmount: 1500, amountPaid: 300, balance: 1200, recoveryOfficer: "Sipho Ndlovu", status: "Escalated" },
  { id: "DRC-005", patientName: "Tshepo Modise", labNumber: "LAB-2024-0305", invoiceAmount: 670, amountPaid: 0, balance: 670, recoveryOfficer: "Lindiwe Khumalo", status: "Pending" },
  { id: "DRC-006", patientName: "Elise Joubert", labNumber: "LAB-2024-0306", invoiceAmount: 930, amountPaid: 500, balance: 430, recoveryOfficer: "Sipho Ndlovu", status: "Partial Payment" },
  { id: "DRC-007", patientName: "Mandla Shabalala", labNumber: "LAB-2024-0307", invoiceAmount: 1800, amountPaid: 0, balance: 1800, recoveryOfficer: "Lindiwe Khumalo", status: "Escalated" },
  { id: "DRC-008", patientName: "Cynthia de Villiers", labNumber: "LAB-2024-0308", invoiceAmount: 450, amountPaid: 450, balance: 0, recoveryOfficer: "Sipho Ndlovu", status: "Fully Paid" },
  { id: "DRC-009", patientName: "Gift Mabaso", labNumber: "LAB-2024-0309", invoiceAmount: 1100, amountPaid: 200, balance: 900, recoveryOfficer: "Lindiwe Khumalo", status: "Partial Payment" },
  { id: "DRC-010", patientName: "Hendrik Venter", labNumber: "LAB-2024-0310", invoiceAmount: 780, amountPaid: 0, balance: 780, recoveryOfficer: "Sipho Ndlovu", status: "Pending" },
];

// ===================== INVOICES =====================
export interface Invoice {
  id: string;
  type: "Cash" | "Medical Aid";
  patientName: string;
  medicalAid?: string;
  labNumber: string;
  testType: string;
  amount: number;
  claimStatus?: string;
  paymentStatus: "Paid" | "Unpaid" | "Partial Payment" | "Overdue";
  dateIssued: string;
}

export const invoicesData: Invoice[] = [
  { id: "INV-001", type: "Cash", patientName: "Peter Mahlangu", labNumber: "LAB-2024-0301", testType: "Full Blood Count", amount: 450, paymentStatus: "Paid", dateIssued: "2024-03-01" },
  { id: "INV-002", type: "Cash", patientName: "Anna Pretorius", labNumber: "LAB-2024-0302", testType: "Lipid Panel", amount: 680, paymentStatus: "Unpaid", dateIssued: "2024-03-02" },
  { id: "INV-003", type: "Medical Aid", patientName: "John Mokoena", medicalAid: "Discovery Health", labNumber: "LAB-2024-0451", testType: "Full Blood Count", amount: 450, claimStatus: "Approved", paymentStatus: "Paid", dateIssued: "2024-03-01" },
  { id: "INV-004", type: "Medical Aid", patientName: "Sarah Nkosi", medicalAid: "Bonitas", labNumber: "LAB-2024-0452", testType: "Lipid Panel", amount: 680, claimStatus: "Processing", paymentStatus: "Unpaid", dateIssued: "2024-03-02" },
  { id: "INV-005", type: "Cash", patientName: "Bongani Nzimande", labNumber: "LAB-2024-0303", testType: "Thyroid Function", amount: 520, paymentStatus: "Partial Payment", dateIssued: "2024-03-03" },
  { id: "INV-006", type: "Medical Aid", patientName: "David van der Merwe", medicalAid: "Momentum Health", labNumber: "LAB-2024-0453", testType: "Thyroid Function", amount: 520, claimStatus: "Submitted", paymentStatus: "Unpaid", dateIssued: "2024-03-03" },
  { id: "INV-007", type: "Cash", patientName: "Karen Williams", labNumber: "LAB-2024-0304", testType: "Glucose Tolerance", amount: 380, paymentStatus: "Overdue", dateIssued: "2024-02-15" },
  { id: "INV-008", type: "Medical Aid", patientName: "Thandi Dlamini", medicalAid: "GEMS", labNumber: "LAB-2024-0454", testType: "Glucose Tolerance", amount: 380, claimStatus: "Rejected", paymentStatus: "Unpaid", dateIssued: "2024-03-04" },
  { id: "INV-009", type: "Cash", patientName: "Tshepo Modise", labNumber: "LAB-2024-0305", testType: "Liver Function", amount: 590, paymentStatus: "Unpaid", dateIssued: "2024-03-05" },
  { id: "INV-010", type: "Medical Aid", patientName: "Michael Peters", medicalAid: "Medihelp", labNumber: "LAB-2024-0455", testType: "Liver Function", amount: 590, claimStatus: "Approved", paymentStatus: "Paid", dateIssued: "2024-03-05" },
  { id: "INV-011", type: "Cash", patientName: "Elise Joubert", labNumber: "LAB-2024-0306", testType: "Renal Panel", amount: 720, paymentStatus: "Partial Payment", dateIssued: "2024-03-06" },
  { id: "INV-012", type: "Medical Aid", patientName: "Nomsa Zulu", medicalAid: "Discovery Health", labNumber: "LAB-2024-0456", testType: "Renal Panel", amount: 720, claimStatus: "Approved", paymentStatus: "Paid", dateIssued: "2024-03-06" },
];

// ===================== OUTSTANDING BALANCES =====================
export interface OutstandingBalance {
  id: string;
  patientName: string;
  labNumber: string;
  invoiceAmount: number;
  amountPaid: number;
  balance: number;
  invoiceDate: string;
  status: "Unpaid" | "Partial Payment" | "Overdue" | "Paid";
}

export const outstandingBalancesData: OutstandingBalance[] = [
  { id: "OB-001", patientName: "Anna Pretorius", labNumber: "LAB-2024-0302", invoiceAmount: 680, amountPaid: 0, balance: 680, invoiceDate: "2024-03-02", status: "Unpaid" },
  { id: "OB-002", patientName: "Karen Williams", labNumber: "LAB-2024-0304", invoiceAmount: 380, amountPaid: 0, balance: 380, invoiceDate: "2024-02-15", status: "Overdue" },
  { id: "OB-003", patientName: "Bongani Nzimande", labNumber: "LAB-2024-0303", invoiceAmount: 520, amountPaid: 200, balance: 320, invoiceDate: "2024-03-03", status: "Partial Payment" },
  { id: "OB-004", patientName: "Tshepo Modise", labNumber: "LAB-2024-0305", invoiceAmount: 590, amountPaid: 0, balance: 590, invoiceDate: "2024-03-05", status: "Unpaid" },
  { id: "OB-005", patientName: "Elise Joubert", labNumber: "LAB-2024-0306", invoiceAmount: 720, amountPaid: 300, balance: 420, invoiceDate: "2024-03-06", status: "Partial Payment" },
  { id: "OB-006", patientName: "Gift Mabaso", labNumber: "LAB-2024-0309", invoiceAmount: 1100, amountPaid: 200, balance: 900, invoiceDate: "2024-02-20", status: "Overdue" },
  { id: "OB-007", patientName: "Hendrik Venter", labNumber: "LAB-2024-0310", invoiceAmount: 780, amountPaid: 0, balance: 780, invoiceDate: "2024-03-10", status: "Unpaid" },
  { id: "OB-008", patientName: "Mandla Shabalala", labNumber: "LAB-2024-0307", invoiceAmount: 1800, amountPaid: 0, balance: 1800, invoiceDate: "2024-02-10", status: "Overdue" },
];

// ===================== ASSETS =====================
export interface Asset {
  id: string;
  item: string;
  lab: "BOOYSENS" | "RUSTENBURG";
  date: string;
  purchaseDate: string;
  category: "Laboratory Equipment" | "Diagnostic Machines" | "Office Equipment" | "IT Infrastructure";
  subCategory: string;
  purchasePrice: number;
  marketValue: number;
  location: "Durban" | "Johannesburg" | "Pretoria" | "Cape Town" | "Bloemfontein" | "Rustenburg" | "Newcastle" | "Port Elizabeth" | "Welkom" | "Mafikeng" | "Elim" | "Ladysmith" | "Polokwane" | "Kuruman" | "Kimberley" | "Mthatha" | "Nelspruit";
  status: "Active" | "Maintenance" | "Retired";
  nextMaintenance?: string;
}

export const assetsData: Asset[] = [
  { id: "AST-001", item: "Beckman Coulter AU5800", lab: "BOOYSENS", date: "2024-01-15", purchaseDate: "2022-01-15", category: "Laboratory Equipment", subCategory: "Chemistry Analyser", purchasePrice: 850000, marketValue: 680000, location: "Johannesburg", status: "Active", nextMaintenance: "2024-06-15" },
  { id: "AST-002", item: "Roche Cobas 8000", lab: "RUSTENBURG", date: "2024-01-20", purchaseDate: "2019-06-20", category: "Diagnostic Machines", subCategory: "Immunoassay Analyser", purchasePrice: 1200000, marketValue: 750000, location: "Rustenburg", status: "Active", nextMaintenance: "2024-04-20" },
  { id: "AST-003", item: "Sysmex XN-1000", lab: "BOOYSENS", date: "2024-02-10", purchaseDate: "2023-03-10", category: "Laboratory Equipment", subCategory: "Haematology Analyser", purchasePrice: 450000, marketValue: 410000, location: "Johannesburg", status: "Active", nextMaintenance: "2024-09-10" },
  { id: "AST-004", item: "Bio-Rad CFX96", lab: "RUSTENBURG", date: "2024-02-15", purchaseDate: "2020-09-01", category: "Diagnostic Machines", subCategory: "PCR System", purchasePrice: 320000, marketValue: 200000, location: "Rustenburg", status: "Maintenance", nextMaintenance: "2024-03-01" },
  { id: "AST-005", item: "HP LaserJet Pro M404", lab: "BOOYSENS", date: "2024-01-05", purchaseDate: "2023-01-05", category: "Office Equipment", subCategory: "Printer", purchasePrice: 8500, marketValue: 5500, location: "Durban", status: "Active" },
  { id: "AST-006", item: "Dell PowerEdge R740", lab: "BOOYSENS", date: "2024-01-15", purchaseDate: "2021-04-15", category: "IT Infrastructure", subCategory: "Server", purchasePrice: 95000, marketValue: 55000, location: "Johannesburg", status: "Active", nextMaintenance: "2024-07-15" },
  { id: "AST-007", item: "Thermo Fisher Centrifuge", lab: "RUSTENBURG", date: "2023-07-22", purchaseDate: "2018-07-22", category: "Laboratory Equipment", subCategory: "Centrifuge", purchasePrice: 45000, marketValue: 8000, location: "Pretoria", status: "Retired" },
  { id: "AST-008", item: "Cisco Switch 48-Port", lab: "BOOYSENS", date: "2024-01-30", purchaseDate: "2022-08-30", category: "IT Infrastructure", subCategory: "Network Switch", purchasePrice: 28000, marketValue: 18000, location: "Johannesburg", status: "Active" },
  { id: "AST-009", item: "Olympus CX23", lab: "RUSTENBURG", date: "2024-02-12", purchaseDate: "2021-11-12", category: "Diagnostic Machines", subCategory: "Microscope", purchasePrice: 35000, marketValue: 25000, location: "Cape Town", status: "Active" },
  { id: "AST-010", item: "Xerox VersaLink C405", lab: "BOOYSENS", date: "2024-02-18", purchaseDate: "2023-05-18", category: "Office Equipment", subCategory: "Multifunction Printer", purchasePrice: 12000, marketValue: 9000, location: "Bloemfontein", status: "Active" },
  { id: "AST-011", item: "Siemens Advia 2120i", lab: "BOOYSENS", date: "2024-03-01", purchaseDate: "2022-06-10", category: "Laboratory Equipment", subCategory: "Haematology Analyser", purchasePrice: 520000, marketValue: 430000, location: "Newcastle", status: "Active", nextMaintenance: "2024-12-10" },
  { id: "AST-012", item: "Abbott Architect i2000", lab: "RUSTENBURG", date: "2024-03-05", purchaseDate: "2021-02-18", category: "Diagnostic Machines", subCategory: "Immunoassay System", purchasePrice: 980000, marketValue: 620000, location: "Port Elizabeth", status: "Active", nextMaintenance: "2024-08-18" },
  { id: "AST-013", item: "Epson EcoTank L3250", lab: "BOOYSENS", date: "2024-03-08", purchaseDate: "2023-09-01", category: "Office Equipment", subCategory: "Printer", purchasePrice: 4500, marketValue: 3800, location: "Welkom", status: "Active" },
  { id: "AST-014", item: "Beckman Coulter DxH 520", lab: "RUSTENBURG", date: "2024-03-10", purchaseDate: "2020-11-25", category: "Laboratory Equipment", subCategory: "Haematology Analyser", purchasePrice: 380000, marketValue: 240000, location: "Mafikeng", status: "Maintenance", nextMaintenance: "2024-04-25" },
  { id: "AST-015", item: "Dell OptiPlex 7090", lab: "BOOYSENS", date: "2024-03-12", purchaseDate: "2023-04-20", category: "IT Infrastructure", subCategory: "Desktop PC", purchasePrice: 18000, marketValue: 14000, location: "Elim", status: "Active" },
  { id: "AST-016", item: "Roche Cobas u 601", lab: "RUSTENBURG", date: "2024-03-14", purchaseDate: "2022-07-15", category: "Diagnostic Machines", subCategory: "Urinalysis Analyser", purchasePrice: 210000, marketValue: 165000, location: "Ladysmith", status: "Active", nextMaintenance: "2025-01-15" },
  { id: "AST-017", item: "HP ProLiant DL380", lab: "BOOYSENS", date: "2024-03-16", purchaseDate: "2021-10-05", category: "IT Infrastructure", subCategory: "Server", purchasePrice: 120000, marketValue: 72000, location: "Polokwane", status: "Active", nextMaintenance: "2024-10-05" },
  { id: "AST-018", item: "Leica DM1000 LED", lab: "RUSTENBURG", date: "2024-03-18", purchaseDate: "2020-03-12", category: "Diagnostic Machines", subCategory: "Microscope", purchasePrice: 42000, marketValue: 22000, location: "Kuruman", status: "Active" },
  { id: "AST-019", item: "Samsung Galaxy Tab A8", lab: "BOOYSENS", date: "2024-03-20", purchaseDate: "2023-08-01", category: "IT Infrastructure", subCategory: "Tablet", purchasePrice: 5500, marketValue: 4200, location: "Kimberley", status: "Active" },
  { id: "AST-020", item: "Sysmex CA-660", lab: "RUSTENBURG", date: "2024-03-22", purchaseDate: "2019-12-10", category: "Laboratory Equipment", subCategory: "Coagulation Analyser", purchasePrice: 290000, marketValue: 145000, location: "Mthatha", status: "Active", nextMaintenance: "2024-06-10" },
  { id: "AST-021", item: "Brother MFC-L8900CDW", lab: "BOOYSENS", date: "2024-03-25", purchaseDate: "2022-05-20", category: "Office Equipment", subCategory: "Multifunction Printer", purchasePrice: 15000, marketValue: 10000, location: "Nelspruit", status: "Active" },
  { id: "AST-022", item: "Thermo Fisher Incubator", lab: "RUSTENBURG", date: "2024-03-28", purchaseDate: "2021-08-14", category: "Laboratory Equipment", subCategory: "Incubator", purchasePrice: 65000, marketValue: 42000, location: "Pretoria", status: "Active", nextMaintenance: "2025-02-14" },
];

// ===================== AUDIT LOGS =====================
export interface AuditLog {
  id: string;
  user: string;
  action: string;
  module: string;
  recordId: string;
  date: string;
  ipAddress: string;
}

export const auditLogsData: AuditLog[] = [
  { id: "LOG-001", user: "Lindiwe Khumalo", action: "Submitted Claim", module: "Claims", recordId: "CLM-001", date: "2024-03-01 08:30:00", ipAddress: "192.168.1.101" },
  { id: "LOG-002", user: "Sipho Ndlovu", action: "Generated Invoice", module: "Invoicing", recordId: "INV-003", date: "2024-03-01 09:15:00", ipAddress: "192.168.1.102" },
  { id: "LOG-003", user: "Admin", action: "Updated Claim Status", module: "Claims", recordId: "CLM-001", date: "2024-03-01 10:00:00", ipAddress: "192.168.1.100" },
  { id: "LOG-004", user: "Lindiwe Khumalo", action: "Added Payment Record", module: "Debt Recovery", recordId: "DRC-001", date: "2024-03-02 08:45:00", ipAddress: "192.168.1.101" },
  { id: "LOG-005", user: "Sipho Ndlovu", action: "Escalated Case", module: "Debt Recovery", recordId: "DRC-004", date: "2024-03-02 11:30:00", ipAddress: "192.168.1.102" },
  { id: "LOG-006", user: "Admin", action: "Updated Asset Register", module: "Assets", recordId: "AST-004", date: "2024-03-03 14:20:00", ipAddress: "192.168.1.100" },
  { id: "LOG-007", user: "Lindiwe Khumalo", action: "Submitted Claim", module: "Claims", recordId: "CLM-005", date: "2024-03-05 09:00:00", ipAddress: "192.168.1.101" },
  { id: "LOG-008", user: "Sipho Ndlovu", action: "Generated Invoice", module: "Invoicing", recordId: "INV-010", date: "2024-03-05 10:30:00", ipAddress: "192.168.1.102" },
  { id: "LOG-009", user: "Admin", action: "Modified Settings", module: "Settings", recordId: "SET-001", date: "2024-03-06 16:00:00", ipAddress: "192.168.1.100" },
  { id: "LOG-010", user: "Lindiwe Khumalo", action: "Closed Debt Case", module: "Debt Recovery", recordId: "DRC-003", date: "2024-03-07 08:15:00", ipAddress: "192.168.1.101" },
  { id: "LOG-011", user: "Admin", action: "Approved Claim", module: "Claims", recordId: "CLM-009", date: "2024-03-09 13:45:00", ipAddress: "192.168.1.100" },
  { id: "LOG-012", user: "Sipho Ndlovu", action: "Sent Payment Reminder", module: "Outstanding Balances", recordId: "OB-002", date: "2024-03-10 11:00:00", ipAddress: "192.168.1.102" },
];

// ===================== DASHBOARD DATA =====================
export const dashboardCards = [
  { title: "Total Claims Submitted", value: "R 156,420", count: 142, trend: "+12%", trendUp: true },
  { title: "Claims Approved", value: "R 134,280", count: 118, trend: "+8%", trendUp: true },
  { title: "Claims Rejected", value: "R 8,640", count: 9, trend: "-3%", trendUp: false },
  { title: "Outstanding Claims", value: "R 13,500", count: 15, trend: "+2%", trendUp: true },
  { title: "Total Debt Recovery", value: "R 28,950", count: 10, trend: "+15%", trendUp: true },
  { title: "Cash Patients", value: "R 42,780", count: 67, trend: "+5%", trendUp: true },
];

export const revenueChartData = [
  { month: "Jan", medicalAid: 85000, cash: 22000, debtRecovery: 8000 },
  { month: "Feb", medicalAid: 92000, cash: 25000, debtRecovery: 12000 },
  { month: "Mar", medicalAid: 88000, cash: 28000, debtRecovery: 10000 },
  { month: "Apr", medicalAid: 95000, cash: 24000, debtRecovery: 14000 },
  { month: "May", medicalAid: 102000, cash: 30000, debtRecovery: 11000 },
  { month: "Jun", medicalAid: 98000, cash: 27000, debtRecovery: 15000 },
];

export const claimsProcessingData = [
  { name: "Submitted", value: 142 },
  { name: "Approved", value: 118 },
  { name: "Rejected", value: 9 },
  { name: "Pending", value: 15 },
];

export const outstandingPieData = [
  { name: "Cash Patients", value: 4870 },
  { name: "Medical Aid Shortfalls", value: 2340 },
  { name: "Debt Recovery", value: 7630 },
];

export const recentActivities = [
  { text: "Claim CLM-012 submitted for Precious Sithole", time: "2 min ago", type: "claim" },
  { text: "Payment R400 received from Peter Mahlangu", time: "15 min ago", type: "payment" },
  { text: "Invoice INV-012 generated for Nomsa Zulu", time: "1 hr ago", type: "invoice" },
  { text: "Claim CLM-011 approved for James Smith", time: "2 hrs ago", type: "approval" },
  { text: "Debt case DRC-004 escalated for Karen Williams", time: "3 hrs ago", type: "escalation" },
  { text: "Payment R500 received from Elise Joubert", time: "4 hrs ago", type: "payment" },
  { text: "Asset AST-004 sent for maintenance", time: "5 hrs ago", type: "asset" },
  { text: "Claim CLM-004 rejected – insufficient details", time: "6 hrs ago", type: "rejection" },
];

// ===================== STAFF DATA =====================
export interface StaffMember {
  id: string;
  fullName: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  labLocation: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  guarantorName: string;
  guarantorPhone: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  branchCode: string;
  paymentMethod: string;
  profilePhoto?: string;
}

export const currentStaff: StaffMember = {
  id: "STF-042",
  fullName: "Lindiwe Khumalo",
  department: "Accounting",
  role: "Accounting Assistant",
  email: "lindiwe.khumalo@targetpath.co.za",
  phone: "072 345 6789",
  labLocation: "Johannesburg Main Lab",
  address: "45 Commissioner Street, Johannesburg, 2001",
  emergencyContactName: "Sipho Khumalo",
  emergencyContactPhone: "082 123 4567",
  guarantorName: "Thabo Khumalo",
  guarantorPhone: "083 456 7890",
  bankName: "FNB",
  accountName: "Lindiwe Khumalo",
  accountNumber: "62845901234",
  branchCode: "250655",
  paymentMethod: "Bank Transfer",
};

export interface LeaveRecord {
  id: string;
  type: "Annual" | "Sick" | "Family Responsibility" | "Study";
  startDate: string;
  endDate: string;
  totalDays: number;
  status: "Pending" | "Approved" | "Rejected";
  approver: string;
  reason: string;
}

export const leaveData: LeaveRecord[] = [
  { id: "LV-001", type: "Annual", startDate: "2024-04-15", endDate: "2024-04-19", totalDays: 5, status: "Approved", approver: "Manager Naidoo", reason: "Family holiday" },
  { id: "LV-002", type: "Sick", startDate: "2024-03-20", endDate: "2024-03-21", totalDays: 2, status: "Approved", approver: "Manager Naidoo", reason: "Flu" },
  { id: "LV-003", type: "Annual", startDate: "2024-06-10", endDate: "2024-06-14", totalDays: 5, status: "Pending", approver: "Manager Naidoo", reason: "Personal matters" },
  { id: "LV-004", type: "Family Responsibility", startDate: "2024-02-14", endDate: "2024-02-14", totalDays: 1, status: "Approved", approver: "Manager Naidoo", reason: "Child's school event" },
  { id: "LV-005", type: "Study", startDate: "2024-05-01", endDate: "2024-05-03", totalDays: 3, status: "Rejected", approver: "Manager Naidoo", reason: "Exam preparation" },
];

export const leaveBalances = {
  annual: 12,
  sick: 8,
  familyResponsibility: 3,
  study: 5,
};

export interface Message {
  id: string;
  sender: string;
  senderDept: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  type: "inbox" | "sent" | "draft";
}

export const messagesData: Message[] = [
  { id: "MSG-001", sender: "HR Department", senderDept: "HR", subject: "Updated Leave Policy", body: "Please note the updated leave policy effective from April 2024. All staff are required to submit leave requests at least 5 working days in advance.", date: "2024-03-12", read: false, type: "inbox" },
  { id: "MSG-002", sender: "IT Support", senderDept: "IT", subject: "System Maintenance Notice", body: "The LIMS system will undergo scheduled maintenance on Saturday 16 March from 02:00 to 06:00. Please save all work before this time.", date: "2024-03-11", read: true, type: "inbox" },
  { id: "MSG-003", sender: "Finance Department", senderDept: "Finance", subject: "Salary Payment Confirmation", body: "Your March 2024 salary has been processed and will reflect in your account by the 25th.", date: "2024-03-10", read: true, type: "inbox" },
  { id: "MSG-004", sender: "Lindiwe Khumalo", senderDept: "Accounting", subject: "RE: Outstanding Claims Query", body: "I have checked the outstanding claims for Discovery Health. The total is R13,500.", date: "2024-03-09", read: true, type: "sent" },
  { id: "MSG-005", sender: "Manager Naidoo", senderDept: "Management", subject: "Monthly Review Meeting", body: "Please prepare the monthly claims summary for the review meeting on Friday.", date: "2024-03-08", read: false, type: "inbox" },
  { id: "MSG-006", sender: "Lindiwe Khumalo", senderDept: "Accounting", subject: "Invoice Query", body: "Hi, I need clarification on invoice INV-007 for Karen Williams.", date: "2024-03-07", read: true, type: "draft" },
];

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedBy: string;
  department: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Assigned" | "In Progress" | "Completed" | "Overdue";
}

export const tasksData: Task[] = [
  { id: "TSK-001", title: "Process outstanding claims batch", description: "Submit the pending claims batch for Discovery Health and Bonitas", assignedBy: "Manager Naidoo", department: "Accounting", dueDate: "2024-03-15", priority: "High", status: "In Progress" },
  { id: "TSK-002", title: "Reconcile debt recovery payments", description: "Reconcile all debt recovery payments received this month", assignedBy: "Manager Naidoo", department: "Accounting", dueDate: "2024-03-18", priority: "Medium", status: "Assigned" },
  { id: "TSK-003", title: "Generate monthly financial report", description: "Prepare the monthly financial summary report for management", assignedBy: "Finance Director", department: "Finance", dueDate: "2024-03-20", priority: "High", status: "Assigned" },
  { id: "TSK-004", title: "Follow up on rejected claims", description: "Contact GEMS regarding the rejected claim CLM-004", assignedBy: "Manager Naidoo", department: "Accounting", dueDate: "2024-03-14", priority: "High", status: "Overdue" },
  { id: "TSK-005", title: "Update asset maintenance schedule", description: "Review and update the maintenance schedule for all lab equipment", assignedBy: "Lab Manager", department: "Operations", dueDate: "2024-03-25", priority: "Low", status: "Assigned" },
  { id: "TSK-006", title: "Verify invoice batch INV-001 to INV-012", description: "Cross-check all invoices against LIMS test records", assignedBy: "Manager Naidoo", department: "Accounting", dueDate: "2024-03-12", priority: "Medium", status: "Completed" },
];

export interface ShiftSchedule {
  id: string;
  date: string;
  shiftType: "Morning" | "Afternoon" | "Night";
  startTime: string;
  endTime: string;
  location: string;
}

export const scheduleData: ShiftSchedule[] = [
  { id: "SH-001", date: "2024-03-11", shiftType: "Morning", startTime: "07:00", endTime: "15:00", location: "Main Lab" },
  { id: "SH-002", date: "2024-03-12", shiftType: "Morning", startTime: "07:00", endTime: "15:00", location: "Main Lab" },
  { id: "SH-003", date: "2024-03-13", shiftType: "Afternoon", startTime: "12:00", endTime: "20:00", location: "Main Lab" },
  { id: "SH-004", date: "2024-03-14", shiftType: "Morning", startTime: "07:00", endTime: "15:00", location: "Main Lab" },
  { id: "SH-005", date: "2024-03-15", shiftType: "Morning", startTime: "07:00", endTime: "15:00", location: "Main Lab" },
  { id: "SH-006", date: "2024-03-18", shiftType: "Morning", startTime: "07:00", endTime: "15:00", location: "Chemistry Lab" },
  { id: "SH-007", date: "2024-03-19", shiftType: "Afternoon", startTime: "12:00", endTime: "20:00", location: "Chemistry Lab" },
  { id: "SH-008", date: "2024-03-20", shiftType: "Morning", startTime: "07:00", endTime: "15:00", location: "Main Lab" },
];

export interface DocumentRecord {
  id: string;
  name: string;
  department: string;
  dateUploaded: string;
  version: string;
  category: "HR Policies" | "Laboratory SOPs" | "Safety Protocols" | "Operational Guidelines";
}

export const documentsData: DocumentRecord[] = [
  { id: "DOC-001", name: "Leave Policy 2024", department: "HR", dateUploaded: "2024-01-15", version: "2.1", category: "HR Policies" },
  { id: "DOC-002", name: "Blood Collection SOP", department: "Laboratory", dateUploaded: "2024-02-01", version: "3.0", category: "Laboratory SOPs" },
  { id: "DOC-003", name: "Fire Safety Protocol", department: "Safety", dateUploaded: "2023-12-10", version: "1.5", category: "Safety Protocols" },
  { id: "DOC-004", name: "Specimen Handling Guidelines", department: "Laboratory", dateUploaded: "2024-02-20", version: "4.2", category: "Laboratory SOPs" },
  { id: "DOC-005", name: "Staff Code of Conduct", department: "HR", dateUploaded: "2024-01-01", version: "1.0", category: "HR Policies" },
  { id: "DOC-006", name: "IT Security Policy", department: "IT", dateUploaded: "2024-03-01", version: "2.0", category: "Operational Guidelines" },
  { id: "DOC-007", name: "Biohazard Waste Disposal", department: "Safety", dateUploaded: "2024-01-20", version: "3.1", category: "Safety Protocols" },
  { id: "DOC-008", name: "Equipment Calibration Guide", department: "Laboratory", dateUploaded: "2024-02-15", version: "2.3", category: "Laboratory SOPs" },
];

export interface AttendanceRecord {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  hoursWorked: number;
  overtime: number;
}

export const attendanceData: AttendanceRecord[] = [
  { id: "ATT-001", date: "2024-03-11", clockIn: "06:55", clockOut: "15:05", hoursWorked: 8.17, overtime: 0 },
  { id: "ATT-002", date: "2024-03-12", clockIn: "06:58", clockOut: "16:30", hoursWorked: 9.53, overtime: 1.53 },
  { id: "ATT-003", date: "2024-03-13", clockIn: "11:50", clockOut: "20:10", hoursWorked: 8.33, overtime: 0.33 },
  { id: "ATT-004", date: "2024-03-14", clockIn: "07:02", clockOut: "15:00", hoursWorked: 7.97, overtime: 0 },
  { id: "ATT-005", date: "2024-03-15", clockIn: "06:50", clockOut: "15:20", hoursWorked: 8.5, overtime: 0.5 },
];

export interface ExpenseClaim {
  id: string;
  type: "Transport" | "Fuel" | "Office Supplies" | "Equipment" | "Other";
  amount: number;
  date: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected" | "Paid";
}

export const expenseClaimsData: ExpenseClaim[] = [
  { id: "EXP-001", type: "Transport", amount: 350, date: "2024-03-10", description: "Uber to satellite lab for specimen collection", status: "Approved" },
  { id: "EXP-002", type: "Office Supplies", amount: 125, date: "2024-03-08", description: "Printer paper and toner cartridge", status: "Paid" },
  { id: "EXP-003", type: "Fuel", amount: 480, date: "2024-03-12", description: "Fuel for specimen delivery vehicle", status: "Pending" },
  { id: "EXP-004", type: "Equipment", amount: 1200, date: "2024-03-05", description: "Replacement pipette tips", status: "Rejected" },
  { id: "EXP-005", type: "Other", amount: 75, date: "2024-03-11", description: "Parking fees – hospital specimen pickup", status: "Pending" },
];

export interface SupportRequest {
  id: string;
  category: "HR" | "IT" | "Finance";
  description: string;
  date: string;
  status: "Open" | "In Progress" | "Resolved";
}

export const supportRequestsData: SupportRequest[] = [
  { id: "SR-001", category: "IT", description: "LIMS system login not working after password reset", date: "2024-03-12", status: "In Progress" },
  { id: "SR-002", category: "HR", description: "Request for updated employment letter for bank", date: "2024-03-10", status: "Resolved" },
  { id: "SR-003", category: "Finance", description: "Query on tax deduction for February payslip", date: "2024-03-09", status: "Open" },
  { id: "SR-004", category: "IT", description: "Printer not connecting to network in admin office", date: "2024-03-11", status: "Open" },
  { id: "SR-005", category: "HR", description: "Update marital status on HR records", date: "2024-03-08", status: "Resolved" },
];

export const notificationsData = [
  { id: "N-001", title: "Leave Approved", description: "Your annual leave from 15-19 April has been approved", timestamp: "2024-03-12 10:30", read: false },
  { id: "N-002", title: "Task Assigned", description: "New task: Process outstanding claims batch", timestamp: "2024-03-12 09:00", read: false },
  { id: "N-003", title: "Message Received", description: "New message from HR Department", timestamp: "2024-03-12 08:45", read: true },
  { id: "N-004", title: "Expense Claim Update", description: "Your transport expense claim has been approved", timestamp: "2024-03-11 16:00", read: true },
  { id: "N-005", title: "Shift Change", description: "Your shift on 13 March changed to Afternoon", timestamp: "2024-03-11 14:30", read: true },
];
