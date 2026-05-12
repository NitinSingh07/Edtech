/**
 * ResolvX Constants
 * Central place for all application-wide constants.
 */

export const APP_NAME = "ResolvX";
export const APP_DESCRIPTION = "AI-Powered Incident Management Platform";

// Severity levels with metadata
export const SEVERITIES = {
  CRITICAL: { label: "Critical", color: "var(--color-severity-critical)", bgClass: "bg-red-500/10 text-red-500 border-red-500/20" },
  HIGH: { label: "High", color: "var(--color-severity-high)", bgClass: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  MEDIUM: { label: "Medium", color: "var(--color-severity-medium)", bgClass: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  LOW: { label: "Low", color: "var(--color-severity-low)", bgClass: "bg-green-500/10 text-green-500 border-green-500/20" },
} as const;

// Status levels with metadata
export const STATUSES = {
  OPEN: { label: "Open", color: "var(--color-status-open)", bgClass: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  INVESTIGATING: { label: "Investigating", color: "var(--color-status-investigating)", bgClass: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  RESOLVED: { label: "Resolved", color: "var(--color-status-resolved)", bgClass: "bg-green-500/10 text-green-500 border-green-500/20" },
  CLOSED: { label: "Closed", color: "var(--color-status-closed)", bgClass: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
} as const;

// Priority levels
export const PRIORITIES = {
  P1: { label: "P1 — Critical", shortLabel: "P1" },
  P2: { label: "P2 — High", shortLabel: "P2" },
  P3: { label: "P3 — Medium", shortLabel: "P3" },
  P4: { label: "P4 — Low", shortLabel: "P4" },
} as const;

// Incident categories
export const CATEGORIES = {
  BUG: { label: "Bug", icon: "Bug" },
  SECURITY: { label: "Security", icon: "Shield" },
  PERFORMANCE: { label: "Performance", icon: "Gauge" },
  OUTAGE: { label: "Outage", icon: "ServerCrash" },
  NETWORK: { label: "Network", icon: "Wifi" },
  DATABASE: { label: "Database", icon: "Database" },
  OTHER: { label: "Other", icon: "HelpCircle" },
} as const;

// User roles
export const ROLES = {
  ADMIN: { label: "Admin", description: "Full system access" },
  MANAGER: { label: "Manager", description: "Team and incident management" },
  ENGINEER: { label: "Engineer", description: "Incident reporting and resolution" },
} as const;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
