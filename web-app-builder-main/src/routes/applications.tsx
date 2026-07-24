import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Plus, Filter, MoreHorizontal, Smartphone, Globe, Building2, Coins, CreditCard, Ship, Vault, Layers, Trash2, AppWindow } from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Smartphone,
  Globe,
  Building2,
  Coins,
  CreditCard,
  Ship,
  Vault,
  Layers,
  AppWindow
};
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getStoredUserRole } from "@/lib/auth";
import { useApplications, AppEntry } from "@/lib/store";

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

function ApplicationsPage() {
  const [apps, setApps] = useApplications();

  const [open, setOpen] = useState(false);
  const [newApp, setNewApp] = useState({ name: "", domain: "", technology: "" });

  const handleAddApp = () => {
    if (!newApp.name) return;
    const formattedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setApps([{
      n: newApp.name,
      d: newApp.domain || "Unknown Domain",
      t: newApp.technology || "Unknown Technology",
      o: formattedDate,
      s: "In Progress",
      icon: "AppWindow"
    }, ...apps]);
    setNewApp({ name: "", domain: "", technology: "" });
    setOpen(false);
  };

  const handleRemoveApp = (appName: string) => {
    setApps(apps.filter(app => app.n !== appName));
  };

  return (
    <AppShell>
      <PageHeader
        title="Applications"
        description="Manage and explore all onboarded banking applications."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary shadow-glow">
                <Plus className="mr-2 h-4 w-4" /> Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Onboard New Application</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4 mt-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Application Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Risk Management System" 
                    value={newApp.name} 
                    onChange={e => setNewApp({...newApp, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input 
                    id="domain" 
                    placeholder="e.g. Risk & Compliance" 
                    value={newApp.domain} 
                    onChange={e => setNewApp({...newApp, domain: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="technology">Technology Stack</Label>
                  <Input 
                    id="technology" 
                    placeholder="e.g. Java, Spring Boot" 
                    value={newApp.technology} 
                    onChange={e => setNewApp({...newApp, technology: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleAddApp} className="bg-gradient-primary shadow-glow">Onboard Application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                        {(() => {
                          const IconComp = ICON_MAP[a.icon] || AppWindow;
                          return <IconComp className="h-4 w-4" />;
                        })()}
                      </span>
                      <span className="font-medium">{a.n}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{a.d}</TableCell>
                  <TableCell className="text-muted-foreground">{a.t}</TableCell>
                  <TableCell className="text-muted-foreground">{a.o}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        a.s === "Onboarded" 
                          ? "border-success/30 bg-success/15 text-success hover:bg-success/15"
                          : "border-warning/30 bg-warning/15 text-warning hover:bg-warning/15"
                      }
                    >
                      ● {a.s}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                          onClick={() => handleRemoveApp(a.n)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Application
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 1 to {apps.length} of {176 + apps.length} applications</span>
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
