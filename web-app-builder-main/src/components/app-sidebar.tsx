import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Upload,
  FolderOpen,
  Sparkles,
  Network,
  Lightbulb,
  Settings,
  ChevronDown,
  Users,
  LogOut
} from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getDefaultRouteForRole, getStoredUserRole } from "@/lib/auth";
import authUsers from "../../auth-users.json";

type AuthUsers = {
  admin: Array<{
    emailId: string;
    password: string;
    userName: string;
  }>;
  users: Array<{
    emailId: string;
    password: string;
    userName: string;
  }>;
};

const credentials = authUsers as AuthUsers;

const userItems = [
  { title: "User Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Submit New Application", url: "/upload-project", icon: Upload },
  { title: "My Projects", url: "/my-projects", icon: FolderOpen },
  { title: "AI Analysis Report", url: "/ai-insights", icon: Sparkles },
  { title: "Architecture", url: "/architecture", icon: Network },
  { title: "Settings", url: "/settings", icon: Settings },
];

const adminItems = [
  { title: "Admin Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Application Catalog", url: "/applications", icon: Users },
  { title: "Enterprise Analytics", url: "/roi", icon: Network },
  { title: "Review AI Suggestions", url: "/ai-insights", icon: Sparkles },
  { title: "Approve Reusable Services", url: "/services", icon: Lightbulb },
  { title: "Architecture", url: "/architecture", icon: Network },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) => currentPath === path;
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  const [displayRole, setDisplayRole] = useState("User");
  const [initials, setInitials] = useState("U");
  const [homeUrl, setHomeUrl] = useState<"/" | "/dashboard" | "/my-projects">("/");

  const toInitials = (name: string) => {
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "U";
  };

  useEffect(() => {
    const userRole = getStoredUserRole();
    const userId = localStorage.getItem("userId")?.toLowerCase() ?? "";
    const userName = localStorage.getItem("userName") ?? "";

    setIsAdmin(userRole === "admin");
    setHomeUrl(getDefaultRouteForRole(userRole));

    if (userRole === "admin") {
      const matchedAdmin = credentials.admin.find((user) => user.emailId.toLowerCase() === userId);
      const name = userName || matchedAdmin?.userName || "Admin";
      setDisplayName(name);
      setDisplayRole("Admin");
      setInitials(toInitials(name));
      return;
    }

    const matchedUser = credentials.users.find((user) => user.emailId.toLowerCase() === userId);
    const name = userName || matchedUser?.userName || "User";
    setDisplayName(name);
    setDisplayRole("User");
    setInitials(toInitials(name));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate({ to: "/", replace: true });
  };

  const items = isAdmin ? adminItems : userItems;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <Link to={homeUrl} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <span className="text-sm font-bold text-primary-foreground">OB</span>
          </div>
          <div className="flex flex-col leading-none group-data-[collapsible=icon]:hidden">
            <span className="text-base font-semibold tracking-tight">
              One<span className="text-primary">Bank</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Platform
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className="h-10 data-[active=true]:bg-gradient-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-glow"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2.5 rounded-lg p-1.5 cursor-pointer transition-colors hover:bg-muted/50">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
                {initials}
              </div>
              <div className="flex flex-1 flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">{displayName}</span>
                <span className="text-[11px] text-muted-foreground">{displayRole}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 mb-2 ml-2">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
