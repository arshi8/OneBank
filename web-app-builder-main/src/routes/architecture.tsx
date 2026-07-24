import { createFileRoute } from "@tanstack/react-router";
import { Download, Search, ZoomIn, ZoomOut, AppWindow, Share2, Database, Globe2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture Map — OneBank Platform" },
      { name: "description", content: "Application landscape and dependency visualization." },
      { property: "og:title", content: "Architecture Map — OneBank Platform" },
      { property: "og:description", content: "See how every application connects." },
    ],
  }),
  component: ArchitecturePage,
});

const left = ["Mobile Banking", "Internet Banking", "Corporate Portal", "Loan Origination", "Card Management", "Trade Finance", "Treasury System"];
const right = ["Customer Profile Service", "Authentication Service", "Notification Service", "Payment Service", "Document Service", "Workflow Engine", "Reporting Service", "Audit Service"];
const legend = [
  { icon: AppWindow, label: "Applications", color: "text-primary" },
  { icon: Share2, label: "Shared Services", color: "text-info" },
  { icon: Database, label: "Databases", color: "text-success" },
  { icon: Globe2, label: "External Systems", color: "text-warning" },
];

function ArchitecturePage() {
  return (
    <AppShell>
      <PageHeader
        title="Architecture Map"
        description="Application landscape and dependency visualization."
        actions={
          <div className="flex items-center gap-2">
            <Select><SelectTrigger className="h-10 w-44 border-border bg-transparent"><SelectValue placeholder="View: Application" /></SelectTrigger>
              <SelectContent><SelectItem value="app">Application View</SelectItem></SelectContent>
            </Select>
            <Button variant="outline" className="border-border bg-transparent"><Download className="mr-2 h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <Card className="border-border bg-card p-5 shadow-card">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          {legend.map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1">
              <l.icon className={`h-3.5 w-3.5 ${l.color}`} />
              <span className="text-muted-foreground">{l.label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-transparent"><Search className="h-3.5 w-3.5" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-transparent"><ZoomIn className="h-3.5 w-3.5" /></Button>
            <span className="px-1 text-muted-foreground">100%</span>
            <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-transparent"><ZoomOut className="h-3.5 w-3.5" /></Button>
          </div>
        </div>

        <div className="relative min-h-[520px] rounded-xl border border-border bg-gradient-to-br from-primary/5 to-background p-6">
          <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            {/* Left column */}
            <div className="flex flex-col gap-2.5">
              {left.map((n) => (
                <NodeChip key={n} label={n} tone="primary" />
              ))}
            </div>

            {/* Center hub */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-6 rounded-full bg-primary/20 blur-2xl" />
                <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-primary text-center text-primary-foreground shadow-glow"
                  style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}>
                  <div>
                    <div className="text-sm font-medium opacity-90">Core Banking</div>
                    <div className="text-lg font-semibold">System</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-2.5">
              {right.map((n) => (
                <NodeChip key={n} label={n} tone="info" />
              ))}
            </div>
          </div>

          {/* Databases row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {["Core Banking DB", "Data Warehouse", "Analytics DB", "External Systems"].map((n, i) => (
              <div key={n} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                <span className={`flex h-8 w-8 items-center justify-center rounded-md ${i === 3 ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
                  {i === 3 ? <Globe2 className="h-4 w-4" /> : <Database className="h-4 w-4" />}
                </span>
                <span className="text-sm">{n}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </AppShell>
  );
}

function NodeChip({ label, tone }: { label: string; tone: "primary" | "info" }) {
  const styles = tone === "primary" ? "border-primary/40 bg-primary/10" : "border-info/40 bg-info/10";
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border ${styles} px-3 py-2.5 backdrop-blur-sm`}>
      <span className={`h-2 w-2 rounded-full ${tone === "primary" ? "bg-primary" : "bg-info"}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
