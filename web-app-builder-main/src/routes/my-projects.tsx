import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getStoredUserRole } from "@/lib/auth";

export const Route = createFileRoute("/my-projects")({
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
      { title: "My Projects — OneBank Platform" },
      { name: "description", content: "View and manage your uploaded projects." },
    ],
  }),
  component: MyProjectsPage,
});

function MyProjectsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getStoredUserRole();

    if (role === "admin") {
      navigate({ to: "/applications", replace: true });
      return;
    }

    if (!role) {
      navigate({ to: "/", replace: true });
    }
  }, [navigate]);

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
