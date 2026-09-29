export type UserRole = "admin" | "teacher" | "student" | "parent";
export type AttendanceStatus = "present" | "absent" | "late";
export type ResourceType = "pdf" | "note" | "homework" | "assignment" | "external_link" | "study_material";

export type DashboardMetric = {
  label: string;
  value: string | number;
  change?: string;
};
