import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/my-projects")({
  head: () => ({
    meta: [
      { title: "My Projects — OneBank Platform" },
      { name: "description", content: "View and manage your uploaded projects." },
    ],
  }),
  component: MyProjectsPage,
});

function MyProjectsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="My Projects"
          description="View and manage your uploaded projects for analysis"
        />
        
        <div className="text-center py-16 text-muted-foreground">
          <p>No projects uploaded yet. Upload your first project to get started.</p>
        </div>
      </div>
    </AppShell>
  );
}
