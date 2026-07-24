import { createFileRoute } from "@tanstack/react-router";
import { Calendar, IndianRupee } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { tooltipStyle } from "./dashboard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/roi")({
  head: () => ({
    meta: [
      { title: "ROI & Savings — OneBank Platform" },
      { name: "description", content: "Track financial impact and cost optimization." },
      { property: "og:title", content: "ROI & Savings — OneBank Platform" },
      { property: "og:description", content: "Financial impact of modernization at a glance." },
    ],
  }),
  component: ROIPage,
});

const annual = [
  { m: "Jan", v: 90 }, { m: "Feb", v: 95 }, { m: "Mar", v: 105 }, { m: "Apr", v: 108 },
  { m: "May", v: 115 }, { m: "Jun", v: 120 }, { m: "Jul", v: 124 }, { m: "Aug", v: 128 },
  { m: "Sep", v: 132 }, { m: "Oct", v: 135 }, { m: "Nov", v: 139 }, { m: "Dec", v: 142 },
];
const cats = [
  { n: "Infrastructure", v: 39.8, c: "var(--chart-1)" },
  { n: "Development", v: 35.5, c: "var(--chart-2)" },
  { n: "Maintenance", v: 31.2, c: "var(--chart-4)" },
  { n: "Licensing", v: 21.3, c: "var(--chart-3)" },
  { n: "Others", v: 14.2, c: "var(--chart-5)" },
];
const yrs = [
  { y: "Year 1", v: 42 }, { y: "Year 2", v: 88 }, { y: "Year 3", v: 142 }, { y: "Year 4", v: 178 }, { y: "Year 5", v: 210 },
];

function ROIPage() {
  return (
    <AppShell>
      <PageHeader
        title="ROI & Savings"
        description="Track financial impact and cost optimization."
        actions={
          <div className="flex items-center gap-2">
            <Select><SelectTrigger className="h-10 w-40 border-border bg-transparent"><SelectValue placeholder="All Domains" /></SelectTrigger>
              <SelectContent><SelectItem value="all">All Domains</SelectItem></SelectContent>
            </Select>
            <Button variant="outline" className="border-border bg-transparent"><Calendar className="mr-2 h-4 w-4" /> 01 Jan – 31 Dec 2026</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-1 text-sm text-muted-foreground">Total Estimated Annual Savings</div>
          <div className="text-3xl font-semibold">₹142 Cr</div>
          <div className="mt-1 text-xs text-success">▲ 18.6% vs last year</div>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <AreaChart data={annual}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-3 text-sm font-semibold">Savings by Category</div>
          <div className="grid grid-cols-[1fr_1fr] items-center gap-4">
            <div className="h-56">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={cats} dataKey="v" innerRadius={55} outerRadius={85} paddingAngle={2} stroke="none">
                    {cats.map((d) => <Cell key={d.n} fill={d.c} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 text-sm">
              {cats.map((d) => (
                <li key={d.n} className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.c }} />
                    {d.n}
                  </span>
                  <span className="text-muted-foreground">₹{d.v} Cr</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={IndianRupee} label="Total Cost Before" value="₹356 Cr" tone="rose" />
        <StatCard icon={IndianRupee} label="Total Cost After" value="₹214 Cr" tone="warning" />
        <StatCard icon={IndianRupee} label="Cost Reduction" value="40%" delta="▲ 18.6%" tone="success" />
        <StatCard icon={IndianRupee} label="Payback Period" value="8.2 mo" tone="primary" />
        <StatCard icon={IndianRupee} label="ROI (5 Years)" value="312%" tone="info" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-3 text-sm font-semibold">Savings Over 5 Years</div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={yrs}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="y" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="v" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-3 text-sm font-semibold">Top Savings Contributors</div>
          <ul className="space-y-3 text-sm">
            {[
              ["Reusing Enterprise Services", "₹48.6 Cr"],
              ["Eliminating Duplicate Modules", "₹36.4 Cr"],
              ["Infrastructure Optimization", "₹29.2 Cr"],
              ["Process Automation", "₹18.8 Cr"],
              ["License Consolidation", "₹9.0 Cr"],
            ].map(([n, v]) => (
              <li key={n} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                <span>{n}</span>
                <span className="font-medium text-success">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
