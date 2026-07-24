import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  AppWindow,
  Copy,
  Package,
  IndianRupee,
  Target,
  Download,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/user-dashboard")({
  beforeLoad: () => {
    const role = getStoredUserRole();

    if (role !== "user") {
      throw redirect({ to: role === "admin" ? "/dashboard" : "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "My Dashboard — OneBank Platform" },
      { name: "description", content: "Overview of your projects, reusable opportunities, and modernization progress." },
      { property: "og:title", content: "My Dashboard — OneBank Platform" },
      { property: "og:description", content: "Track your application modernization progress." },
    ],
  }),
  component: UserDashboardPage,
});

const moduleByCategory = [
  { name: "Authentication", value: 148, color: "var(--chart-1)" },
  { name: "Customer", value: 121, color: "var(--chart-2)" },
  { name: "Reporting", value: 96, color: "var(--chart-3)" },
  { name: "Workflow", value: 84, color: "var(--chart-4)" },
  { name: "Notification", value: 63, color: "var(--chart-5)" },
  { name: "Others", value: 72, color: "oklch(0.5 0.08 275)" },
];

const personalProgress = [
  { m: "Jan", v: 10 },
  { m: "Feb", v: 18 },
  { m: "Mar", v: 27 },
  { m: "Apr", v: 36 },
  { m: "May", v: 46 },
  { m: "Jun", v: 57 },
  { m: "Jul", v: 66 },
];

const personalSavings = [
  { y: "Year 1", v: 7 },
  { y: "Year 2", v: 14 },
  { y: "Year 3", v: 25 },
  { y: "Year 4", v: 33 },
  { y: "Year 5", v: 42 },
];

const topReusableCandidates = [
  { n: "Enterprise Authentication", m: 96, apps: 28 },
  { n: "Customer Profile Service", m: 93, apps: 24 },
  { n: "Notification Hub", m: 89, apps: 26 },
  { n: "Workflow Engine", m: 86, apps: 22 },
  { n: "Document Management", m: 82, apps: 20 },
];

function UserDashboardPage() {
  const displayName = localStorage.getItem("userName")?.trim() || "User";

  return (
    <AppShell>
      <PageHeader
        title="My Dashboard"
        description={`Welcome back, ${displayName}. Here's a snapshot of your modernization opportunities.`}
        actions={
          <Button className="bg-gradient-primary shadow-glow">
            <Download className="mr-2 h-4 w-4" /> Download My Report
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={AppWindow} label="Projects Analyzed" value="3" delta="+2 this month" tone="primary" />
        <StatCard icon={Copy} label="Modules Identified" value="584" delta="+74 this month" tone="rose" />
        <StatCard icon={Package} label="Reusable Components" value="19" delta="+3 this month" tone="success" />
        <StatCard icon={IndianRupee} label="Potential Annual Savings" value="24.8 Cr" delta="+3.2 Cr this month" tone="warning" />
        <StatCard icon={Target} label="Modernization Progress" value="66%" delta="+5% this month" tone="info" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Module Distribution by Category</div>
              <div className="text-xs text-muted-foreground">584 total modules</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={moduleByCategory}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {moduleByCategory.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 text-sm">
              {moduleByCategory.map((d) => (
                <li key={d.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-foreground/90">{d.name}</span>
                  </span>
                  <span className="text-muted-foreground">{d.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <a href="/ai-insights" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View all Insights <ArrowRight className="h-3 w-3" />
          </a>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">My Modernization Progress</div>
            <div className="text-lg font-semibold text-primary">66%</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={personalProgress}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  dot={{ fill: "var(--primary)", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <a href="/roadmap" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View Roadmap <ArrowRight className="h-3 w-3" />
          </a>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 text-sm font-semibold">Top Reusable Components for You</div>
          <ul className="space-y-3">
            {topReusableCandidates.map((d, i) => (
              <li key={d.n} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{d.n}</span>
                    <span className="text-xs text-muted-foreground">{d.apps} apps</span>
                  </div>
                  <Progress value={d.m} className="mt-1.5 h-1.5" />
                </div>
                <span className="w-10 text-right text-xs font-medium text-success">{d.m}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Estimated Savings Over 5 Years</div>
            <div className="rounded-md bg-primary/15 px-2 py-0.5 text-xs text-primary">Year 3 · ₹25 Cr</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={personalSavings}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="y" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="v" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <a href="/roi" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View ROI Details <ArrowRight className="h-3 w-3" />
          </a>
        </Card>
      </div>
    </AppShell>
  );
}

const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--foreground)",
};
