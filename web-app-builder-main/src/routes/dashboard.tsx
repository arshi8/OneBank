import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AppWindow,
  Copy,
  Package,
  IndianRupee,
  Target,
  Download,
  ArrowRight,
  Calendar,
  Check,
  AlertCircle,
  Lightbulb,
  TrendingUp,
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
import { getDefaultRouteForRole, getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const role = getStoredUserRole();

    if (role !== "admin") {
      throw redirect({ to: getDefaultRouteForRole(role) });
    }
  },
  head: () => ({
    meta: [
      { title: "Dashboard — OneBank Platform" },
      { name: "description", content: "Enterprise modernization overview: applications, duplicates, reusable services, savings, and progress." },
      { property: "og:title", content: "Dashboard — OneBank Platform" },
      { property: "og:description", content: "Track your modernization journey in one place." },
    ],
  }),
  component: DashboardPage,
});

// Admin dashboard data
const duplicateByCategory = [
  { name: "Authentication", value: 232, color: "var(--chart-1)" },
  { name: "Customer", value: 282, color: "var(--chart-2)" },
  { name: "Reporting", value: 205, color: "var(--chart-3)" },
  { name: "Workflow", value: 179, color: "var(--chart-4)" },
  { name: "Notification", value: 154, color: "var(--chart-5)" },
  { name: "Others", value: 232, color: "oklch(0.5 0.08 275)" },
];

const progressData = [
  { m: "Jan", v: 12 },
  { m: "Feb", v: 22 },
  { m: "Mar", v: 30 },
  { m: "Apr", v: 42 },
  { m: "May", v: 51 },
  { m: "Jun", v: 60 },
  { m: "Jul", v: 68 },
];

const savings = [
  { y: "Year 1", v: 42 },
  { y: "Year 2", v: 88 },
  { y: "Year 3", v: 142 },
  { y: "Year 4", v: 178 },
  { y: "Year 5", v: 210 },
];

const topDuplicates = [
  { n: "User Authentication", m: 97, apps: 28 },
  { n: "Customer Search", m: 95, apps: 24 },
  { n: "OTP Verification", m: 92, apps: 22 },
  { n: "Document Upload", m: 91, apps: 20 },
  { n: "Workflow Engine", m: 90, apps: 18 },
];

// User dashboard data
const recentProjects = [
  { name: "Retail Banking System", version: "v1.0", date: "22 May 2026", status: "Completed", score: "72%" },
  { name: "Loan Management System", version: "v2.1", date: "20 May 2026", status: "Completed", score: "65%" },
  { name: "Payment Gateway", version: "v1.3", date: "18 May 2026", status: "Completed", score: "60%" },
];

const insightsSummary = [
  { name: "Duplicate Modules", value: 412, percentage: 33, color: "var(--chart-1)" },
  { name: "Reusable Services", value: 334, percentage: 26, color: "var(--chart-2)" },
  { name: "Unique Modules", value: 512, percentage: 41, color: "var(--chart-3)" },
];

const topRecommendations = [
  { title: "Consolidate Authentication Services", impact: "High Impact", number: 1 },
  { title: "Migrate to Cloud-Native Architecture", impact: "High Impact", number: 2 },
];

const savingsData = [
  { month: "Jan", amount: 2 },
  { month: "Feb", amount: 4 },
  { month: "Mar", amount: 5 },
  { month: "Apr", amount: 6 },
  { month: "May", amount: 7 },
  { month: "Jun", amount: 7 },
];

