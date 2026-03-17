import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, FileText, CreditCard, AlertCircle } from "lucide-react";
import { dashboardCards, revenueChartData, claimsProcessingData, outstandingPieData, recentActivities } from "@/data/mockData";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const cardIcons = [FileText, FileText, AlertCircle, CreditCard, TrendingUp, Activity];
const pieColors = ["hsl(358, 76%, 44%)", "hsl(38, 92%, 50%)", "hsl(142, 71%, 45%)"];

const chartConfig = {
  medicalAid: { label: "Medical Aid", color: "hsl(358, 76%, 44%)" },
  cash: { label: "Cash", color: "hsl(142, 71%, 45%)" },
  debtRecovery: { label: "Debt Recovery", color: "hsl(38, 92%, 50%)" },
};

const barConfig = {
  value: { label: "Count", color: "hsl(358, 76%, 44%)" },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Accounting Dashboard</h1>
        <p className="text-muted-foreground">Financial overview and key metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardCards.map((card, i) => {
          const Icon = cardIcons[i];
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{card.count} records</span>
                  <span className={`text-xs flex items-center gap-0.5 ${card.trendUp ? "text-success" : "text-destructive"}`}>
                    {card.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {card.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="medicalAid" stroke="var(--color-medicalAid)" strokeWidth={2} />
                <Line type="monotone" dataKey="cash" stroke="var(--color-cash)" strokeWidth={2} />
                <Line type="monotone" dataKey="debtRecovery" stroke="var(--color-debtRecovery)" strokeWidth={2} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Outstanding Balances Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Outstanding Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ value: { label: "Amount" } }} className="h-[300px] w-full">
              <PieChart>
                <Pie data={outstandingPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name" label>
                  {outstandingPieData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Claims Processing + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Claims Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={barConfig} className="h-[250px] w-full">
              <BarChart data={claimsProcessingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="hsl(358, 76%, 44%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex flex-col gap-1 border-b pb-2 last:border-0">
                  <span className="text-sm text-foreground">{activity.text}</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
