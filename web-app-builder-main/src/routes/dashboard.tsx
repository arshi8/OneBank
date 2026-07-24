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
import { getStoredUserRole } from "@/lib/auth";
import { useApplications, useServices, useProjects } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const role = getStoredUserRole();

    if (!role) {
      throw redirect({ to: "/" });
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
  const [apps] = useApplications();
  const [services] = useServices();

  const totalApps = (176 + apps.length).toString();
  const duplicatesCount = 1284 + (apps.length * 4);
  const totalServices = services.length.toString();

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
        <StatCard icon={AppWindow} label="Applications Onboarded" value={totalApps} delta="+12 this week" tone="primary" />
        <StatCard icon={Copy} label="Duplicate Modules Detected" value={duplicatesCount.toLocaleString()} delta="+98 this week" tone="rose" />
        <StatCard icon={Package} label="Reusable Services Identified" value={totalServices} delta="+5 this week" tone="success" />
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
  const [projects] = useProjects();

  const totalApps = projects.length.toString();
  const duplicatesCount = projects.length * 4;
  const totalServices = Math.floor(projects.length * 1.5).toString();
  const userSavings = projects.length * 5;

  // Derive graph data dynamically from projects length to make it reactive
  const userDuplicateByCategory = [
    { name: "Authentication", value: projects.length * 2, color: "var(--chart-1)" },
    { name: "Customer", value: projects.length * 3, color: "var(--chart-2)" },
    { name: "Reporting", value: projects.length * 1, color: "var(--chart-3)" },
    { name: "Workflow", value: projects.length * 2, color: "var(--chart-4)" },
    { name: "Notification", value: projects.length * 1, color: "var(--chart-5)" },
  ];

  const userProgressData = [
    { m: "Jan", v: projects.length >= 1 ? 12 : 0 },
    { m: "Feb", v: projects.length >= 2 ? 22 : 0 },
    { m: "Mar", v: projects.length >= 3 ? 30 : 5 },
    { m: "Apr", v: projects.length >= 4 ? 42 : 10 },
    { m: "May", v: projects.length >= 5 ? 51 : 25 },
    { m: "Jun", v: projects.length >= 6 ? 60 : 40 },
    { m: "Jul", v: projects.length >= 7 ? 68 : Math.min(projects.length * 15, 100) },
  ];

  const userSavingsData = [
    { y: "Year 1", v: userSavings * 0.2 },
    { y: "Year 2", v: userSavings * 0.5 },
    { y: "Year 3", v: userSavings * 1.0 },
    { y: "Year 4", v: userSavings * 1.5 },
    { y: "Year 5", v: userSavings * 2.0 },
  ];

  return (
    <>
      <PageHeader
        title="Project Dashboard"
        description={`Welcome back, ${displayName}. Here's the analysis of your submitted projects.`}
        actions={
          <Button variant="outline" className="border-border">
            <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={AppWindow} label="Projects Analyzed" value={totalApps} delta={`+${projects.length} this month`} tone="primary" />
        <StatCard icon={Copy} label="Duplicate Modules Detected" value={duplicatesCount.toLocaleString()} delta={`+${projects.length * 2} this month`} tone="rose" />
        <StatCard icon={Package} label="Reusable Services Identified" value={totalServices} delta={`+${projects.length} this month`} tone="success" />
        <StatCard icon={IndianRupee} label="Estimated Annual Savings" value={`₹${userSavings * 0.1} Cr`} delta={`+₹${Math.floor(userSavings * 0.1)} Cr`} tone="warning" />
        <StatCard icon={Target} label="Modernization Progress" value={`${Math.min(projects.length * 15, 100)}%`} delta="+8% this month" tone="info" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* User Duplicates Pie Chart */}
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Duplicate Modules by Category</div>
              <div className="text-xs text-muted-foreground">{duplicatesCount} total</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={userDuplicateByCategory}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {userDuplicateByCategory.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 text-sm">
              {userDuplicateByCategory.map((d) => (
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

        {/* User Progress Line Chart */}
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Modernization Progress</div>
            <div className="text-lg font-semibold text-primary">{Math.min(projects.length * 15, 100)}%</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={userProgressData}>
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

        {/* User Submitted Projects List */}
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 text-sm font-semibold">Recently Submitted Projects</div>
          <ul className="space-y-3">
            {projects.slice(0, 5).map((p, i) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.status}</span>
                  </div>
                  <Progress value={p.score === "Pending" ? 30 : parseInt(p.score) || 100} className="mt-1.5 h-1.5" />
                </div>
                <span className="w-10 text-right text-xs font-medium text-success">{p.score === "Pending" ? "30%" : p.score}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* User Savings Bar Chart */}
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-semibold">Estimated Savings Over 5 Years</div>
            <div className="rounded-md bg-primary/15 px-2 py-0.5 text-xs text-primary">Year 3 · ₹{userSavings} Cr</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={userSavingsData}>
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

    if (!userRole) {
      navigate({ to: "/", replace: true });
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
