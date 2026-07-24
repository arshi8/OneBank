import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, AlertTriangle, Recycle, TrendingUp, Wrench, Leaf, ArrowRight, AppWindow, Copy, Package, IndianRupee } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/ai-insights")({
  head: () => ({
    meta: [
      { title: "AI Insights — OneBank Platform" },
      { name: "description", content: "AI-powered recommendations and intelligent insights." },
      { property: "og:title", content: "AI Insights — OneBank Platform" },
      { property: "og:description", content: "Let AI guide your modernization decisions." },
    ],
  }),
  component: AIPage,
});

const insights = [
  { icon: AlertTriangle, tone: "warning", title: "High Duplicate in Authentication", body: "28 applications have similar authentication modules. Consolidate into Enterprise Authentication Service.", tag: "High Impact" },
  { icon: Recycle, tone: "info", title: "Unused Functionality Detected", body: "Applications contain 20-30% unused code. Consider refactoring to reduce technical debt.", tag: "Medium Impact" },
  { icon: TrendingUp, tone: "success", title: "Opportunity for Service Reuse", body: "Document Management module is present in 20 more applications.", tag: "High Impact" },
  { icon: Wrench, tone: "warning", title: "Performance Bottleneck", body: "5 applications have similar performance issues in reporting module.", tag: "Medium Impact" },
  { icon: Leaf, tone: "success", title: "Cost Optimization", body: "Infrastructure can be optimized by right-sizing 35% of current resources.", tag: "High Impact" },
];

const toneClass: Record<string, string> = {
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
};
const tagClass: Record<string, string> = {
  "High Impact": "bg-destructive/15 text-destructive border-0",
  "Medium Impact": "bg-warning/15 text-warning border-0",
};

const debt = [{ name: "d", value: 36, fill: "var(--warning)" }];

function AIPage() {
  return (
    <AppShell>
      <PageHeader
        title="AI Insights"
        description="AI powered recommendations and intelligent insights."
        actions={<Button className="bg-gradient-primary shadow-glow"><Sparkles className="mr-2 h-4 w-4" /> Generate New Insights</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 text-sm font-semibold">Key Insights</div>
          <ul className="space-y-3">
            {insights.map((i) => (
              <li key={i.title} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-4">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${toneClass[i.tone]}`}>
                  <i.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">{i.title}</div>
                    <Badge className={tagClass[i.tag] ?? tagClass["High Impact"]}>{i.tag}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>
                </div>
                <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="border-border bg-card p-5 shadow-card">
            <div className="mb-3 text-sm font-semibold">AI Recommendations</div>
            <ul className="space-y-3 text-sm">
              {[
                ["Consolidate Authentication Services", "28 Apps"],
                ["Implement Centralized Workflow", "22 Apps"],
                ["Migrate to Cloud-Native Architecture", "15 Apps"],
                ["Adopt API Gateway", "18 Apps"],
                ["Implement Event-Driven Architecture", "12 Apps"],
              ].map(([n, v]) => (
                <li key={n} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                  <span>{n}</span>
                  <span className="text-xs text-muted-foreground">{v}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">View all recommendations <ArrowRight className="h-3 w-3" /></a>
          </Card>

          <Card className="border-border bg-card p-5 shadow-card">
            <div className="mb-1 text-sm font-semibold">Technical Debt Overview</div>
            <div className="relative h-48">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={debt} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background={{ fill: "var(--muted)" }} dataKey="value" cornerRadius={12} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-semibold">36%</div>
                <div className="text-xs text-muted-foreground">Technical Debt</div>
              </div>
            </div>
            <ul className="mt-2 space-y-1 text-xs">
              {[
                ["Low (0-30%)", "var(--chart-3)"],
                ["Medium (30-60%)", "var(--warning)"],
                ["High (60-100%)", "var(--destructive)"],
              ].map(([n, c]) => (
                <li key={n} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {n}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={AppWindow} label="Applications Analyzed" value="184" tone="primary" />
        <StatCard icon={Copy} label="Duplicate Modules Found" value="1,284" tone="rose" />
        <StatCard icon={Package} label="Reusable Services Identified" value="41" tone="success" />
        <StatCard icon={IndianRupee} label="Potential Annual Savings" value="₹142 Cr" tone="warning" />
      </div>
    </AppShell>
  );
}
