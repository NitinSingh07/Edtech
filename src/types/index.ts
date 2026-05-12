/**
 * ResolvX Type Definitions
 * Shared types used across the application.
 */

// User roles
export type Role = "ADMIN" | "MANAGER" | "ENGINEER";

// Incident severity levels
export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

// Incident statuses
export type Status = "OPEN" | "INVESTIGATING" | "RESOLVED" | "CLOSED";

// Incident priorities
export type Priority = "P1" | "P2" | "P3" | "P4";

// Incident categories
export type Category =
  | "BUG"
  | "SECURITY"
  | "PERFORMANCE"
  | "OUTAGE"
  | "NETWORK"
  | "DATABASE"
  | "OTHER";

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string | null;
  avatar: string | null;
  createdAt: Date;
}

// Incident type
export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  priority: Priority;
  category: Category;
  reportedById: string;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
  closedAt: Date | null;
  reportedBy?: User;
  assignedTo?: User | null;
  comments?: Comment[];
  activityLogs?: ActivityLog[];
  aiSuggestions?: AISuggestion[];
  _count?: {
    comments: number;
  };
}

// Comment type
export interface Comment {
  id: string;
  content: string;
  userId: string;
  incidentId: string;
  createdAt: Date;
  user?: User;
}

// Activity log type
export interface ActivityLog {
  id: string;
  action: string;
  details: string | null;
  userId: string;
  incidentId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  user?: User;
  incident?: Incident;
}

// AI Suggestion type
export interface AISuggestion {
  id: string;
  incidentId: string;
  aiSeverity: Severity;
  confidence: number;
  suggestions: string[];
  rootCause: string | null;
  createdAt: Date;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard stats
export interface DashboardStats {
  totalIncidents: number;
  openIncidents: number;
  criticalIncidents: number;
  avgResolutionTime: number; // in hours
  trends: {
    totalChange: number;
    openChange: number;
    criticalChange: number;
    resolutionChange: number;
  };
}