function AdminDashboard({ displayName }: { displayName: string }) {
  return (
    <>
      <PageHeader
        title="Overview Dashboard"
        description={`Welcome back, ${displayName}. Here's what's happening with your modernization journey.`}
        actions={
          <Button className="bg-gradient-primary shadow-glow">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={AppWindow} label="Applications Onboarded" value="184" delta="+12 this week" tone="primary" />
        <StatCard icon={Copy} label="Duplicate Modules Detected" value="1,284" delta="+98 this week" tone="rose" />
        <StatCard icon={Package} label="Reusable Services Identified" value="41" delta="+5 this week" tone="success" />
        <StatCard icon={IndianRupee} label="Estimated Annual Savings" value="₹142 Cr" delta="+18 Cr this week" tone="warning" />
        <StatCard icon={Target} label="Modernization Progress" value="68%" delta="+6% this week" tone="info" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Duplicate Modules by Category</div>
              <div className="text-xs text-muted-foreground">1,284 total</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={duplicateByCategory}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {duplicateByCategory.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 text-sm">
              {duplicateByCategory.map((d) => (
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
          <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View all Duplicates <ArrowRight className="h-3 w-3" />
          </a>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Modernization Progress</div>
            <div className="text-lg font-semibold text-primary">68%</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={progressData}>
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
          <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View Roadmap <ArrowRight className="h-3 w-3" />
          </a>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 text-sm font-semibold">Top Duplicate Modules</div>
          <ul className="space-y-3">
            {topDuplicates.map((d, i) => (
              <li key={d.n} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{d.n}</span>
                    <span className="text-xs text-muted-foreground">{d.apps} occurrences</span>
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
            <div className="rounded-md bg-primary/15 px-2 py-0.5 text-xs text-primary">Year 3 · ₹142 Cr</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={savings}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="y" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="v" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View ROI Details <ArrowRight className="h-3 w-3" />
          </a>
        </Card>
      </div>
    </>
  );
}

function UserDashboard({ displayName }: { displayName: string }) {
  return (
    <>
      <PageHeader
        title="My Dashboard"
        description={`Welcome back, ${displayName}. Overview of your projects and insights.`}
        actions={
          <Button variant="outline" className="border-border">
            <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <Card className="border-border bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15">
              <AppWindow className="h-5 w-5 text-purple-500" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Projects Analyzed</p>
              <p className="text-xs text-success">↑ 2 this month</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
              <Copy className="h-5 w-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold">1,248</p>
              <p className="text-xs text-muted-foreground">Modules Identified</p>
              <p className="text-xs text-success">↑ 156 this month</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15">
              <Package className="h-5 w-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold">32</p>
              <p className="text-xs text-muted-foreground">Services Detected</p>
              <p className="text-xs text-success">↑ 6 this month</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15">
              <IndianRupee className="h-5 w-5 text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold">₹24.8</p>
              <p className="text-xs text-muted-foreground">Potential Savings</p>
              <p className="text-xs text-success">↑ 11% last month</p>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card/50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15">
              <Target className="h-5 w-5 text-cyan-500" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-bold">68%</p>
              <p className="text-xs text-muted-foreground">Modernization Score</p>
              <p className="text-xs text-success">↑ 8% last month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Projects and Insights Summary */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 text-sm font-semibold">Recent Projects</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-medium text-muted-foreground">Project Name</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Upload Date</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project.name} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="py-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                          <AppWindow className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.version}</p>
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">{project.date}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs text-green-600">
                          <Check className="h-3 w-3" /> {project.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-medium">{project.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="/my-projects" className="mt-4 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              View all projects <ArrowRight className="h-3 w-3" />
            </a>
          </Card>
        </div>

        {/* Insights Summary */}
        <Card className="border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold">Insights Summary</h3>
          <div className="flex justify-center mb-6">
            <div className="relative h-48 w-48">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={insightsSummary}
                    cx={100}
                    cy={100}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {insightsSummary.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-lg font-bold">1,248</p>
                <p className="text-xs text-muted-foreground">Total Modules</p>
              </div>
            </div>
          </div>
          <ul className="space-y-3 text-xs">
            {insightsSummary.map((d) => (
              <li key={d.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="ml-auto font-medium">{d.value} ({d.percentage}%)</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Recommendations */}
        <Card className="border-border bg-card p-6 shadow-card">
          <h3 className="mb-4 text-sm font-semibold">Top Recommendations</h3>
          <div className="space-y-3">
            {topRecommendations.map((rec) => (
              <div key={rec.number} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {rec.number}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{rec.title}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 mt-1 text-xs text-amber-600">
                    <AlertCircle className="h-3 w-3" /> {rec.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Estimated Savings */}
        <Card className="border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Estimated Savings</h3>
            <div className="text-2xl font-bold text-primary">₹24.8 Cr</div>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">Potential Annual Savings</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height={128}>
              <BarChart data={savingsData}>
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  );
}

function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName")?.trim();

    if (userRole !== "admin") {
      navigate({ to: getDefaultRouteForRole(getStoredUserRole()), replace: true });
      return;
    }

    setIsAdmin(userRole === "admin");
    if (userName) {
      setDisplayName(userName);
    }
  }, [navigate]);

  return <AppShell>{isAdmin ? <AdminDashboard displayName={displayName} /> : <UserDashboard displayName={displayName} />}</AppShell>;
}

export const tooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--foreground)",
};
