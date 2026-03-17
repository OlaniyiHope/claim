import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentStaff, leaveBalances, tasksData, scheduleData, messagesData } from "@/data/mockData";
import { User, CalendarDays, ListTodo, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function StaffDashboard() {
  const todaysTasks = tasksData.filter(t => t.status !== "Completed");
  const unreadMessages = messagesData.filter(m => m.type === "inbox" && !m.read).length;
  const todaySchedule = scheduleData[4]; // current day

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {currentStaff.fullName.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Here's your overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Profile Summary */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{currentStaff.fullName}</p>
                <p className="text-xs text-muted-foreground">{currentStaff.role} • {currentStaff.department}</p>
                <p className="text-xs text-muted-foreground">{currentStaff.id} • {currentStaff.labLocation}</p>
              </div>
            </div>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild><Link to="/staff/profile">View Profile</Link></Button>
          </CardContent>
        </Card>

        {/* Leave Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leave Balance</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-muted-foreground">Annual:</span> <strong>{leaveBalances.annual} days</strong></div>
              <div><span className="text-muted-foreground">Sick:</span> <strong>{leaveBalances.sick} days</strong></div>
              <div><span className="text-muted-foreground">Family:</span> <strong>{leaveBalances.familyResponsibility} days</strong></div>
              <div><span className="text-muted-foreground">Study:</span> <strong>{leaveBalances.study} days</strong></div>
            </div>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild><Link to="/staff/leave">Request Leave</Link></Button>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysTasks.length}</div>
            <p className="text-xs text-muted-foreground">pending tasks</p>
            <div className="mt-2 text-xs space-y-1">
              {todaysTasks.slice(0, 2).map(t => (
                <p key={t.id} className="truncate">{t.title}</p>
              ))}
            </div>
            <Button variant="link" size="sm" className="mt-1 p-0" asChild><Link to="/staff/tasks">View All</Link></Button>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Schedule</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {todaySchedule ? (
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Shift:</span> <strong>{todaySchedule.shiftType}</strong></p>
                <p><span className="text-muted-foreground">Time:</span> <strong>{todaySchedule.startTime} – {todaySchedule.endTime}</strong></p>
                <p><span className="text-muted-foreground">Location:</span> <strong>{todaySchedule.location}</strong></p>
              </div>
            ) : <p className="text-sm text-muted-foreground">No shift scheduled today</p>}
            <Button variant="link" size="sm" className="mt-2 p-0" asChild><Link to="/staff/schedule">Full Schedule</Link></Button>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">unread messages</p>
            <Button variant="link" size="sm" className="mt-2 p-0" asChild><Link to="/staff/messages">Open Inbox</Link></Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
