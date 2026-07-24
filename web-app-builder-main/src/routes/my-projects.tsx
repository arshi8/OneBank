import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { AppWindow, Check, Upload, MoreHorizontal, Trash, Sparkles, Map } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStoredUserRole } from "@/lib/auth";
import { useProjects } from "@/lib/store";

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
  const [projects, setProjects] = useProjects();

  const handleRemove = (idx: number) => {
    const newProjects = [...projects];
    newProjects.splice(idx, 1);
    setProjects(newProjects);
  };

  // Automatically process pending projects
  useEffect(() => {
    const hasPending = projects.some(p => p.score === "Pending");
    if (hasPending) {
      const timer = setTimeout(() => {
        const updatedProjects = projects.map(p => {
          if (p.score === "Pending") {
            return {
              ...p,
              status: "Completed",
              score: `${Math.floor(Math.random() * 20) + 70}%` // generates realistic score
            };
          }
          return p;
        });
        setProjects(updatedProjects);
      }, 3000); // 3 seconds simulation
      
      return () => clearTimeout(timer);
    }
  }, [projects, setProjects]);

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
          actions={
            <Link to="/upload-project">
              <Button className="bg-gradient-primary shadow-glow">
                <Upload className="mr-2 h-4 w-4" /> Upload Project
              </Button>
            </Link>
          }
        />
        
        {projects.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p>No projects uploaded yet. Upload your first project to get started.</p>
          </div>
        ) : (
          <Card className="border-border bg-card p-6 shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-medium text-muted-foreground">Project Name</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Upload Date</th>
                    <th className="pb-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Score</th>
                    <th className="pb-3 text-right font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="py-4 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                          <AppWindow className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.version}</p>
                        </div>
                      </td>
                      <td className="py-4 text-muted-foreground">{project.date}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs text-green-600">
                          <Check className="h-3 w-3" /> {project.status}
                        </span>
                      </td>
                      <td className="py-4 text-right font-medium">{project.score}</td>
                      <td className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate({ to: `/architecture?autoAnalyze=true&project=${project.name}` })} className="cursor-pointer">
                              <Map className="mr-2 h-4 w-4" /> View Architecture
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRemove(idx)} className="cursor-pointer text-destructive focus:text-destructive">
                              <Trash className="mr-2 h-4 w-4" /> Remove Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
