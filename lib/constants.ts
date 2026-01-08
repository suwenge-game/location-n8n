export const SITE_NAME = "N8N Hub";
export const SITE_DESCRIPTION = "发现和分享最佳N8N自动化工作流，节省10倍开发时间";

export const ROUTES = {
  HOME: "/",
  WORKFLOWS: "/workflows",
  WORKFLOW_DETAIL: (slug: string) => `/workflows/${slug}`,
  DOCS: "/docs",
  PRICING: "/pricing",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CHECKOUT: "/checkout",
} as const;

export const DIFFICULTY_LABELS = {
  beginner: "初级",
  intermediate: "中级",
  advanced: "高级",
} as const;

export const DIFFICULTY_COLORS = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
} as const;

export const LICENSE_LABELS = {
  MIT: "MIT License",
  "Apache-2.0": "Apache 2.0",
  "GPL-3.0": "GPL 3.0",
  Proprietary: "专有授权",
} as const;

export const SORT_OPTIONS = [
  { value: "latest", label: "最新发布" },
  { value: "popular", label: "最受欢迎" },
  { value: "rating", label: "评分最高" },
  { value: "downloads", label: "下载最多" },
] as const;

export const PRICE_RANGES = [
  { value: "all", label: "全部" },
  { value: "free", label: "免费" },
  { value: "paid", label: "付费" },
] as const;

export const RATING_FILTERS = [
  { value: 4.5, label: "4.5分以上" },
  { value: 4.0, label: "4.0分以上" },
  { value: 3.5, label: "3.5分以上" },
  { value: 3.0, label: "3.0分以上" },
] as const;

export const DIFFICULTY_FILTERS = [
  { value: "beginner", label: "初级" },
  { value: "intermediate", label: "中级" },
  { value: "advanced", label: "高级" },
] as const;

export const PLATFORMS = [
  { value: "slack", label: "Slack", icon: "💬" },
  { value: "gmail", label: "Gmail", icon: "📧" },
  { value: "salesforce", label: "Salesforce", icon: "💼" },
  { value: "hubspot", label: "HubSpot", icon: "🎯" },
  { value: "figma", label: "Figma", icon: "🎨" },
  { value: "twitter", label: "Twitter", icon: "🐦" },
  { value: "google-drive", label: "Google Drive", icon: "📁" },
  { value: "dropbox", label: "Dropbox", icon: "📦" },
] as const;
