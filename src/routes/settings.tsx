import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import authUsers from "../../auth-users.json";

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

type AuthUsers = {
  admin: {
    emailId: string;
    password: string;
    userName: string;
  };
  users: Array<{
    emailId: string;
    password: string;
    userName: string;
  }>;
};

const credentials = authUsers as AuthUsers;

function SettingsPage() {
  const [fullName, setFullName] = useState("User");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId")?.toLowerCase() ?? "";
    const userName = localStorage.getItem("userName") ?? "";

    if (userRole === "admin") {
      setFullName(userName || credentials.admin.userName);
      setEmail(credentials.admin.emailId);
      setRole("Admin");
      return;
    }

    const matchedUser = credentials.users.find((user) => user.emailId.toLowerCase() === userId);
    setFullName(userName || matchedUser?.userName || "User");
    setEmail(matchedUser?.emailId || userId);
    setRole("User");
  }, []);

  return (
    <AppShell>
      <PageHeader title="Settings" description="Configure your workspace preferences." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-border bg-card p-6 shadow-card">
          <div className="mb-4 text-sm font-semibold">Profile</div>
          <div className="space-y-4">
            <div className="grid gap-1.5">
              <Label>Full Name</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-1.5">
              <Label>Role</Label>
              <Input value={role} readOnly />
            </div>
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
