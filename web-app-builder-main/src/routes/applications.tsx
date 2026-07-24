import { createFileRoute, redirect } from "@tanstack/react-router";
import { Plus, Filter, MoreHorizontal, Smartphone, Globe, Building2, Coins, CreditCard, Ship, Vault, Layers } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/applications")({
  beforeLoad: () => {
    const role = getStoredUserRole();

    if (role !== "admin") {
      throw redirect({ to: role === "user" ? "/my-projects" : "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Applications — OneBank Platform" },
      { name: "description", content: "Manage and explore all onboarded banking applications." },
      { property: "og:title", content: "Applications — OneBank Platform" },
      { property: "og:description", content: "Application inventory across the enterprise." },
    ],
  }),
  component: ApplicationsPage,
});

const apps = [
  { n: "Mobile Banking", d: "Retail Banking", t: "Android, Kotlin", o: "21 May 2024", s: "Onboarded", icon: Smartphone },
  { n: "Internet Banking", d: "Retail Banking", t: "React, Node.js", o: "18 May 2024", s: "Onboarded", icon: Globe },
  { n: "Corporate Portal", d: "Corporate Banking", t: "Angular, .NET", o: "15 May 2024", s: "Onboarded", icon: Building2 },
  { n: "Loan Origination", d: "Loans", t: "Java, Spring Boot", o: "12 May 2024", s: "Onboarded", icon: Coins },
  { n: "Card Management", d: "Cards", t: "Java, Oracle", o: "10 May 2024", s: "Onboarded", icon: CreditCard },
  { n: "Trade Finance", d: "Trade Banking", t: "Java, Struts", o: "08 May 2024", s: "Onboarded", icon: Ship },
  { n: "Treasury System", d: "Treasury", t: ".NET, SQL Server", o: "05 May 2024", s: "Onboarded", icon: Vault },
  { n: "Collections System", d: "Collections", t: "Java, MySQL", o: "02 May 2024", s: "Onboarded", icon: Layers },
];

function ApplicationsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Applications"
        description="Manage and explore all onboarded banking applications."
        actions={
          <Button className="bg-gradient-primary shadow-glow">
            <Plus className="mr-2 h-4 w-4" /> Add Application
          </Button>
        }
      />

      <Card className="border-border bg-card p-5 shadow-card">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Input placeholder="Search applications..." className="h-10 w-full max-w-xs bg-background" />
          <Select><SelectTrigger className="h-10 w-40 bg-background"><SelectValue placeholder="All Domains" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Domains</SelectItem><SelectItem value="retail">Retail</SelectItem><SelectItem value="corp">Corporate</SelectItem></SelectContent>
          </Select>
          <Select><SelectTrigger className="h-10 w-44 bg-background"><SelectValue placeholder="All Technologies" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Technologies</SelectItem><SelectItem value="java">Java</SelectItem><SelectItem value="node">Node.js</SelectItem></SelectContent>
          </Select>
          <Select><SelectTrigger className="h-10 w-36 bg-background"><SelectValue placeholder="All Status" /></SelectTrigger>
            <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="on">Onboarded</SelectItem></SelectContent>
          </Select>
          <Button variant="outline" className="ml-auto h-10 border-border bg-transparent"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Application Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Technology</TableHead>
                <TableHead>Onboarded On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map((a) => (
                <TableRow key={a.n} className="border-border">
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
                        <a.icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{a.n}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.d}</TableCell>
                  <TableCell className="text-muted-foreground">{a.t}</TableCell>
                  <TableCell className="text-muted-foreground">{a.o}</TableCell>
                  <TableCell>
                    <Badge className="border-success/30 bg-success/15 text-success hover:bg-success/15">● {a.s}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 1 to 8 of 184 applications</span>
          <div className="flex gap-1">
            {["<", "1", "2", "3", "…", "23", ">"].map((p, i) => (
              <button
                key={i}
                className={`flex h-8 min-w-8 items-center justify-center rounded-md border border-border px-2 text-xs ${p === "1" ? "bg-gradient-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
