import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, AlertTriangle, Recycle, TrendingUp, Wrench, Leaf, ArrowRight, AppWindow, Copy, Package, IndianRupee, Loader2, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { AiChat } from "@/components/ai-chat";
import { generateDashboardInsights, generateProjectInsights } from "@/lib/ai-generate-insights";
import { useApplications, useServices, useProjects } from "@/lib/store";

export const Route = createFileRoute("/ai-insights")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      autoAnalyze: search.autoAnalyze === true || search.autoAnalyze === 'true',
      project: search.project as string | undefined,
    }
  },
  head: () => ({
    meta: [
      { title: "AI Insights — OneBank Platform" },
      { name: "description", content: "AI-powered recommendations and intelligent insights." },
      { property: "og:title", content: "AI Insights — OneBank Platform" },
      { property: "og:description", content: "Let AI guide your modernization decisions." },
    ],
  }),
  component: AIPage,
});

const ICON_MAP: Record<string, any> = {
  AlertTriangle,
  Recycle,
  TrendingUp,
  Wrench,
  Leaf,
  AppWindow,
  Copy,
  Package,
  IndianRupee
};

const defaultInsights = [
  { icon: "AlertTriangle", tone: "warning", title: "High Duplicate in Authentication", body: "28 applications have similar authentication modules. Consolidate into Enterprise Authentication Service.", remediation: "Schedule a code walkthrough with tech leads from the top offending apps. Establish an API contract for the new Enterprise Auth Service.", tag: "High Impact" },
  { icon: "Recycle", tone: "info", title: "Unused Functionality Detected", body: "Applications contain 20-30% unused code. Consider refactoring to reduce technical debt.", remediation: "Run a dead code elimination pass using standard static analysis tools. Audit feature flags that have been fully rolled out.", tag: "Medium Impact" },
  { icon: "TrendingUp", tone: "success", title: "Opportunity for Service Reuse", body: "Document Management module is present in 20 more applications.", remediation: "Extract the Document Management code into a shared internal library or microservice. Implement strict versioning.", tag: "High Impact" },
  { icon: "Wrench", tone: "warning", title: "Performance Bottleneck", body: "5 applications have similar performance issues in reporting module.", remediation: "Profile the database queries in the reporting modules. Consider adding a caching layer (e.g. Redis) or read replicas.", tag: "Medium Impact" },
  { icon: "Leaf", tone: "success", title: "Cost Optimization", body: "Infrastructure can be optimized by right-sizing 35% of current resources.", remediation: "Identify over-provisioned VMs. Downsize non-production environments during off-hours to save on compute costs.", tag: "High Impact" },
];

const defaultRecommendations = [
  { title: "Consolidate Authentication Services", impact: "28 Apps" },
  { title: "Implement Centralized Workflow", impact: "22 Apps" },
  { title: "Migrate to Cloud-Native Architecture", impact: "15 Apps" },
  { title: "Adopt API Gateway", impact: "18 Apps" },
  { title: "Implement Event-Driven Architecture", impact: "12 Apps" },
];

const advancedInsights = [
  { icon: "AlertTriangle", tone: "warning", title: "Authentication Bottleneck", body: "The Identity & Auth Service is experiencing high latency during peak hours, affecting 15+ downstream services.", remediation: "Implement Redis-based token caching and rate-limiting at the API Gateway level to reduce load on the PostgreSQL Auth DB.", tag: "High Impact" },
  { icon: "Recycle", tone: "info", title: "Kafka Consumer Lag Detected", body: "Notification and Email workers are falling behind the Event Bus by ~5,000 messages on average.", remediation: "Scale out the Notification Worker pods in the Kubernetes cluster or partition the Kafka topic to allow parallel processing.", tag: "Medium Impact" },
  { icon: "TrendingUp", tone: "success", title: "Microservice Consolidation", body: "Identified overlapping logic between the Mobile BFF and Web Frontend Service.", remediation: "Merge common transformation logic into a unified GraphQL layer before it hits the Transaction Engine.", tag: "High Impact" },
  { icon: "Wrench", tone: "warning", title: "Cassandra Read Timeouts", body: "The Transaction Ledger (Cassandra) is showing intermittent read timeouts on complex historical queries.", remediation: "Offload complex read queries to Elasticsearch which is already configured for audit logs, reducing strain on Cassandra.", tag: "Medium Impact" },
  { icon: "Leaf", tone: "success", title: "Infrastructure Cost Optimization", body: "The API Gateway and Fraud Detection environments are over-provisioned by 40% during off-peak hours.", remediation: "Implement aggressive auto-scaling policies to downscale non-production instances and save on compute costs.", tag: "High Impact" },
];

const advancedRecommendations = [
  { title: "Implement Redis Token Caching", impact: "Critical" },
  { title: "Scale Kafka Consumers", impact: "High ROI" },
  { title: "Offload Queries to Elasticsearch", impact: "Immediate" },
  { title: "Consolidate BFF Layers", impact: "Medium" },
  { title: "Enable Auto-scaling for API Gateway", impact: "High ROI" },
];

const toneClass: Record<string, string> = {
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
  primary: "bg-primary/15 text-primary",
  rose: "bg-rose-500/15 text-rose-500",
};
const tagClass: Record<string, string> = {
  "High Impact": "bg-destructive/15 text-destructive border-0",
  "Medium Impact": "bg-warning/15 text-warning border-0",
  "Low Impact": "bg-success/15 text-success border-0",
};

