import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentStaff } from "@/data/mockData";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StaffProfile() {
  const { toast } = useToast();
  const [staff, setStaff] = useState(currentStaff);

  const handleSave = () => {
    toast({ title: "Profile Updated", description: "Your profile has been saved" });
  };

  const handleBankSave = () => {
    toast({ title: "Bank Details Submitted", description: "Your bank update request has been sent for HR/Finance approval" });
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">My Profile</h1><p className="text-muted-foreground">Manage your personal information</p></div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{staff.fullName}</p>
                <p className="text-sm text-muted-foreground">{staff.role} • {staff.department}</p>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="grid gap-1"><Label>Staff ID</Label><Input value={staff.id} disabled className="bg-muted" /></div>
              <div className="grid gap-1"><Label>Full Name</Label><Input value={staff.fullName} onChange={e => setStaff(p => ({ ...p, fullName: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Department</Label><Input value={staff.department} disabled className="bg-muted" /></div>
              <div className="grid gap-1"><Label>Role</Label><Input value={staff.role} disabled className="bg-muted" /></div>
              <div className="grid gap-1"><Label>Email</Label><Input value={staff.email} onChange={e => setStaff(p => ({ ...p, email: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Phone</Label><Input value={staff.phone} onChange={e => setStaff(p => ({ ...p, phone: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Address</Label><Input value={staff.address} onChange={e => setStaff(p => ({ ...p, address: e.target.value }))} /></div>
              <Separator />
              <div className="grid gap-1"><Label>Emergency Contact</Label><Input value={staff.emergencyContactName} onChange={e => setStaff(p => ({ ...p, emergencyContactName: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Emergency Phone</Label><Input value={staff.emergencyContactPhone} onChange={e => setStaff(p => ({ ...p, emergencyContactPhone: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Guarantor Name</Label><Input value={staff.guarantorName} onChange={e => setStaff(p => ({ ...p, guarantorName: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Guarantor Phone</Label><Input value={staff.guarantorPhone} onChange={e => setStaff(p => ({ ...p, guarantorPhone: e.target.value }))} /></div>
            </div>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Bank / Salary Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Update your payment details. Changes require HR and Finance approval.</p>
            <div className="grid gap-3">
              <div className="grid gap-1"><Label>Bank Name</Label><Input value={staff.bankName} onChange={e => setStaff(p => ({ ...p, bankName: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Account Name</Label><Input value={staff.accountName} onChange={e => setStaff(p => ({ ...p, accountName: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Account Number</Label><Input value={staff.accountNumber} onChange={e => setStaff(p => ({ ...p, accountNumber: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Branch Code</Label><Input value={staff.branchCode} onChange={e => setStaff(p => ({ ...p, branchCode: e.target.value }))} /></div>
              <div className="grid gap-1"><Label>Payment Method</Label><Input value={staff.paymentMethod} onChange={e => setStaff(p => ({ ...p, paymentMethod: e.target.value }))} /></div>
            </div>
            <Button onClick={handleBankSave}>Submit Update Request</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
