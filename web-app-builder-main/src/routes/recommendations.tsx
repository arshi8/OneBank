import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getDefaultRouteForRole, getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/recommendations")({
  beforeLoad: () => {
    const role = getStoredUserRole();
    throw redirect({ to: getDefaultRouteForRole(role) });
  },
  head: () => ({
    meta: [
      { title: "Recommendations — OneBank Platform" },
      { name: "description", content: "AI-powered recommendations for your projects." },
    ],
  }),
  component: RecommendationsPage,
});

function RecommendationsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Recommendations"
          description="AI-powered recommendations for modernization and optimization"
        />
        
        <div className="text-center py-16 text-muted-foreground">
          <p>Upload a project to receive personalized recommendations.</p>
        </div>
      </div>
    </AppShell>
  );
}
