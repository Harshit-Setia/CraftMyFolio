import {
  Briefcase,
  ChartColumn,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Link2,
  Quote,
  Sparkles,
  User,
} from "lucide-react";

const filled = (list) => Array.isArray(list) && list.length > 0;

export const SECTIONS = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard, group: "main" },
  { key: "basic", label: "Basic details", Icon: User, group: "profile", done: (u) => Boolean(u.bio?.trim() && u.avatar) },
  { key: "education", label: "Education", Icon: GraduationCap, group: "profile", done: (u) => filled(u.education) },
  { key: "experience", label: "Experience", Icon: Briefcase, group: "profile", done: (u) => filled(u.experience) },
  { key: "projects", label: "Projects", Icon: FolderOpen, group: "profile", done: (u) => filled(u.projects) },
  { key: "skills", label: "Skills", Icon: Sparkles, group: "profile", done: (u) => filled(u.skills) },
  { key: "social", label: "Social links", Icon: Link2, group: "profile", done: (u) => filled(u.social) },
  { key: "testimonials", label: "Testimonials", Icon: Quote, group: "profile", done: (u) => filled(u.testimonials) },
  { key: "analytics", label: "Analytics", Icon: ChartColumn, group: "insights" },
];

export const GROUP_TITLES = { main: null, profile: "Your profile", insights: "Insights" };

export const completionItems = (user) => [
  { key: "avatar", label: "Add a profile photo", done: Boolean(user.avatar), target: "basic" },
  { key: "bio", label: "Write a short bio", done: Boolean(user.bio?.trim()), target: "basic" },
  { key: "experience", label: "Add your experience", done: filled(user.experience), target: "experience" },
  { key: "education", label: "Add your education", done: filled(user.education), target: "education" },
  { key: "projects", label: "Showcase your projects", done: filled(user.projects), target: "projects" },
  { key: "skills", label: "List your skills", done: filled(user.skills), target: "skills" },
  { key: "social", label: "Link your social profiles", done: filled(user.social), target: "social" },
  { key: "testimonials", label: "Add a testimonial", done: filled(user.testimonials), target: "testimonials" },
  { key: "publish", label: "Publish your portfolio", done: Boolean(user.folio_id), target: "create" },
];
