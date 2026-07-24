import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Package, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/reusable-components")({
  beforeLoad: () => {
    const role = getStoredUserRole();

    if (role === "admin") {
      throw redirect({ to: "/applications" });
    }

    if (!role) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Reusable Component Finder — OneBank Platform" },
      {
        name: "description",
        content: "Enter your app requirements and discover readily available reusable components.",
      },
    ],
  }),
  component: ReusableComponentsPage,
});

type ReusableComponent = {
  name: string;
  category: string;
  summary: string;
  tags: string[];
  readiness: "Production Ready" | "Pilot Ready";
  usedIn: number;
};

const reusableCatalog: ReusableComponent[] = [
  {
    name: "Enterprise Authentication",
    category: "Security",
    summary: "SSO, MFA, OTP verification, token lifecycle, and session control.",
    tags: ["auth", "authentication", "login", "otp", "mfa", "security", "token", "sso"],
    readiness: "Production Ready",
    usedIn: 28,
  },
  {
    name: "Customer Profile Service",
    category: "Customer",
    summary: "Unified customer profile, KYC status, and segment-level preferences.",
    tags: ["customer", "profile", "kyc", "crm", "segment"],
    readiness: "Production Ready",
    usedIn: 24,
  },
  {
    name: "Payment Processing Adapter",
    category: "Payments",
    summary: "Payment orchestration for UPI, cards, and account transfer rails.",
    tags: ["payment", "upi", "cards", "transfer", "txn", "settlement"],
    readiness: "Pilot Ready",
    usedIn: 18,
  },
  {
    name: "Notification Hub",
    category: "Communication",
    summary: "Centralized email, SMS, and push notification flows with templates.",
    tags: ["notification", "sms", "email", "push", "alerts", "template"],
    readiness: "Production Ready",
    usedIn: 26,
  },
  {
    name: "Document Management Service",
    category: "Document",
    summary: "Secure upload, indexing, and retrieval for statements and proofs.",
    tags: ["document", "upload", "storage", "statement", "proof", "file"],
    readiness: "Pilot Ready",
    usedIn: 20,
  },
  {
    name: "Workflow Engine",
    category: "Orchestration",
    summary: "Configurable approval and exception workflows for business journeys.",
    tags: ["workflow", "approval", "journey", "orchestration", "rules"],
    readiness: "Production Ready",
    usedIn: 22,
  },
];

function tokenizePrompt(prompt: string): string[] {
  return prompt
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2);
}

function findMatches(prompt: string) {
  const tokens = tokenizePrompt(prompt);

  if (tokens.length === 0) {
    return reusableCatalog.slice(0, 4).map((item) => ({ item, score: 0 }));
  }

  return reusableCatalog
    .map((item) => {
      const searchable = `${item.name} ${item.category} ${item.summary} ${item.tags.join(" ")}`.toLowerCase();
      const score = tokens.reduce((acc, token) => (searchable.includes(token) ? acc + 1 : acc), 0);
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.item.usedIn - a.item.usedIn;
    })
    .slice(0, 6);
}

function ReusableComponentsPage() {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  const matchedComponents = useMemo(() => findMatches(submittedPrompt), [submittedPrompt]);

  const handleAnalyzePrompt = () => {
    setSubmittedPrompt(prompt.trim());
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Reusable Component Finder"
          description="Describe your new application and discover readily available reusable components."
        />

        <Card className="border-border bg-card p-6 shadow-card">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-lg bg-primary/15 p-2 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="w-full">
              <p className="text-sm font-medium">What are you building?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Example: "Retail loan onboarding app with login, KYC, document upload, and approval workflow"
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your application requirements..."
              className="min-h-28 bg-background"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Prompt length: {prompt.trim().length} characters</span>
              <Button className="bg-gradient-primary shadow-glow" onClick={handleAnalyzePrompt}>
                <Search className="mr-2 h-4 w-4" /> Find Reusable Components
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recommended Reusable Components</h3>
            <Badge className="border-0 bg-primary/15 text-primary hover:bg-primary/15">
              {matchedComponents.length} match{matchedComponents.length === 1 ? "" : "es"}
            </Badge>
          </div>

          {matchedComponents.length === 0 ? (
            <div className="rounded-lg border border-border bg-background p-8 text-center">
              <p className="text-sm font-medium">No exact match found yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try adding terms like authentication, workflow, notifications, customer, documents, or payments.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {matchedComponents.map(({ item, score }) => (
                <div key={item.name} className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <Badge
                      className={
                        item.readiness === "Production Ready"
                          ? "border-0 bg-success/15 text-success hover:bg-success/15"
                          : "border-0 bg-warning/15 text-warning hover:bg-warning/15"
                      }
                    >
                      {item.readiness}
                    </Badge>
                  </div>

                  <p className="mt-3 text-xs text-muted-foreground">{item.summary}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Layers className="h-3.5 w-3.5" /> Used in {item.usedIn} apps
                    </span>
                    <span className="inline-flex items-center gap-1 text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Match score: {score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!submittedPrompt ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Tip: submit a prompt to get requirement-based matches. Default top components are shown initially.
            </p>
          ) : null}
        </Card>
      </div>
    </AppShell>
  );
}
