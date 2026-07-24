export type UserRole = "admin" | "user";

export function getStoredUserRole(): UserRole | null {
  if (typeof window === "undefined") {
    return null;
  }

  const role = localStorage.getItem("userRole");
  return role === "admin" || role === "user" ? role : null;
}

export function getDefaultRouteForRole(role: UserRole | null): "/dashboard" | "/user-dashboard" | "/" {
  if (role === "admin") {
    return "/dashboard";
  }

  if (role === "user") {
    return "/user-dashboard";
  }

  return "/";
}
