import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Bell, HelpCircle, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import authUsers from "../../auth-users.json";

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

export function AppShell({ children }: { children: ReactNode }) {
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId")?.toLowerCase() ?? "";
    const userNameFromStorage = localStorage.getItem("userName") ?? "";

    const getInitials = (name: string) => {
      const parts = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "U";
    };

    if (userRole === "admin") {
      const adminName = userNameFromStorage || credentials.admin.userName;
      setInitials(getInitials(adminName));
      return;
    }

    const matchedUser = credentials.users.find((user) => user.emailId.toLowerCase() === userId);
    const userName = userNameFromStorage || matchedUser?.userName || "User";
    setInitials(getInitials(userName));
  }, []);

  return (
    <SidebarProvider>
      <div className="dark flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applications, modules, services..."
                className="h-10 border-border bg-card pl-9 text-sm"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
                <HelpCircle className="h-4 w-4" />
              </button>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground flex items-center justify-center">
                {initials}
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
