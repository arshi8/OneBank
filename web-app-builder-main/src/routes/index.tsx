import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Shield, Sparkles, Zap, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import loginVisual from "@/assets/login-visual.jpg";
import authUsers from "../../auth-users.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OneBank Platform — AI-Powered Enterprise Modernization" },
      {
        name: "description",
        content:
          "Sign in to OneBank Platform. Unify banking applications, detect duplicates with AI, and accelerate modernization.",
      },
      { property: "og:title", content: "OneBank Platform — Sign in" },
      { property: "og:description", content: "AI-Powered Enterprise Modernization & Application Rationalization" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const perks = [
  { icon: Sparkles, text: "Discover all banking applications" },
  { icon: Shield, text: "Detect duplicates with AI" },
  { icon: Zap, text: "Recommend reusable services" },
  { icon: TrendingDown, text: "Save costs and accelerate delivery" },
];

type LoginRole = "user" | "admin";

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

function validateCredentials(role: LoginRole, userId: string, password: string): boolean {
  const normalizedUserId = userId.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (role === "admin") {
    return (
      credentials.admin.emailId.toLowerCase() === normalizedUserId &&
      credentials.admin.password === normalizedPassword
    );
  }

  return credentials.users.some(
    (user) => user.emailId.toLowerCase() === normalizedUserId && user.password === normalizedPassword,
  );
}

function getSignedInUserName(role: LoginRole, userId: string): string {
  const normalizedUserId = userId.trim().toLowerCase();

  if (role === "admin") {
    return credentials.admin.userName;
  }

  const matchedUser = credentials.users.find((user) => user.emailId.toLowerCase() === normalizedUserId);
  return matchedUser?.userName ?? "";
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<LoginRole>("user");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validLogin = validateCredentials(loginType, userId, password);
    if (!validLogin) {
      setAuthError("Invalid credentials for selected login type.");
      return;
    }

    setAuthError("");
    localStorage.setItem("userRole", loginType);
    localStorage.setItem("userId", userId.trim().toLowerCase());
    localStorage.setItem("userName", getSignedInUserName(loginType, userId));
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="dark min-h-screen w-full bg-gradient-hero text-foreground">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        {/* Left visual */}
        <div className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <span className="font-bold text-primary-foreground">OB</span>
            </div>
            <div className="leading-none">
              <div className="text-lg font-semibold">
                One<span className="text-primary">Bank</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Platform
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-lg">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              Welcome to <span className="text-primary">OneBank</span> Platform
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              AI-Powered Enterprise Modernization & Application Rationalization
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-foreground/90">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={loginVisual}
            alt=""
            className="pointer-events-none absolute -right-16 bottom-0 h-[70%] w-auto opacity-90"
          />
          <div className="relative z-10 text-xs text-muted-foreground">
            © 2026 OneBank Platform. All rights reserved.
          </div>
        </div>

        {/* Right form */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card/70 p-8 shadow-card backdrop-blur-xl">
            <h2 className="text-2xl font-semibold tracking-tight">Sign in to your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Access your workspace and insights.
            </p>

            {/* Login Type Tabs */}
            <div className="mt-6 flex gap-4 border-b border-border">
              <button
                onClick={() => setLoginType("user")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  loginType === "user"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                User Login
              </button>
              <button
                onClick={() => setLoginType("admin")}
                className={`pb-3 text-sm font-medium transition-colors ${
                  loginType === "admin"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Admin Login
              </button>
            </div>

            <form
              className="mt-8 space-y-4"
              onSubmit={handleSubmit}
            >
              {authError ? (
                <Alert variant="destructive">
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              ) : null}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email / Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or username"
                  className="h-11"
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    if (authError) {
                      setAuthError("");
                    }
                  }}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 pr-10"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (authError) {
                        setAuthError("");
                      }
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <Checkbox id="remember" /> <span>Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" className="h-11 w-full bg-gradient-primary shadow-glow hover:opacity-95">
                Sign In
              </Button>

              <div className="relative py-2 text-center">
                <span className="relative z-10 bg-card/70 px-3 text-xs uppercase tracking-widest text-muted-foreground">
                  or
                </span>
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
              </div>

              <Button variant="outline" type="button" className="h-11 w-full border-border bg-transparent">
                <Shield className="mr-2 h-4 w-4" /> Sign in with SSO
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Need access?{" "}
              <Link to="/dashboard" className="text-primary hover:underline">
                Explore the demo dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
