import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — OneBank Platform" },
      { name: "description", content: "Generate and download modernization reports." },
      { property: "og:title", content: "Reports — OneBank Platform" },
      { property: "og:description", content: "Executive-ready reports for your program." },
    ],
  }),
  component: ReportsPage,
});

const reports = [
  { t: "Executive Summary", d: "Program health, savings, and progress in one page." },
  { t: "Duplicate Modules Report", d: "Full listing of AI-detected duplicates and match scores." },
  { t: "Reusable Services Catalog", d: "Enterprise services with adoption and savings." },
  { t: "Architecture Blueprint", d: "Application landscape and dependency map." },
  { t: "ROI & Savings Report", d: "Financial impact analysis across 5 years." },
  { t: "AI Recommendations", d: "Prioritized actions from the AI engine." },
];

function ReportsPage() {
  return (
    <AppShell>
      <PageHeader title="Reports" description="Generate and download modernization reports." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.t} className="border-border bg-card p-5 shadow-card">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <FileBarChart className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">{r.t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
              </div>
            </div>
            <Button className="mt-4 w-full bg-gradient-primary shadow-glow">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
