import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone?: "primary" | "success" | "warning" | "info" | "rose";
}

const toneMap: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/15 text-info",
  rose: "bg-chart-5/15 text-chart-5",
};

export function StatCard({ icon: Icon, label, value, delta, tone = "primary" }: StatCardProps) {
  return (
    <Card className="border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
          {delta && <div className="mt-2 text-[11px] font-medium text-success">{delta}</div>}
        </div>
      </div>
    </Card>
  );
}
