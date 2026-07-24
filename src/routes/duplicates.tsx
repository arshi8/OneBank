import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter, ShieldCheck, User, KeyRound, FileText, Workflow, Bell } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/duplicates")({
  head: () => ({
    meta: [
      { title: "Duplicate Analysis — OneBank Platform" },
      { name: "description", content: "AI-detected duplicate modules across applications." },
      { property: "og:title", content: "Duplicate Analysis — OneBank Platform" },
      { property: "og:description", content: "Find and eliminate redundant modules." },
    ],
  }),
  component: DuplicatesPage,
});

const rows = [
  { icon: ShieldCheck, n: "User Authentication", d: "Login, Logout, Password Reset", c: "Authentication", m: 97, a: 28, r: "Use Enterprise Authentication Service" },
  { icon: User, n: "Customer Search", d: "Customer Lookup, Search", c: "Customer", m: 95, a: 24, r: "Use Customer Profile Service" },
  { icon: KeyRound, n: "OTP Verification", d: "OTP Generation, Validation", c: "Authentication", m: 92, a: 22, r: "Use OTP Verification Service" },
  { icon: FileText, n: "Document Upload", d: "File Upload, Validation", c: "Document", m: 91, a: 20, r: "Use Document Management Service" },
  { icon: Workflow, n: "Workflow Engine", d: "Approval, Workflow Routing", c: "Workflow", m: 90, a: 18, r: "Use Centralized Workflow Service" },
  { icon: Bell, n: "Notification Service", d: "Email, SMS, Push", c: "Notification", m: 89, a: 16, r: "Use Notification Hub Service" },
];

const catStyles: Record<string, string> = {
  Authentication: "bg-primary/15 text-primary",
  Customer: "bg-info/15 text-info",
  Document: "bg-warning/15 text-warning",
  Workflow: "bg-success/15 text-success",
  Notification: "bg-chart-5/15 text-chart-5",
};

function DuplicatesPage() {
  return (
    <AppShell>
      <PageHeader
        title="Duplicate Analysis"
        description="AI-detected duplicate modules across applications."
        actions={<Button variant="outline" className="border-border bg-transparent"><Download className="mr-2 h-4 w-4" /> Export</Button>}
      />

      <Card className="border-border bg-card p-5 shadow-card">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Input placeholder="Search modules..." className="h-10 w-full max-w-xs bg-background" />
          <Select><SelectTrigger className="h-10 w-40 bg-background"><SelectValue placeholder="All Categories" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Categories</SelectItem></SelectContent>
          </Select>
          <Select><SelectTrigger className="h-10 w-44 bg-background"><SelectValue placeholder="All Match Scores" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Match Scores</SelectItem></SelectContent>
          </Select>
          <Button variant="outline" className="ml-auto h-10 border-border bg-transparent"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Module / Functionality</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.n} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-primary">
                        <r.icon className="h-4 w-4" />
                      </span>
                      <div className="leading-tight">
                        <div className="font-medium">{r.n}</div>
                        <div className="text-xs text-muted-foreground">{r.d}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${catStyles[r.c]} border-0 hover:opacity-90`}>{r.c}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={r.m} className="h-1.5 w-24" />
                      <span className="text-xs font-medium text-success">{r.m}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.a} Applications</TableCell>
                  <TableCell className="text-muted-foreground">{r.r}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="h-7 border-border bg-transparent text-xs">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </AppShell>
  );
}
