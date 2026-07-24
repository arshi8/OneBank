import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { generateProjectInsights } from "@/lib/ai-generate-insights";
import { Download, Search, ZoomIn, ZoomOut, AppWindow, Share2, Database, Globe2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/architecture")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      autoAnalyze: search.autoAnalyze === true || search.autoAnalyze === 'true',
      project: search.project as string | undefined,
    }
  },
  head: () => ({
    meta: [
      { title: "Architecture Map — OneBank Platform" },
      { name: "description", content: "Application landscape and dependency visualization." },
      { property: "og:title", content: "Architecture Map — OneBank Platform" },
      { property: "og:description", content: "See how every application connects." },
    ],
  }),
  component: ArchitecturePage,
});

const left = ["Mobile Banking", "Internet Banking", "Corporate Portal", "Loan Origination", "Card Management", "Trade Finance", "Treasury System"];
const right = ["Customer Profile Service", "Authentication Service", "Notification Service", "Payment Service", "Document Service", "Workflow Engine", "Reporting Service", "Audit Service"];
const legend = [
  { icon: AppWindow, label: "Applications", color: "text-primary" },
  { icon: Share2, label: "Shared Services", color: "text-info" },
  { icon: Database, label: "Databases", color: "text-success" },
  { icon: Globe2, label: "External Systems", color: "text-warning" },
];

