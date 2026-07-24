import { useState, useEffect } from "react";

// --- Types ---

export interface AppEntry {
  n: string;
  d: string;
  t: string;
  o: string;
  s: string;
  icon: string;
}

export interface ServiceEntry {
  n: string;
  c: string;
  u: string;
  s: string;
  sv: string;
}

export interface ProjectEntry {
  name: string;
  version: string;
  date: string;
  status: string;
  score: string;
}

export interface NotificationEntry {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// --- Default Data ---

const defaultApps: AppEntry[] = [
  { n: "Mobile Banking", d: "Retail Banking", t: "Android, Kotlin", o: "21 May 2024", s: "Onboarded", icon: "Smartphone" },
  { n: "Internet Banking", d: "Retail Banking", t: "React, Node.js", o: "18 May 2024", s: "Onboarded", icon: "Globe" },
  { n: "Corporate Portal", d: "Corporate Banking", t: "Angular, .NET", o: "15 May 2024", s: "Onboarded", icon: "Building2" },
  { n: "Loan Origination", d: "Loans", t: "Java, Spring Boot", o: "12 May 2024", s: "Onboarded", icon: "Coins" },
  { n: "Card Management", d: "Cards", t: "Java, Oracle", o: "10 May 2024", s: "Onboarded", icon: "CreditCard" },
  { n: "Trade Finance", d: "Trade Banking", t: "Java, Struts", o: "08 May 2024", s: "Onboarded", icon: "Ship" },
  { n: "Treasury System", d: "Treasury", t: ".NET, SQL Server", o: "05 May 2024", s: "Onboarded", icon: "Vault" },
  { n: "Collections System", d: "Collections", t: "Java, MySQL", o: "02 May 2024", s: "Onboarded", icon: "Layers" },
];

const defaultServices: ServiceEntry[] = [
  { n: "Customer Profile Service", c: "Customer", u: "24 Applications", s: "Implemented", sv: "₹18.4 Cr" },
  { n: "Enterprise Authentication", c: "Security", u: "28 Applications", s: "Implemented", sv: "₹22.7 Cr" },
  { n: "Notification Hub", c: "Communication", u: "26 Applications", s: "Implemented", sv: "₹12.6 Cr" },
  { n: "Document Management", c: "Document", u: "20 Applications", s: "In Progress", sv: "₹15.3 Cr" },
  { n: "Workflow Engine", c: "Workflow", u: "22 Applications", s: "Implemented", sv: "₹17.9 Cr" },
  { n: "Payment Processing", c: "Payments", u: "18 Applications", s: "In Progress", sv: "₹20.1 Cr" },
  { n: "Reporting & Analytics", c: "Analytics", u: "30 Applications", s: "Implemented", sv: "₹15.0 Cr" },
  { n: "Audit & Logging", c: "Compliance", u: "25 Applications", s: "Implemented", sv: "₹10.0 Cr" },
];

const defaultProjects: ProjectEntry[] = [
  { name: "Retail Banking System", version: "v1.0", date: "22 May 2026", status: "Completed", score: "72%" },
  { name: "Loan Management System", version: "v2.1", date: "20 May 2026", status: "Completed", score: "65%" },
  { name: "Payment Gateway", version: "v1.3", date: "18 May 2026", status: "Completed", score: "60%" },
];

const defaultNotifications: NotificationEntry[] = [
  {
    id: "notif-1",
    title: "Welcome to OneBank",
    message: "Welcome to the OneBank Platform. Start by uploading a project for AI analysis.",
    date: new Date().toISOString(),
    read: false
  }
];

// --- Keys ---

const APPS_KEY = "onebank_apps_data";
const SERVICES_KEY = "onebank_services_data";
const PROJECTS_KEY = "onebank_projects_data";
const NOTIFICATIONS_KEY = "onebank_notifications_data";

// --- Helpers ---

function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
  }
  return defaultValue;
}

function setToStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e);
  }
}

// --- Hooks ---

export function useApplications() {
  const [apps, setApps] = useState<AppEntry[]>(() => getFromStorage(APPS_KEY, defaultApps));

  useEffect(() => {
    setToStorage(APPS_KEY, apps);
  }, [apps]);

  return [apps, setApps] as const;
}

export function useServices() {
  const [services, setServices] = useState<ServiceEntry[]>(() => getFromStorage(SERVICES_KEY, defaultServices));

  useEffect(() => {
    setToStorage(SERVICES_KEY, services);
  }, [services]);

  return [services, setServices] as const;
}

export function useProjects() {
  const [projects, setProjects] = useState<ProjectEntry[]>(() => getFromStorage(PROJECTS_KEY, defaultProjects));

  useEffect(() => {
    setToStorage(PROJECTS_KEY, projects);
  }, [projects]);

  return [projects, setProjects] as const;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationEntry[]>(() => getFromStorage(NOTIFICATIONS_KEY, defaultNotifications));

  useEffect(() => {
    setToStorage(NOTIFICATIONS_KEY, notifications);
  }, [notifications]);

  return [notifications, setNotifications] as const;
}

// --- Global Getters for Non-React logic or initial renders ---

export function getApplicationsSync() {
  return getFromStorage(APPS_KEY, defaultApps);
}

export function getServicesSync() {
  return getFromStorage(SERVICES_KEY, defaultServices);
}

export function getProjectsSync() {
  return getFromStorage(PROJECTS_KEY, defaultProjects);
}

export function addProjectSync(project: ProjectEntry) {
  const current = getProjectsSync();
  setToStorage(PROJECTS_KEY, [project, ...current]);
}

export function getNotificationsSync() {
  return getFromStorage(NOTIFICATIONS_KEY, defaultNotifications);
}

export function addNotificationSync(notification: NotificationEntry) {
  const current = getNotificationsSync();
  setToStorage(NOTIFICATIONS_KEY, [notification, ...current]);
}
