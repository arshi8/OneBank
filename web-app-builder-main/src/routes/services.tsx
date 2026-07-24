import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServices } from "@/lib/store";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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

function ServicesPage() {
  const [services, setServices] = useServices();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({ name: "", category: "", usedIn: "", savings: "" });

  const handleApprove = (serviceName: string) => {
    setServices(services.map(s => s.n === serviceName ? { ...s, s: "Implemented" } : s));
    
    // Dispatch a mock dynamic notification for the user
    import("@/lib/store").then(({ addNotificationSync }) => {
      addNotificationSync({
        id: `notif-${Date.now()}`,
        title: "New Reusable Service Available",
        message: `Reusable service '${serviceName}' has been approved. You can now remove duplicate components and use this reusable service in your applications.`,
        date: new Date().toISOString(),
        read: false
      });
    });
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name || !newService.category) return;
    
    setServices([
      {
        n: newService.name,
        c: newService.category,
        u: newService.usedIn || "1 Application",
        s: "Planned",
        sv: newService.savings || "₹0 Cr"
      },
      ...services
    ]);
    
    setNewService({ name: "", category: "", usedIn: "", savings: "" });
    setIsDialogOpen(false);
  };

  const totalServices = services.length;
  const implementedCount = services.filter(s => s.s === "Implemented").length;
  const inProgressCount = services.filter(s => s.s === "In Progress").length;
  const plannedCount = services.filter(s => s.s === "Planned").length;

  const getPercentage = (count: number) => totalServices > 0 ? Math.round((count / totalServices) * 100) : 0;

  return (
    <AppShell>
      <PageHeader
        title="Reusable Services"
        description="Enterprise-ready reusable components identified across applications."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary shadow-glow"><Plus className="mr-2 h-4 w-4" /> New Service</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Reusable Service</DialogTitle>
                <DialogDescription>
                  Propose a new enterprise service for the application catalog.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateService}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Service Name</Label>
                    <Input id="name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="e.g. KYC Service" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })} placeholder="e.g. Compliance" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usedIn">Expected Usage</Label>
                    <Input id="usedIn" value={newService.usedIn} onChange={(e) => setNewService({ ...newService, usedIn: e.target.value })} placeholder="e.g. 5 Applications" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="savings">Est. Annual Savings</Label>
                    <Input id="savings" value={newService.savings} onChange={(e) => setNewService({ ...newService, savings: e.target.value })} placeholder="e.g. ₹5.0 Cr" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-gradient-primary shadow-glow text-primary-foreground">Save Service</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={Package} label="Total Services" value={totalServices.toString()} delta="+5 this week" tone="primary" />
        <StatCard icon={CheckCircle2} label={`Implemented (${getPercentage(implementedCount)}%)`} value={implementedCount.toString()} tone="success" />
        <StatCard icon={Loader2} label={`In Progress (${getPercentage(inProgressCount)}%)`} value={inProgressCount.toString()} tone="warning" />
        <StatCard icon={Clock} label={`Planned (${getPercentage(plannedCount)}%)`} value={plannedCount.toString()} tone="info" />
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
              {services.map((s) => (
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
                  <TableCell className="text-right">
                    {s.s === "Implemented" ? (
                      <span className="text-xs font-medium text-muted-foreground">In Repo</span>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs bg-gradient-primary text-primary-foreground border-0 shadow-glow hover:text-primary-foreground cursor-pointer"
                        onClick={() => handleApprove(s.n)}
                      >
                        Approve
                      </Button>
                    )}
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