function ArchitecturePage() {
  const { autoAnalyze, project } = Route.useSearch();
  const [isGenerating, setIsGenerating] = useState(false);
  const [architectureDiagram, setArchitectureDiagram] = useState("");
  const [components, setComponents] = useState<{name: string, description: string}[]>([]);

  useEffect(() => {
    if (project && autoAnalyze) {
      setIsGenerating(true);
      
      // Simulating AI analysis delay
      setTimeout(() => {
        let diagram = "";
        let comps: any[] = [];
        
        switch (project) {
          case "Retail Banking System":
            diagram = `graph TD
  User[Retail Customers] --> App[Mobile App / Web UI]
  App --> API[Retail API Gateway]
  
  subgraph Microservices
    API --> Account[Accounts & Balances]
    API --> Transfer[Funds Transfer]
    API --> Cards[Card Management]
  end

  Account --> Cache[(Redis Cache)]
  Account --> MainDB[(Retail DB: PostgreSQL)]
  Transfer --> MainDB
  Cards --> MainDB

  classDef primary fill:#3b82f6,stroke:#1e40af,color:#ffffff,stroke-width:2px
  classDef secondary fill:#f1f5f9,stroke:#cbd5e1,color:#0f172a,stroke-width:2px
  classDef database fill:#10b981,stroke:#047857,color:#ffffff,stroke-width:2px
  
  class API,Account,Transfer,Cards primary
  class User,App secondary
  class Cache,MainDB database`;
            comps = [
              { name: "Retail API Gateway", description: "Entry point for all mobile and web retail banking traffic." },
              { name: "Accounts & Balances", description: "Provides real-time ledger balance and transaction history." },
              { name: "Funds Transfer", description: "Executes internal and external retail money transfers." },
              { name: "Card Management", description: "Handles debit/credit card issuance, blocking, and limits." },
              { name: "Retail Database", description: "Core PostgreSQL store for retail accounts and customer data." }
            ];
            break;
            
          case "Loan Management System":
            diagram = `graph TD
  Officer[Loan Officer] --> Portal[Internal Loan Portal]
  Portal --> Gateway[Loan API Gateway]
  
  subgraph Loan Processing
    Gateway --> Originate[Loan Origination Service]
    Originate --> CreditCheck[Credit Scoring Engine]
    Gateway --> Repayment[Repayment Service]
  end
  
  subgraph External Integration
    CreditCheck -.-> Bureau[External Credit Bureau API]
  end

  Originate --> Queue{{RabbitMQ}}
  Queue --> DocGen[Document Generator]
  
  Originate --> LoanDB[(Oracle: Loans)]
  Repayment --> LoanDB

  classDef primary fill:#3b82f6,stroke:#1e40af,color:#ffffff,stroke-width:2px
  classDef secondary fill:#f1f5f9,stroke:#cbd5e1,color:#0f172a,stroke-width:2px
  classDef database fill:#10b981,stroke:#047857,color:#ffffff,stroke-width:2px
  classDef event fill:#f59e0b,stroke:#b45309,color:#ffffff,stroke-width:2px
  
  class Gateway,Originate,Repayment,CreditCheck primary
  class Officer,Portal,DocGen,Bureau secondary
  class LoanDB database
  class Queue event`;
            comps = [
              { name: "Loan Origination Service", description: "Handles application intake, underwriting, and loan approval workflows." },
              { name: "Credit Scoring Engine", description: "Calculates risk scores and interfaces with external credit bureaus." },
              { name: "Repayment Service", description: "Manages amortization schedules, EMI calculations, and collections." },
              { name: "Document Generator", description: "Asynchronously creates loan agreements and sanction letters." },
              { name: "RabbitMQ", description: "Message queue for decoupling document generation from loan approval." }
            ];
            break;
            
          case "Payment Gateway":
            diagram = `graph TD
  Merchant[E-commerce Merchant] --> PG[Payment Gateway API]
  
  subgraph Payment Processing
    PG --> Switch[Payment Switch]
    Switch --> Fraud[Fraud Detection System]
    Switch --> Routing[Acquirer Routing]
  end
  
  Routing -.-> Visa[Visa / Mastercard Network]
  Routing -.-> UPI[UPI Network]
  
  Switch --> Kafka{{Kafka: Transaction Events}}
  Kafka --> Settlement[Settlement Worker]
  Kafka --> Ledger[Ledger Updater]
  
  Switch --> Redis[(Redis: Rate Limiting)]
  Settlement --> DB[(Cassandra: Transactions)]
  Ledger --> DB

  classDef primary fill:#3b82f6,stroke:#1e40af,color:#ffffff,stroke-width:2px
  classDef secondary fill:#f1f5f9,stroke:#cbd5e1,color:#0f172a,stroke-width:2px
  classDef database fill:#10b981,stroke:#047857,color:#ffffff,stroke-width:2px
  classDef event fill:#f59e0b,stroke:#b45309,color:#ffffff,stroke-width:2px
  
  class PG,Switch,Fraud,Routing primary
  class Merchant,Visa,UPI,Settlement,Ledger secondary
  class Redis,DB database
  class Kafka event`;
            comps = [
              { name: "Payment Switch", description: "Core engine routing transactions to appropriate card networks or UPI." },
              { name: "Fraud Detection System", description: "Real-time AI model evaluating transaction risk before authorization." },
              { name: "Acquirer Routing", description: "Dynamically selects the most cost-effective acquirer for the transaction." },
              { name: "Settlement Worker", description: "Calculates merchant payouts and T+1 settlement batches." },
              { name: "Transaction Ledger (Cassandra)", description: "High-throughput immutable datastore for all payment events." }
            ];
            break;
            
          default:
            diagram = `graph TD
  Client[Web & Mobile Clients] --> API[API Gateway / Load Balancer]
  
  subgraph Frontend Services
    API --> WebUI[Web Frontend Service]
    API --> MobBFF[Mobile BFF]
  end
  
  subgraph Core Business Services
    WebUI --> Auth[Identity & Auth Service]
    MobBFF --> Auth
    WebUI --> TxService[Transaction Engine]
    MobBFF --> TxService
    TxService --> Fraud[Fraud Detection API]
  end

  subgraph Event Streaming
    TxService --> Kafka{{Apache Kafka Event Bus}}
    Auth --> Kafka
  end

  subgraph Async Workers & Comm
    Kafka --> Notif[Notification Worker]
    Kafka --> Email[Email Service]
    Kafka --> Audit[Audit & Logging Service]
    Notif --> Push[Push Notification API]
  end

  subgraph Data Layer
    Auth --> UserDB[(PostgreSQL: Users)]
    TxService --> TxDB[(Cassandra: Ledger)]
    TxService --> Redis[(Redis: Session/Cache)]
    Audit --> Elastic[(Elasticsearch)]
  end

  classDef primary fill:#3b82f6,stroke:#1e40af,color:#ffffff,stroke-width:2px
  classDef secondary fill:#f1f5f9,stroke:#cbd5e1,color:#0f172a,stroke-width:2px
  classDef database fill:#10b981,stroke:#047857,color:#ffffff,stroke-width:2px
  classDef event fill:#f59e0b,stroke:#b45309,color:#ffffff,stroke-width:2px
  
  class API,TxService,Auth primary
  class Client,WebUI,MobBFF,Fraud,Notif,Email,Audit,Push secondary
  class UserDB,TxDB,Redis,Elastic database
  class Kafka event`;
            comps = [
              { name: "API Gateway", description: "Handles rate limiting, SSL termination, and routing requests to internal services." },
              { name: "Identity & Auth Service", description: "Manages JWT authentication, OAuth integrations, and user sessions." },
              { name: "Transaction Engine", description: "Core service for processing financial transactions and ledger entries." },
              { name: "Apache Kafka", description: "High-throughput message bus for asynchronous event-driven communication." },
              { name: "Notification & Email Services", description: "Consumes events from Kafka to dispatch SMS, emails, and push alerts to users." },
              { name: "Redis Cache", description: "In-memory datastore for fast session retrieval and temporary state." },
              { name: "Cassandra Ledger", description: "Highly available distributed NoSQL database for immutable transaction records." },
              { name: "Elasticsearch", description: "Stores and indexes audit logs for rapid querying and monitoring." }
            ];
        }

        setArchitectureDiagram(diagram);
        setComponents(comps);
        setIsGenerating(false);
      }, 2000);
    }
  }, [project, autoAnalyze]);

  return (
    <AppShell>
      <PageHeader
        title={project ? `Architecture: ${project}` : "Architecture Map"}
        description={project ? "Dynamically generated architecture map and components for this project." : "Application landscape and dependency visualization."}
        actions={
          <div className="flex items-center gap-2">
            <Select><SelectTrigger className="h-10 w-44 border-border bg-transparent"><SelectValue placeholder="View: Application" /></SelectTrigger>
              <SelectContent><SelectItem value="app">Application View</SelectItem></SelectContent>
            </Select>
            <Button variant="outline" className="border-border bg-transparent"><Download className="mr-2 h-4 w-4" /> Export</Button>
          </div>
        }
      />

      {project ? (
        <div className="flex flex-col gap-6 mt-6">
          <Card className="border-border bg-card p-6 shadow-card relative min-h-[400px]">
            {isGenerating && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-4xl mb-4 animate-bounce">🤖</div>
                <p className="text-sm font-medium animate-pulse">AI is scanning the repository and mapping architecture...</p>
              </div>
            )}
            
            <div className="mb-4 text-sm font-semibold">System Architecture</div>
            {architectureDiagram ? (
              <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                <MermaidDiagram chart={architectureDiagram} />
              </div>
            ) : !isGenerating ? (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                No architecture diagram could be generated.
              </div>
            ) : null}
          </Card>

          {components.length > 0 && (
            <Card className="border-border bg-card p-6 shadow-card">
              <div className="mb-4 text-sm font-semibold">Identified Components</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {components.map((c, i) => (
                  <div key={i} className="rounded-lg border border-border/50 bg-background/50 p-3">
                    <div className="font-medium text-sm text-foreground/90">{c.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      ) : (
        <Card className="border-border bg-card p-5 shadow-card">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
            {legend.map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1">
                <l.icon className={`h-3.5 w-3.5 ${l.color}`} />
                <span className="text-muted-foreground">{l.label}</span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-transparent"><Search className="h-3.5 w-3.5" /></Button>
              <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-transparent"><ZoomIn className="h-3.5 w-3.5" /></Button>
              <span className="px-1 text-muted-foreground">100%</span>
              <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-transparent"><ZoomOut className="h-3.5 w-3.5" /></Button>
            </div>
          </div>

          <div className="relative min-h-[520px] rounded-xl border border-border bg-gradient-to-br from-primary/5 to-background p-6">
            <div className="grid h-full grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
              {/* Left column */}
              <div className="flex flex-col gap-2.5">
                {left.map((n) => (
                  <NodeChip key={n} label={n} tone="primary" />
                ))}
              </div>

              {/* Center hub */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 -m-6 rounded-full bg-primary/20 blur-2xl" />
                  <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-primary text-center text-primary-foreground shadow-glow"
                    style={{ clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)" }}>
                    <div>
                      <div className="text-sm font-medium opacity-90">Core Banking</div>
                      <div className="text-lg font-semibold">System</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-2.5">
                {right.map((n) => (
                  <NodeChip key={n} label={n} tone="info" />
                ))}
              </div>
            </div>

            {/* Databases row */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              {["Core Banking DB", "Data Warehouse", "Analytics DB", "External Systems"].map((n, i) => (
                <div key={n} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-md ${i === 3 ? "bg-warning/15 text-warning" : "bg-success/15 text-success"}`}>
                    {i === 3 ? <Globe2 className="h-4 w-4" /> : <Database className="h-4 w-4" />}
                  </span>
                  <span className="text-sm">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </AppShell>
  );
}

function NodeChip({ label, tone }: { label: string; tone: "primary" | "info" }) {
  const styles = tone === "primary" ? "border-primary/40 bg-primary/10" : "border-info/40 bg-info/10";
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border ${styles} px-3 py-2.5 backdrop-blur-sm`}>
      <span className={`h-2 w-2 rounded-full ${tone === "primary" ? "bg-primary" : "bg-info"}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