const debt = [{ name: "d", value: 36, fill: "var(--warning)" }];

function AIPage() {
  const { autoAnalyze, project } = Route.useSearch();
  const [apps] = useApplications();
  const [services] = useServices();
  const [projects] = useProjects();
  
  const isUser = typeof window !== 'undefined' ? localStorage.getItem("userRole") === "user" : false;

  const applicationsOnboarded = isUser ? projects.length : 176 + apps.length;
  const duplicateModulesDetected = isUser ? (projects.length * 4) : 1284 + (apps.length * 4);
  const reusableServicesIdentified = isUser ? Math.floor(projects.length * 1.5) : services.length;
  const estimatedAnnualSavings = isUser ? `₹${projects.length * 5} Cr` : `₹${100 + (services.length * 5)} Cr`;

  const dashboardContext = {
    applicationsOnboarded,
    duplicateModulesDetected,
    reusableServicesIdentified,
    estimatedAnnualSavings,
    modernizationProgress: "68%",
    topDuplicates: [
      { name: "User Authentication", apps: Math.floor(applicationsOnboarded * 0.15) },
      { name: "Customer Search", apps: Math.floor(applicationsOnboarded * 0.13) },
      { name: "OTP Verification", apps: Math.floor(applicationsOnboarded * 0.12) },
    ]
  };

  const [keyInsights, setKeyInsights] = useState<any[]>(defaultInsights);
  const [recommendations, setRecommendations] = useState(defaultRecommendations);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);

  const toggleInsight = (idx: number) => {
    setExpandedInsight(prev => prev === idx ? null : idx);
  };

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation to keep the flow realistic but preserve our high-quality mocked data
    setTimeout(() => {
      // Switch from default to advanced insights
      setKeyInsights(advancedInsights);
      setRecommendations(advancedRecommendations);
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    if (autoAnalyze) {
      handleGenerateInsights();
    }
  }, [autoAnalyze]);

  return (
    <AppShell>
      <PageHeader
        title={project ? `Project Insights: ${project}` : "AI Insights"}
        description={project ? "Detailed AI analysis and insights for this project." : "AI powered recommendations and intelligent insights for your modernization journey."}
        actions={
          <Button 
            className="bg-gradient-primary shadow-glow transition-all cursor-pointer"
            onClick={handleGenerateInsights}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? "Analyzing Dashboard..." : "Generate New Insights"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-border bg-card p-5 shadow-card relative overflow-hidden">
          {isGenerating && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <div className="mb-4 text-sm font-semibold">Key Insights</div>
          <ul className="space-y-3">
            {keyInsights.map((i, idx) => {
              const IconComp = ICON_MAP[i.icon] || AlertTriangle;
              const isExpanded = expandedInsight === idx;
              return (
                <li 
                  key={idx} 
                  className="rounded-lg border border-border bg-background/40 transition-all hover:bg-muted/30 overflow-hidden cursor-pointer"
                  onClick={() => toggleInsight(idx)}
                >
                  <div className="flex items-start gap-3 p-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${toneClass[i.tone] || toneClass.info}`}>
                      <IconComp className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium">{i.title}</div>
                        <Badge className={tagClass[i.tag] ?? tagClass["High Impact"]}>{i.tag}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{i.body}</p>
                    </div>
                    <ChevronDown className={`mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t border-border/50 bg-muted/10 p-4 px-16 text-sm">
                      <div className="font-medium mb-1 text-foreground/90">Suggested Remediation:</div>
                      <p className="text-muted-foreground">{i.remediation || "No remediation steps provided."}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="border-border bg-card p-5 shadow-card relative overflow-hidden">
            {isGenerating && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            <div className="mb-3 text-sm font-semibold">AI Recommendations</div>
            <ul className="space-y-3 text-sm">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                  <span>{rec.title}</span>
                  <span className="text-xs text-muted-foreground">{rec.impact}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline">View all recommendations <ArrowRight className="h-3 w-3" /></a>
          </Card>

          <Card className="border-border bg-card p-5 shadow-card">
            <div className="mb-1 text-sm font-semibold">Technical Debt Overview</div>
            <div className="relative h-48">
              <ResponsiveContainer>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={debt} startAngle={210} endAngle={-30}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar background={{ fill: "var(--muted)" }} dataKey="value" cornerRadius={12} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-semibold">36%</div>
                <div className="text-xs text-muted-foreground">Technical Debt</div>
              </div>
            </div>
            <ul className="mt-2 space-y-1 text-xs">
              {[
                ["Low (0-30%)", "var(--chart-3)"],
                ["Medium (30-60%)", "var(--warning)"],
                ["High (60-100%)", "var(--destructive)"],
              ].map(([n, c]) => (
                <li key={n} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {n}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <AiChat />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={AppWindow} label="Applications Analyzed" value={applicationsOnboarded.toString()} tone="primary" />
        <StatCard icon={Copy} label="Duplicate Modules Found" value={duplicateModulesDetected.toLocaleString()} tone="rose" />
        <StatCard icon={Package} label="Reusable Services Identified" value={reusableServicesIdentified.toString()} tone="success" />
        <StatCard icon={IndianRupee} label="Potential Annual Savings" value={estimatedAnnualSavings} tone="warning" />
      </div>
    </AppShell>
  );
}
