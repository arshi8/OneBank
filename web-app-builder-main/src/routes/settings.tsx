import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — OneBank Platform" },
      { name: "description", content: "Configure your OneBank Platform workspace." },
      { property: "og:title", content: "Settings — OneBank Platform" },
      { property: "og:description", content: "Preferences, integrations, and notifications." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell>
      <PageHeader title="Settings" description="Configure your workspace preferences." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card p-6 shadow-card">
          <div className="mb-4 text-sm font-semibold">Profile</div>
          <div className="space-y-4">
            <div className="grid gap-1.5"><Label>Full Name</Label><Input defaultValue="Rajendra Pawar" /></div>
            <div className="grid gap-1.5"><Label>Email</Label><Input defaultValue="rajendra@onebank.com" /></div>
            <div className="grid gap-1.5"><Label>Role</Label><Input defaultValue="Enterprise Architect" /></div>
            <Button className="bg-gradient-primary shadow-glow">Save changes</Button>
          </div>
        </Card>

        <Card className="border-border bg-card p-6 shadow-card">
          <div className="mb-4 text-sm font-semibold">Notifications</div>
          <ul className="space-y-4 text-sm">
            {["Weekly modernization digest", "New duplicate detections", "AI recommendations", "ROI milestone alerts"].map((n) => (
              <li key={n} className="flex items-center justify-between">
                <span>{n}</span>
                <Switch defaultChecked />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
