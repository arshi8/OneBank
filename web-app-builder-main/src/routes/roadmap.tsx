import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2, Clock } from "lucide-react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — OneBank Platform" },
      { name: "description", content: "Modernization roadmap and milestones." },
      { property: "og:title", content: "Roadmap — OneBank Platform" },
      { property: "og:description", content: "Plan and track modernization milestones." },
    ],
  }),
  component: RoadmapPage,
});

const phases = [
  { q: "Q1 2026", t: "Discovery & Assessment", s: "done", items: ["Application inventory", "Dependency mapping", "Duplicate analysis"] },
  { q: "Q2 2026", t: "Foundation Services", s: "done", items: ["Authentication service", "Notification hub", "API gateway"] },
  { q: "Q3 2026", t: "Consolidation Wave 1", s: "in", items: ["Customer profile service", "Document management", "Workflow engine"] },
  { q: "Q4 2026", t: "Consolidation Wave 2", s: "planned", items: ["Payment processing", "Reporting & analytics", "Audit & logging"] },
  { q: "Q1 2027", t: "Cloud Migration", s: "planned", items: ["Retail apps to cloud", "Corporate portal", "Data warehouse"] },
];

const meta = {
  done: { icon: CheckCircle2, tone: "bg-success/15 text-success", label: "Completed" },
  in: { icon: Loader2, tone: "bg-warning/15 text-warning", label: "In Progress" },
  planned: { icon: Clock, tone: "bg-info/15 text-info", label: "Planned" },
} as const;

function RoadmapPage() {
  return (
    <AppShell>
      <PageHeader title="Roadmap" description="Modernization roadmap and delivery milestones." />
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
        <ul className="space-y-6">
          {phases.map((p, i) => {
            const m = meta[p.s as keyof typeof meta];
            const left = i % 2 === 0;
            return (
              <li key={p.q} className={`relative md:grid md:grid-cols-2 md:gap-8 ${left ? "" : "md:[&>*:first-child]:col-start-2"}`}>
                <div className="pl-10 md:pl-0 md:pr-8">
                  <Card className="border-border bg-card p-5 shadow-card">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.q}</div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${m.tone}`}>
                        <m.icon className="h-3 w-3" /> {m.label}
                      </span>
                    </div>
                    <div className="text-lg font-semibold">{p.t}</div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {p.items.map((it) => <li key={it}>• {it}</li>)}
                    </ul>
                  </Card>
                </div>
                <span className={`absolute left-4 top-6 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background ${m.tone} md:left-1/2`}>
                  <m.icon className="h-3 w-3" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </AppShell>
  );
}
