import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { attendanceData, type AttendanceRecord } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Attendance() {
  const { toast } = useToast();
  const [records, setRecords] = useState<AttendanceRecord[]>(attendanceData);
  const [clockedIn, setClockedIn] = useState(false);

  const totalHours = records.reduce((s, r) => s + r.hoursWorked, 0);
  const totalOvertime = records.reduce((s, r) => s + r.overtime, 0);

  const handleClockIn = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newRecord: AttendanceRecord = {
      id: `ATT-${String(records.length + 1).padStart(3, "0")}`,
      date: now.toISOString().split("T")[0],
      clockIn: time,
      clockOut: "--:--",
      hoursWorked: 0,
      overtime: 0,
    };
    setRecords(prev => [newRecord, ...prev]);
    setClockedIn(true);
    toast({ title: "Clocked In", description: `Clock-in recorded at ${time}` });
  };

  const handleClockOut = () => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setRecords(prev => prev.map((r, i) => i === 0 ? { ...r, clockOut: time, hoursWorked: 8, overtime: 0 } : r));
    setClockedIn(false);
    toast({ title: "Clocked Out", description: `Clock-out recorded at ${time}` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">Attendance</h1><p className="text-muted-foreground">Track your work hours</p></div>
        {!clockedIn ? <Button onClick={handleClockIn}>Clock In</Button> : <Button variant="destructive" onClick={handleClockOut}>Clock Out</Button>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Hours</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalHours.toFixed(1)} hrs</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Overtime</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalOvertime.toFixed(1)} hrs</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Days Recorded</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{records.length}</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Attendance History</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow>
              <TableHead>Date</TableHead><TableHead>Clock In</TableHead><TableHead>Clock Out</TableHead><TableHead>Hours</TableHead><TableHead>Overtime</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {records.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.clockIn}</TableCell>
                  <TableCell>{r.clockOut}</TableCell>
                  <TableCell>{r.hoursWorked.toFixed(1)}</TableCell>
                  <TableCell>{r.overtime > 0 ? r.overtime.toFixed(1) : "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
