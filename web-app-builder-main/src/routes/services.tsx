import { createFileRoute } from "@tanstack/react-router";
import { Plus, Package, CheckCircle2, Loader2, Clock, IndianRupee, MoreHorizontal } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Reusable Services — OneBank Platform" },
      { name: "description", content: "Enterprise-ready reusable components identified across applications." },
      { property: "og:title", content: "Reusable Services — OneBank Platform" },
      { property: "og:description", content: "Build once, use everywhere." },
    ],
  }),
  component: ServicesPage,
});

const svc = [
  { n: "Customer Profile Service", c: "Customer", u: "24 Applications", s: "Implemented", sv: "₹18.4 Cr" },
  { n: "Enterprise Authentication", c: "Security", u: "28 Applications", s: "Implemented", sv: "₹22.7 Cr" },
  { n: "Notification Hub", c: "Communication", u: "26 Applications", s: "Implemented", sv: "₹12.6 Cr" },
  { n: "Document Management", c: "Document", u: "20 Applications", s: "In Progress", sv: "₹15.3 Cr" },
  { n: "Workflow Engine", c: "Workflow", u: "22 Applications", s: "Implemented", sv: "₹17.9 Cr" },
  { n: "Payment Processing", c: "Payments", u: "18 Applications", s: "In Progress", sv: "₹20.1 Cr" },
  { n: "Reporting & Analytics", c: "Analytics", u: "30 Applications", s: "Implemented", sv: "₹15.0 Cr" },
  { n: "Audit & Logging", c: "Compliance", u: "25 Applications", s: "Implemented", sv: "₹10.0 Cr" },
];

function ServicesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Reusable Services"
        description="Enterprise-ready reusable components identified across applications."
        actions={<Button className="bg-gradient-primary shadow-glow"><Plus className="mr-2 h-4 w-4" /> New Service</Button>}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={Package} label="Total Services" value="41" delta="+5 this week" tone="primary" />
        <StatCard icon={CheckCircle2} label="Implemented (68%)" value="28" tone="success" />
        <StatCard icon={Loader2} label="In Progress (22%)" value="9" tone="warning" />
        <StatCard icon={Clock} label="Planned (10%)" value="4" tone="info" />
        <StatCard icon={IndianRupee} label="Est. Annual Savings" value="₹142 Cr" tone="rose" />
      </div>

      <Card className="mt-6 border-border bg-card p-5 shadow-card">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Input placeholder="Search services..." className="h-10 w-full max-w-xs bg-background" />
          <Select><SelectTrigger className="h-10 w-40 bg-background"><SelectValue placeholder="All Domains" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Domains</SelectItem></SelectContent>
          </Select>
          <Select><SelectTrigger className="h-10 w-36 bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Status</SelectItem></SelectContent>
          </Select>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Used In</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Savings (Annual)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {svc.map((s) => (
                <TableRow key={s.n} className="border-border">
                  <TableCell className="font-medium">{s.n}</TableCell>
                  <TableCell className="text-muted-foreground">{s.c}</TableCell>
                  <TableCell className="text-muted-foreground">{s.u}</TableCell>
                  <TableCell>
                    <Badge className={s.s === "Implemented" ? "border-0 bg-success/15 text-success hover:bg-success/15" : "border-0 bg-warning/15 text-warning hover:bg-warning/15"}>
                      {s.s}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-success">{s.sv}</TableCell>
                  <TableCell className="text-right"><MoreHorizontal className="ml-auto h-4 w-4 text-muted-foreground" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AppShell>
  );
}
